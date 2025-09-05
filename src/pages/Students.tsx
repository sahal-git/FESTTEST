import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents, deleteStudent, StudentWithTeam } from "@/queries/students";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentSheet } from "./students/StudentSheet";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const Students = () => {
  const queryClient = useQueryClient();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentWithTeam | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success("Student deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentsCount"] });
      setIsAlertOpen(false);
      setDeletingStudentId(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleEdit = (student: StudentWithTeam) => {
    setEditingStudent(student);
    setIsSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingStudentId(id);
    setIsAlertOpen(true);
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    setIsSheetOpen(true);
  };

  const columns: ColumnDef<StudentWithTeam>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "admission_no",
      header: "Admission No.",
    },
    {
      accessorKey: "class",
      header: "Class",
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("category") as string;
            return <Badge variant="outline">{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>;
        }
    },
    {
      accessorKey: "teams.name",
      header: "Team",
      cell: ({ row }) => row.original.teams?.name || <span className="text-muted-foreground">N/A</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleEdit(student)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(student.id)} className="text-red-500">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: students ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student registrations and team assignments</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                    {columns.map((column, j) => (
                        <TableCell key={j}>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <StudentSheet open={isSheetOpen} onOpenChange={setIsSheetOpen} student={editingStudent} />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingStudentId && deleteMutation.mutate(deletingStudentId)}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Students;
