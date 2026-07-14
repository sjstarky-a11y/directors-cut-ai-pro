"use client"

import { useEffect, useState } from "react"
import { piNetwork } from "@/lib/pi-network"

export function PiBalanceDisplay() {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const user = piNetwork.getUser()
    if (user) {
      loadBalance()
    }
  }, [])

  const loadBalance = async () => {
    setIsLoading(true)
    try {
      const balance = await piNetwork.fetchBalance()
      setBalance(balance)
      console.log("[v0] Pi balance loaded:", balance)
    } catch (error) {
      console.error("[v0] Failed to load balance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const user = piNetwork.getUser()
  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">π</span>
        </div>
        <div>
          <div className="text-xs text-gray-400">Pi Balance</div>
          <div className="text-lg font-bold text-white">
            {isLoading ? "..." : balance !== null ? `${balance.toFixed(2)} π` : "N/A"}
          </div>
        </div>
      </div>
      <button
        onClick={loadBalance}
        disabled={isLoading}
        className="ml-auto text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50"
      >
        Refresh
      </button>
    </div>
  )
}
