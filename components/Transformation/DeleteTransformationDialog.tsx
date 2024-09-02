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

type DeleteTransformationProps = {
  transformationId: string;
};

const DeleteTransformationDialog = ({
  transformationId,
}: DeleteTransformationProps) => {
  const router = useRouter();
  const { isPending, execute } = useServerAction(deleteTransformation);

  const deleteImageHandler = async () => {
    toast.promise(execute({ id: transformationId }), {
      loading: "Deleting...",
      success: (result) => {
        router.push("/generative-fill");
        return <>{result[0]?.message}</>;
      },
      error: (err) => {
        return <>Could not delete your image!</>;
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          icon={<IconTrash size={15} />}
        >
          Delete
        </Button>
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

export default DeleteTransformationDialog;
