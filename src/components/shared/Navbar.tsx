"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../app/assets/logo.png";
import { TUserInfo } from "@/types/userTypes";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { useUser } from "@/context/UserContext";
import DarkModeToggle from "./DarkmodeToggle";

const Navbar = ({ userInfo }: { userInfo: TUserInfo }) => {
  const { setIsLoading, setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsLoading(true);
    router.push("/login");
  };
  const isActive = (path: string) => pathname === path;
  const linkClasses = (path: string) =>
    `hover:text-purple-600 ${
      pathname === path
        ? "text-purple-700 font-semibold"
        : "text-gray-700 dark:text-gray-300"
    }`;

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 shadow-xl sticky top-0 w-full z-50 transition duration-300 md:px-16 px-5 flex items-center justify-between py-4 ">
      <div className=" bg-purple-300">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} height={70} />
        </Link>
      </div>
      <div className="space-x-6 hidden md:flex">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/events" className={linkClasses("/events")}>
          Events
        </Link>
        <Link href="/addEvent" className={linkClasses("/addEvent")}>
          Add Event
        </Link>
        <Link href="/myEvents" className={linkClasses("/myEvents")}>
          My Event
        </Link>
        {userInfo && (
          <div className="space-x-6">
            <Link href="/myAttendence" className={linkClasses("/myAttendence")}>
              My Attendence
            </Link>
            <Link href="/profile" className={linkClasses("/profile")}>
              Profile
            </Link>
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-3">
        {!userInfo ? (
          <div className="space-x-6">
            <Link
              href="/login"
              className={`px-4 py-2 rounded transition ${
                isActive("/login")
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/signUp"
              className={`px-4 py-2 rounded transition ${
                isActive("/signUp")
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src={userInfo?.photoURL}
                alt="Profile"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-md w-40 z-50">
                <div className="px-4 py-2 text-sm text-purple-700 dark:text-gray-200 border-b dark:border-gray-600">
                  {userInfo?.name}
                </div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <DarkModeToggle />
      </div>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && (
        <div className="absolute top-full right-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg flex flex-col gap-4 px-6 py-4 md:hidden">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
            >
              Events
            </Link>
            <Link
              href="/addEvent"
              className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
            >
              Add Event
            </Link>
            <Link
              href="/myEvents"
              className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
            >
              My Event
            </Link>
            {userInfo && (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/myAttendence"
                  className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
                >
                  My Attendence
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-purple-600 dark:hover:text-purple-400 text-gray-800 dark:text-gray-200"
                >
                  Profile
                </Link>
              </div>
            )}
          </div>

          {!userInfo ? (
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signUp"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image
                  src={userInfo?.photoURL}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                  {userInfo?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          <DarkModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
