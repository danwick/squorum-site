"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimulateSmsPage() {
  const [from, setFrom] = React.useState("+15551234567")
  const [message, setMessage] = React.useState("HELP")
  const [reply, setReply] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function send() {
    setLoading(true)
    setError(null)
    setReply(null)
    try {
      const res = await fetch("/api/sms/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, message }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || "Request failed")
      } else {
        setReply(data?.reply || JSON.stringify(data))
      }
    } catch (e: any) {
      setError(e?.message || "Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Simulate Inbound SMS</CardTitle>
          <CardDescription>Test STOP and HELP handling via the webhook endpoint.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <Input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="+15551234567" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type STOP or HELP" />
          </div>
          <Button onClick={send} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
          {reply && <p className="text-sm">Reply: {reply}</p>}
          {error && <p className="text-sm text-red-600">Error: {error}</p>}
        </CardContent>
      </Card>
    </main>
  )
}
