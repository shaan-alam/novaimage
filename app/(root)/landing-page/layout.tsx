import Navbar from "@/components/shared/navbar";
import { PropsWithChildren } from "react";

const LandingPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default LandingPageLayout;
