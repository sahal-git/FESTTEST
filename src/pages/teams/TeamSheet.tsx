import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Team, createTeam, updateTeam } from "@/queries/teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const teamSchema = z.object({
  name: z.string().min(2, { message: "Team name must be at least 2 characters." }),
});

type TeamFormValues = z.infer<typeof teamSchema>;

interface TeamSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team?: Team | null;
}

export function TeamSheet({ open, onOpenChange, team }: TeamSheetProps) {
  const queryClient = useQueryClient();
  const isEditing = !!team;

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (team) {
      form.reset({ name: team.name });
    } else {
      form.reset({ name: "" });
    }
  }, [team, form]);

  const mutation = useMutation({
    mutationFn: (values: TeamFormValues) =>
      isEditing
        ? updateTeam(team.id, { name: values.name })
        : createTeam({ name: values.name }),
    onSuccess: () => {
      toast.success(isEditing ? "Team updated successfully" : "Team created successfully");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["teamsCount"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: TeamFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Team" : "Add New Team"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the details for this team."
              : "Create a new team for the fest."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>
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
      </SheetContent>
    </Sheet>
  );
}
