"use client"

import * as React from "react"
import { useActionState } from "react"
import { Phone, CheckCircle2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { optIn } from "@/lib/actions/opt-in"

type State = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

const initialState: State = { ok: false, message: "" }

export default function OptInForm() {
  const [state, formAction, isPending] = useActionState(optIn, initialState)
  const [consented, setConsented] = React.useState(false)

  return (
    <div className="space-y-6">
      {!state.ok ? (
        <form action={formAction} className="grid gap-5" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="phone">Mobile phone number</Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                inputMode="tel"
                type="tel"
                placeholder="+1 555 123 4567"
                className="pl-9"
                aria-describedby="phone-help"
                required
              />
            </div>
            <p id="phone-help" className="text-xs text-muted-foreground">
              Use your mobile number. Format: +[country][number] (e.g., +15551234567).
            </p>
            {state?.errors?.phone ? (
              <p className="text-xs text-red-600">{state.errors.phone}</p>
            ) : null}
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              name="consent"
              checked={consented}
              onCheckedChange={(v) => setConsented(Boolean(v))}
              required
              aria-describedby="consent-help"
            />
            <div className="grid gap-1 leading-tight">
              <Label htmlFor="consent" className="font-normal">
                I agree to receive text messages about game scheduling, reminders, and updates from Squorum.
              </Label>
              <p id="consent-help" className="text-xs text-muted-foreground">
                You must select this box to sign up. Message and data rates may apply. Reply STOP to opt out, HELP for help.
              </p>
              {state?.errors?.consent ? (
                <p className="text-xs text-red-600">{state.errors.consent}</p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!consented || isPending}>
              {isPending ? "Submitting..." : "Sign up"}
            </Button>
            <p className="text-xs text-muted-foreground">No messages are sent without prior opt&#45;in.</p>
          </div>

          {state?.message && !state.ok ? (
            <p className="text-sm text-red-600" role="alert">
              {state.message}
            </p>
          ) : null}
        </form>
      ) : (
        <div className="rounded-md border p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="grid gap-1">
              <p className="font-medium">Opt-in confirmed</p>
              <p className="text-sm">
                You are now opted in to receive Squorum game updates. For help, reply HELP. To opt out, reply STOP.
              </p>
              <p className="text-xs text-muted-foreground">
                This confirmation appears immediately after signup; your SMS provider should also send a confirmation text.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
