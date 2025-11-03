"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface InfiniteScrollProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  className?: string
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
}

export default function InfiniteScroll({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: InfiniteScrollProps) {
  const [isClient, setIsClient] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex space-x-4">{children}</div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} ref={scrollRef}>
      <div
        className={`flex space-x-4 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `scroll-${direction} ${speedMap[speed]} linear infinite`,
          width: "max-content",
        }}
      >
        {/* First set of items */}
        <div className="flex space-x-4 shrink-0">{children}</div>
        {/* Duplicate set for seamless loop */}
        <div className="flex space-x-4 shrink-0">{children}</div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
