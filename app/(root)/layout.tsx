import Sidebar from "@/components/shared/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../actions/user.actions";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);

  return (
    <main className="bg-background app-layout">
      <div className="flex h-scren w-full">
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
          <Sidebar user={JSON.parse(JSON.stringify(user))} />
          <ResizablePanel defaultSize={80}>
            <div className="w-full p-10">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default DashboardLayout;
