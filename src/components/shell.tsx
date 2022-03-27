import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import classNames from "../lib/classNames";
import { Toaster } from "react-hot-toast";

export default function Shell(props) {
  const router = useRouter();
  // const [session, loading] = useSession();

  const session = {};
  const navigation = [
    {
      name: "Event Types",
      href: "/event-types",
      current: router.pathname.startsWith("/event-types"),
    },
  ];
  const pageTitle = typeof props.heading === "string" ? props.heading : props.title;

  return session ? (
    <>
      <div>
        <Toaster position="bottom-right" />
      </div>

      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-56">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-1 h-0 bg-white border-r border-gray-200">
              <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <Link href="/event-types">
                  <a className="px-4"></a>
                </Link>
                <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className={classNames(item.current ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:bg-gray-50 hover:text-neutral-900", "group flex items-center px-2 py-2 text-sm font-medium rounded-sm")}>{item.name}</a>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4">{/* <UserDropdown /> */}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
            {/* show top navigation for md and smaller (tablet and phones) */}
            <nav className="flex items-center justify-between p-4 bg-white shadow md:hidden">
              <Link href="/event-types">
                <a>{/* <Logo /> */}</a>
              </Link>
              <div className="flex items-center self-center gap-3">
                <button className="p-2 text-gray-400 bg-white rounded-full hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  <span className="sr-only">View notifications</span>
                  <Link href="/settings/profile">
                    <a>{/* <CogIcon className="w-6 h-6" aria-hidden="true" /> */}</a>
                  </Link>
                </button>
                <div className="mt-1">{/* <UserDropdown small bottom session={session} /> */}</div>
              </div>
            </nav>
            <div className="py-8">
              <div className="justify-between block px-4 sm:flex sm:px-6 md:px-8">
                <div className="mb-8">
                  <h1 className="text-xl font-bold text-gray-900">{props.heading}</h1>
                  <p className="mr-4 text-sm text-neutral-500">{props.subtitle}</p>
                </div>
                <div className="flex-shrink-0 mb-4">{props.CTA}</div>
              </div>
              <div className="px-4 sm:px-6 md:px-8">{props.children}</div>

              {/* show bottom navigation for md and smaller (tablet and phones) */}
              <nav className="fixed bottom-0 flex w-full bg-white shadow bottom-nav md:hidden">
                {/* note(PeerRich): using flatMap instead of map to remove settings from bottom nav */}
                {navigation.flatMap((item, itemIdx) =>
                  item.name === "Settings" ? (
                    []
                  ) : (
                    <Link key={item.name} href={item.href}>
                      <a className={classNames(item.current ? "text-gray-900" : "text-neutral-400 hover:text-gray-700", itemIdx === 0 ? "rounded-l-lg" : "", itemIdx === navigation.length - 1 ? "rounded-r-lg" : "", "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-xs sm:text-sm font-medium text-center hover:bg-gray-50 focus:z-10")} aria-current={item.current ? "page" : undefined}>
                        <span>{item.name}</span>
                      </a>
                    </Link>
                  )
                )}
              </nav>

              {/* add padding to content for mobile navigation*/}
              <div className="block pt-12 md:hidden" />
            </div>
          </main>
        </div>
      </div>
    </>
  ) : null;
}
