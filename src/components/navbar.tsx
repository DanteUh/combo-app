import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();
  const [toggleProfileMenu, setToggleProfileMenu] = useState<boolean>(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);

  return (
    <div className="min-h-full">
      <nav className="bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="px-3 py-2 text-sm font-medium text-white hover:underline"
                    aria-current="page"
                  >
                    Combo Lists
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <div>
                    {sessionData?.user ? (
                      <button
                        type="button"
                        className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() =>
                          void setToggleProfileMenu(!toggleProfileMenu)
                        }
                      >
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-10 w-10 rounded-full"
                          width={50}
                          height={50}
                          src={
                            sessionData.user.image ? sessionData.user.image : ''
                          }
                          alt=""
                        />
                      </button>
                    ) : (
                      <button
                        className="rounded-md border border-indigo-400 px-8 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
                        onClick={() => void signIn('discord')}
                      >
                        Sign in
                      </button>
                    )}
                  </div>
                  {toggleProfileMenu && (
                    <div
                      className="absolute right-0 z-10 mt-2 flex w-48 origin-top-right items-center justify-between rounded-sm bg-gray-900 px-4 py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-500 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <p className="font-bold">{sessionData?.user.name}</p>
                      <button
                        className="block text-sm text-red-500 hover:underline"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                        onClick={() => void signOut()}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {sessionData ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => void setToggleMobileMenu(!toggleMobileMenu)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="rounded-md border border-indigo-400 px-8 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signIn('discord')}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
        {toggleMobileMenu && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:underline"
                aria-current="page"
              >
                ComboLists
              </a>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              {sessionData && (
                <>
                  <div className="flex items-center justify-between px-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-10 w-10 rounded-full"
                          width={50}
                          height={50}
                          src={
                            sessionData?.user.image
                              ? sessionData.user.image
                              : ''
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {sessionData?.user.name}
                        </div>
                      </div>
                    </div>
                    <button
                      className="block rounded-sm border border-red-500 px-5 py-1 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                      onClick={() => void signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
