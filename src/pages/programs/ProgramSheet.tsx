import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Constants } from "@/integrations/supabase/types";
import { createStageProgram, updateStageProgram, StageProgram } from "@/queries/stagePrograms";
import { createNonStageProgram, updateNonStageProgram, NonStageProgram } from "@/queries/nonStagePrograms";
import { createSportsProgram, updateSportsProgram, SportsProgram } from "@/queries/sportsPrograms";

const programSchema = z.object({
  title: z.string().min(2, { message: "Program title must be at least 2 characters." }),
  category: z.enum(Constants.public.Enums.program_category),
});

type ProgramFormValues = z.infer<typeof programSchema>;
export type ProgramType = 'stage' | 'nonstage' | 'sports';
export type Program = StageProgram | NonStageProgram | SportsProgram;

interface ProgramSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programType: ProgramType;
  program?: Program | null;
}

export function ProgramSheet({ open, onOpenChange, programType, program }: ProgramSheetProps) {
  const queryClient = useQueryClient();
  const isEditing = !!program;

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      title: "",
      category: "all",
    },
  });

  useEffect(() => {
    if (program) {
      form.reset({ title: program.title, category: program.category });
    } else {
      form.reset({ title: "", category: "all" });
    }
  }, [program, form]);

  const mutationFn = (values: ProgramFormValues) => {
    const programData = { ...values };
    if (isEditing && program) {
      switch (programType) {
        case 'stage': return updateStageProgram(program.id, programData);
        case 'nonstage': return updateNonStageProgram(program.id, programData);
        case 'sports': return updateSportsProgram(program.id, programData);
      }
    } else {
      switch (programType) {
        case 'stage': return createStageProgram(programData);
        case 'nonstage': return createNonStageProgram(programData);
        case 'sports': return createSportsProgram(programData);
      }
    }
    throw new Error("Invalid program type");
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(isEditing ? "Program updated successfully" : "Program created successfully");
      queryClient.invalidateQueries({ queryKey: [`${programType}Programs`] });
      queryClient.invalidateQueries({ queryKey: ["programsCount"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: ProgramFormValues) => {
    mutation.mutate(data);
  };

  const programTypeTitle = programType.charAt(0).toUpperCase() + programType.slice(1);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEditing ? `Edit ${programTypeTitle} Program` : `Add New ${programTypeTitle} Program`}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? `Update the details for this ${programType} program.`
              : `Create a new ${programType} program for the fest.`}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Solo Dance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Constants.public.Enums.program_category.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
