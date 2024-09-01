import { deleteImage } from "@/app/actions/cloudinary.actions";
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
import { IconTrash, IconX } from "@tabler/icons-react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";

type DeleteMediaDialogProps = {
  publicId: string;
};

const DeleteMediaDialog = ({ publicId }: DeleteMediaDialogProps) => {
  const router = useRouter();
  const { isPending, execute } = useServerAction(deleteImage);

  const deleteImageHandler = async () => {
    toast.promise(execute({ publicId }), {
      loading: "Deleting...",
      success: () => {
        router.push("/generative-fill");
        return <>Successfully deleted your image!</>;
      },
      error: (err) => {
        console.log(err);
        return <>Could not delete your image!</>;
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span className="p-2 rounded-full hover:scale-105 transition-all w-fit block absolute top-8 right-2">
          <IconX className="text-gray-300" size={15} />
        </span>
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

export default DeleteMediaDialog;
