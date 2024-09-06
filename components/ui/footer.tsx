import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background broder border-t border-accent mt-12">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-semibold text-neutral-100 tracking-widest text-sm mb-3">
              Important Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-neutral-100 mb-3 block tracking-widest text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-neutral-400 hover:text-neutral-100 mb-3 block tracking-widest text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-neutral-100 mb-3 block tracking-widest text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-neutral-100 mb-3 block tracking-widest text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-privacy"
                  className="text-neutral-400 hover:text-neutral-100 mb-3 block tracking-widest text-sm"
                >
                  Terms & Privacy
                </Link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-background/90 border-t border-secondary">
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
