import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../actions/user.actions";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);

  return (
    <main className="bg-background app-layout">
      <div className="flex h-screen w-full py-2">
        <Sidebar user={JSON.parse(JSON.stringify(user))} />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
