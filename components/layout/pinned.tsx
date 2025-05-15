'use client';

import { Link, Navbar, NavbarContent } from '@heroui/react';

export const Pinned = () => {
  return (
    <Navbar
      maxWidth="xl"
      isBlurred
      className="bg-background backdrop-blur-lg backdrop-saturate-250 text-sm h-12 relative">
      <NavbarContent className="w-full hidden sm:flex gap-2 justify-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span
              aria-label="rocket"
              className="hidden md:block"
              role="img">
              🚀
            </span>
            <span
              className="inline-flex md:ml-1 animate-text-gradient font-medium  bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
              style={{
                backgroundSize: '200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>
              Join Jujus and get 100% off your first month.
            </span>
          </Link>
          <a
            className="flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            href="https://jujus.ai/pricing"
            rel="noopener noreferrer">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]"></span>
            <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
              Jujus Pro
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]"
                width="16"
                height="16"
                viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 12h16m0 0l-6-6m6 6l-6 6"></path>
              </svg>
            </div>
          </a>
        </div>
      </NavbarContent>
    </Navbar>
  );
};
