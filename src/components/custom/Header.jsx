import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const { user, isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-slate-900/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="شعار السيرة الذاتية الذكية"
              className="cursor-pointer transition hover:opacity-80"
              width={40}
              height={40}
            />
            <span className="hidden text-lg font-bold text-white sm:inline">
              TuniBless
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-300 transition hover:text-primary"
            >
              الرئيسية
            </Link>
            <a
              href="#how"
              className="text-sm font-medium text-slate-300 transition hover:text-primary"
            >
              كيف يعمل
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 transition hover:text-primary"
            >
              المزايا
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link to="/dashboard">
                  <Button className="bg-primary/90 hover:bg-primary text-white rounded-full">
                    لوحة التحكم
                  </Button>
                </Link>
                <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/30">
                  <UserButton />
                </div>
              </>
            ) : (
              <Link to="/auth/sign-in">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  ابدأ الآن
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 transition hover:bg-slate-900 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>
            <a
              href="#how"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              كيف يعمل
            </a>
            <a
              href="#features"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              المزايا
            </a>
            <div className="border-t border-slate-800 pt-2 mt-2 space-y-2">
              {isSignedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full bg-primary/90 hover:bg-primary text-white rounded-full">
                      لوحة التحكم
                    </Button>
                  </Link>
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-primary/30 mx-auto">
                    <UserButton />
                  </div>
                </>
              ) : (
                <Link
                  to="/auth/sign-in"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                    ابدأ الآن
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
