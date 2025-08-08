import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from 'lucide-react'
import OptInForm from "@/components/opt-in-form"

export default function Page() {
  return (
    <main className="min-h-[100vh] w-full">
      <section className="mx-auto max-w-2xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Sign up for Squorum SMS updates</CardTitle>
            <CardDescription>
              Enter your mobile phone number and opt in to receive text messages about game scheduling, reminders, and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OptInForm />
            <div className="mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Consent required</AlertTitle>
                <AlertDescription>
                  No messages are sent without prior opt&#45;in. Message and data rates may apply. Message frequency may vary. Reply STOP to opt out, HELP for help.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
            <p>
              Need a copy of our SMS policy? See{" "}
              <Link href="/policy" className="underline underline-offset-4 hover:text-foreground">
                the policy page
              </Link>
              .
            </p>
            <p className="text-xs">
              By continuing, you agree to our{" "}
              <Link href="/policy" className="underline underline-offset-4 hover:text-foreground">
                Terms and SMS Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
