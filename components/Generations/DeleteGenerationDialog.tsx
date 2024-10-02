import { deleteTransformation } from "@/app/actions/cloudinary.actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";
import { deleteGeneratedImage } from "@/app/actions/image-gen.actions";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeyFactory } from "@/hooks/server-action-hooks";

type DeleteGenerationDialogProps = {
  generationId: string;
};

const DeleteGenerationDialog = ({
  generationId,
}: DeleteGenerationDialogProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isPending, execute } = useServerAction(deleteGeneratedImage);

  const deleteImageHandler = async () => {
    toast.promise(execute({ generationId }), {
      loading: "Deleting...",
      success: (result) => {
        queryClient.refetchQueries({
          queryKey: QueryKeyFactory.fetchMyImageGenerations(),
        });
        router.push("/dashboard");
        return <div>{result[0]?.message}</div>;
      },
      error: (err) => {
        return <div>Could not delete your image!</div>;
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white text-sm">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transformation?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogCancel asChild>
            <Button
              isLoading={isPending}
              onClick={deleteImageHandler}
              className="text-white bg-red-500 hover:bg-red-500/90"
            >
              <IconTrash size={16} />
              &nbsp; Delete
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGenerationDialog;
