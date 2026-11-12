"use client"

import Image from "next/image"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs", active: false },
  { label: "Company", href: "/company", active: false },
  { label: "Pricing", href: "/pricing", active: false },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#08080a]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Hireloop home"
          className="shrink-0 outline-none focus-visible:ring-2 focus-visible-ring-[#6c5dfc]/60"
        >
          <Image
            src={logo}
            alt="Hireloop"
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 rounded-xl bg-[#141416] p-1.5 lg:flex">
          <nav aria-label="Main" className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible-ring-[#6c5dfc]/60",
                  link.active
                    ? "font-semibold text-white"
                    : "font-medium text-[#a1a1a6] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span aria-hidden="true" className="mx-2 h-6 w-px bg-white/10" />

          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#a7a5c0] transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible-ring-[#6c5dfc]/60"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 rounded-lg bg-[#6c5dfc] px-5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:bg-[#7d70ff] focus-visible-ring-[#6c5dfc]/50"
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open menu"
                className="rounded-lg text-white hover:bg-white/10 lg:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-[min(20rem,85vw)] gap-0 border-l border-white/10 bg-[#0b0b0d] p-0 text-white"
          >
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute top-4 right-3 text-white hover:bg-white/10 hover:text-white"
                />
              }
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </SheetClose>

            <SheetHeader className="border-b border-white/10 p-5">
              <SheetTitle className="text-white">
                <SheetClose
                  render={
                    <Link
                      href="/"
                      aria-label="Hireloop home"
                      className="inline-flex"
                    />
                  }
                >
                  <Image src={logo} alt="Hireloop" className="h-8 w-auto" />
                </SheetClose>
              </SheetTitle>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-colors",
                    link.active
                      ? "bg-white/5 font-semibold text-white"
                      : "font-medium text-[#a1a1a6] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 p-4">
              <SheetClose
                render={<Link href="/sign-in" />}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-10 w-full border-white/15 bg-transparent text-[#a7a5c0] hover:bg-white/5 hover:text-white"
                )}
              >
                Sign In
              </SheetClose>

              <SheetClose
                render={<Link href="/sign-up" />}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-10 w-full bg-[#6c5dfc] text-sm font-semibold text-white hover:bg-[#7d70ff]"
                )}
              >
                Get Started
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}