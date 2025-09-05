import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { StudentWithTeam, createStudent, updateStudent } from "@/queries/students";
import { getTeams, Team } from "@/queries/teams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Constants } from "@/integrations/supabase/types";

const studentSchema = z.object({
  name: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  admission_no: z.string().min(1, { message: "Admission number is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  category: z.enum(Constants.public.Enums.student_category),
  team_id: z.string().nullable().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: StudentWithTeam | null;
}

export function StudentSheet({ open, onOpenChange, student }: StudentSheetProps) {
  const queryClient = useQueryClient();
  const isEditing = !!student;

  const { data: teams, isLoading: isLoadingTeams } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      admission_no: "",
      class: "",
      category: "junior",
      team_id: null,
    },
  });

  useEffect(() => {
    if (student) {
      form.reset({
        name: student.name,
        admission_no: student.admission_no,
        class: student.class,
        category: student.category,
        team_id: student.team_id,
      });
    } else {
      form.reset({
        name: "",
        admission_no: "",
        class: "",
        category: "junior",
        team_id: null,
      });
    }
  }, [student, form]);

  const mutation = useMutation({
    mutationFn: (values: StudentFormValues) => {
      const studentData = {
        ...values,
        fest_id: `FEST-2025-${values.admission_no}` // Generate a unique fest_id
      };
      return isEditing
        ? updateStudent(student.id, studentData)
        : createStudent(studentData);
    },
    onSuccess: () => {
      toast.success(isEditing ? "Student updated successfully" : "Student created successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsCount"] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEditing ? "Edit Student" : "Add New Student"}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the details for this student."
              : "Register a new student for the fest."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admission_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission No.</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter admission number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10B" {...field} />
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
                      {Constants.public.Enums.student_category.map((cat) => (
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
            <FormField
              control={form.control}
              name="team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "none" ? null : value)}
                    value={field.value ?? "none"}
                    disabled={isLoadingTeams}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign to a team (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Team</SelectItem>
                      {teams?.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
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
