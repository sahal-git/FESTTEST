import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Program, ProgramType } from "./ProgramSheet";
import { deleteStageProgram } from "@/queries/stagePrograms";
import { deleteNonStageProgram } from "@/queries/nonStagePrograms";
import { deleteSportsProgram } from "@/queries/sportsPrograms";

interface ProgramDataTableProps {
  programType: ProgramType;
  data: Program[] | undefined;
  isLoading: boolean;
  onEdit: (program: Program) => void;
}

export function ProgramDataTable({ programType, data, isLoading, onEdit }: ProgramDataTableProps) {
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(null);

  const deleteMutationFn = (id: string) => {
    switch (programType) {
      case 'stage': return deleteStageProgram(id);
      case 'nonstage': return deleteNonStageProgram(id);
      case 'sports': return deleteSportsProgram(id);
    }
    throw new Error("Invalid program type");
  };

  const deleteMutation = useMutation({
    mutationFn: deleteMutationFn,
    onSuccess: () => {
      toast.success("Program deleted successfully");
      queryClient.invalidateQueries({ queryKey: [`${programType}Programs`] });
      queryClient.invalidateQueries({ queryKey: ["programsCount"] });
      setIsAlertOpen(false);
      setDeletingProgramId(null);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    setDeletingProgramId(id);
    setIsAlertOpen(true);
  };

  const columns: ColumnDef<Program>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return <Badge variant="outline">{category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}</Badge>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const program = row.original;
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
                <DropdownMenuItem onClick={() => onEdit(program)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(program.id)} className="text-red-500">
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
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
              Array.from({ length: 3 }).map((_, i) => (
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
                <TableRow key={row.id}>
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
                  No programs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingProgramId && deleteMutation.mutate(deletingProgramId)}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
