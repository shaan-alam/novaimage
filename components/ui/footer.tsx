import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background broder border-t border-accent mt-12 relative z-40">
      <div className="background">
        <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[10%] pt-[30%] left-[20%] top-[30%] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[20%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[10%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-primary tracking-widest text-sm mb-3">
              Important Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/about"
                  className="text-secondary-foreground hover:underline mb-3 block tracking-wider text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-secondary-foreground hover:underline mb-3 block tracking-wider text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-secondary-foreground hover:underline mb-3 block tracking-wider text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-foreground hover:underline mb-3 block tracking-wider text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-privacy"
                  className="text-secondary-foreground hover:underline mb-3 block tracking-wider text-sm"
                >
                  Terms & Privacy
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2024 Nova Image. All Rights Reserved.
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
            Connecting the art world
          </span>
        </div>
      </div>
    </footer>
  );
}
