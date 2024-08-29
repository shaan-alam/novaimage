import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../actions/user.actions";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);

  return (
    <main className="bg-neutral-900 flex h-screen relative overflow-hidden">
      <span className="h-[800px] w-[800px] bg-blue-500 rounded-full absolute -top-[30%] left-[-20%] blur-3xl bg-opacity-20"></span>
      <div className="absolute inset-0 z-20 flex">
        <Sidebar user={JSON.parse(JSON.stringify(user))} />
        <ScrollArea className="h-full p-24 pb-8 pr-0 w-full">
          {children}
        </ScrollArea>
      </div>
    </main>
  );
};

export default DashboardLayout;
