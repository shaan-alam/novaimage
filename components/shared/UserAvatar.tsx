import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UserAvatar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="mt-auto flex items-center space-x-2">
      <UserButton />
      <p></p>
    </div>
  );
};

export default UserAvatar;
