import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../actions/user.actions";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);

  return (
    <div className="bg-neutral-900 flex">
      <Sidebar user={JSON.parse(JSON.stringify(user))} />
      {children}
    </div>
  );
};

export default DashboardLayout;
