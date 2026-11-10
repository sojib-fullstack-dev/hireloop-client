"use client"

import { ReactNode } from "react"

export function Hero({
  title,
  description,
  buttonText,
  buttonHref,
  icon,
}: {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  icon: ReactNode
}) {
  return (
    <section className="pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1d] leading-tight mb-4">
              {title}
            </h1>
            <p className="text-[#6b6b80] text-lg lg:text-xl max-w-xl mb-8">
              {description}
            </p>
            <div className="flex gap-3">
              <button className="btn-primary">
                {buttonText}
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12hM19 12" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="btn-outline">{buttonText}</button>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero-bg.png"
              alt="Hero illustration"
              className="relative w-full h-[450px] object-cover rounded-lg lg:h-[550px]"
              loading="lazy"
            />
            <div
              className="absolute -bottom-6 -left-6 bg-[#6c5dfc] px-4 py-2 rounded-full text-sm text-white"
            >
              <span className="font-medium">150k+</span>
              <span> Active Users</span>
            </div>
            <div
              className="absolute -bottom-6 -right-6 bg-[#7c3aed] px-4 py-2 rounded-full text-sm text-white"
            >
              <span className="font-medium">2,500+</span>
              <span> Companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}