"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react"

import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const searchParams=useSearchParams()
  const redirectTo=searchParams.get('redirectTo') ?? '/'
  console.log(redirectTo)

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
           
    const { data:fromData, error } = await authClient.signIn.email({
   email:data.email as string, 
    password:data.password as string, 
    rememberMe: true,
    callbackURL: redirectTo, 
        });

    console.log("Sign-in form data:", data)
    console.log("Sign-in form Response:", fromData, error)
    // setMessage("Your sign-in information was collected.")
  }

  return (
    <main className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#09090b] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#6c5dfc]/15 blur-[120px]" />
        <div className="absolute -right-36 bottom-0 h-80 w-80 rounded-full bg-[#4b3bce]/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid min-h-[min(42rem,calc(100svh-10rem))] max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <section className="hidden min-h-[34rem] flex-col justify-between rounded-[2rem] border border-white/10 bg-[#111114]/80 p-10 shadow-2xl shadow-black/20 lg:flex">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8175ff]/25 bg-[#6c5dfc]/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#c5bfff]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              HIRING, REIMAGINED
            </div>
            <h1 className="mt-8 max-w-lg text-4xl leading-tight font-semibold tracking-tight xl:text-5xl">
              Make your next move a great one.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-[#a1a1aa]">
              A clearer path to the people and opportunities that move your
              career forward.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#6c5dfc]/15 text-[#a9a0ff]">
                <BriefcaseBusiness className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-white">Your next chapter</p>
                <p className="mt-1 text-sm leading-6 text-[#a1a1aa]">
                  Find roles that fit your ambitions, and make your experience
                  count.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-[#c5bfff]">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Built for your next opportunity
            </div>
          </div>
        </section>

        <section
          aria-labelledby="auth-heading"
          className="mx-auto w-full max-w-[31rem] rounded-[2rem] border border-white/10 bg-[#111114]/90 p-6 shadow-2xl shadow-black/30 sm:p-9"
        >
          <div className="mb-8">
            <p className="text-sm font-medium text-[#a9a0ff]">WELCOME BACK</p>
            <h2
              id="auth-heading"
              className="mt-3 text-3xl font-semibold tracking-tight"
            >
              Sign in to Hireloop
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#a1a1aa]">
              Pick up where you left off in your career journey.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            onInput={() => setMessage("")}
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#e4e4e7]"
              >
                Email address
              </label>
              <input
                autoComplete="email"
                className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#0b0b0d] px-4 text-sm text-white outline-none transition placeholder:text-[#777780] focus:border-[#8175ff] focus:ring-4 focus:ring-[#6c5dfc]/15"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#e4e4e7]"
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#0b0b0d] px-4 text-sm text-white outline-none transition placeholder:text-[#777780] focus:border-[#8175ff] focus:ring-4 focus:ring-[#6c5dfc]/15"
                id="password"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
                required
                type={showPassword ? "text" : "password"}
              />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6c5dfc]/15 focus:ring-offset-2" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 pt-0.5">
              <label className="flex items-center gap-2.5 text-sm text-[#c4c4cc]">
                <input
                  className="size-4 accent-[#6c5dfc]"
                  name="rememberMe"
                  type="checkbox"
                />
                Remember me
              </label>
            </div>

            {message && (
              <p
                aria-live="polite"
                className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm leading-6 text-emerald-200"
                role="status"
              >
                {message}
              </p>
            )}

            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6c5dfc] px-5 text-sm font-semibold text-white transition hover:bg-[#7d70ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9a0ff]"
              type="submit"
            >
              Sign in
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>

                      <div className="mt-4">
            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6c5dfc] px-5 text-sm font-semibold text-white transition hover:bg-[#7d70ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9a0ff]"
              type="button"
            >
              <FcGoogle className="size-4" aria-hidden="true"/>
              Continue with Google
            </button>
          </div>
          </form>



          <p className="mt-7 text-center text-sm text-[#a1a1aa]">
            New to Hireloop?{" "}
            <Link
              className="font-semibold text-[#b8b0ff] underline-offset-4 hover:text-white hover:underline"
              href="/sign-up"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
