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
import { authClient } from "@/lib/auth-client"




export function Navbar() {
  // const router=useRouter()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <span className="text-xl text-white">Loading...</span>
  }
  // console.log("user data", session)
  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error) {
      console.error("Sign-out failed:", error)
    }
  }

  const navLinks = [
  { label: "Browse Jobs", href: "/browse-jobs", active: false },
  { label: "Company", href: "/company", active: false },
  { label: "Pricing", href: "/pricing", active: false },
  { label: "Dashboard", href: `/dashbord/${session?.user.role || 'seeker'}` },
]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#08080a]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Hireloop home"
          className="focus-visible-ring-[#6c5dfc]/60 shrink-0 outline-none focus-visible:ring-2"
        >
          <Image
            src={logo}
            alt="Hireloop"
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 rounded-xl bg-[#27272b] p-1.5 lg:flex">
          <nav aria-label="Main" className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "focus-visible-ring-[#6c5dfc]/60 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2",
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
          <div>
            {session?.user ? (
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8175ff]/25 bg-[#6c5dfc]/10 px-3 py-1 text-xs font-medium text-[#c5bfff]">
                  Welcome,{" "}
                  <strong className="font-semibold text-white">
                    {session?.user?.name}
                  </strong>
                </span>

                <Button
                  onClick={handleSignOut}
                  className="focus-visible-ring-[#6c5dfc]/60 rounded-lg px-3 py-2 text-sm font-medium text-[#a7a5c0] transition-colors outline-none hover:text-white focus-visible:ring-2"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="focus-visible-ring-[#6c5dfc]/60 rounded-lg px-3 py-2 text-sm font-medium text-[#a7a5c0] transition-colors outline-none hover:text-white focus-visible:ring-2"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "focus-visible-ring-[#6c5dfc]/50 h-10 rounded-lg bg-[#6c5dfc] px-5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:bg-[#7d70ff]"
                  )}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
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
