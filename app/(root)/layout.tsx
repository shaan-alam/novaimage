import Sidebar from "@/components/shared/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../actions/user.actions";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);

  return (
    <main className="bg-background">
      <div className="flex">
        <Sidebar user={JSON.parse(JSON.stringify(user))} />
        <ScrollArea className="h-full mt-8 ml-20 pb-8 pr-0 w-full">
          {children}
        </ScrollArea>
      </div>
    </main>
  );
};

export default DashboardLayout;
