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
    <main className="bg-neutral-900 flex h-screen">
      <Sidebar user={JSON.parse(JSON.stringify(user))} />
      <ScrollArea className="h-full p-24 pb-8 pr-0 w-full">{children}</ScrollArea>
    </main>
  );
};

export default DashboardLayout;
