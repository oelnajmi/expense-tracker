import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteExpenseDialogProps {
  expenseId: string;
  onDeleteExpense: (id: string) => void;
}

export default function DeleteExpenseDialog({
  expenseId,
  onDeleteExpense,
}: DeleteExpenseDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background border-border sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete the
            expense.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onDeleteExpense(expenseId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
