import Link from "next/link"

export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Squorum SMS Opt-In Policy</h1>
          <p className="text-muted-foreground">
            This page documents our SMS opt-in flow and message handling for compliance and review.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Opt-In Flow</h2>
          <p>
            Users opt in to receive SMS messages from Squorum by entering their mobile phone number on our website during
            account setup and checking a box that states:{" "}
            <span className="font-medium">
              I agree to receive text messages about game scheduling, reminders, and updates from Squorum.
            </span>{" "}
            This checkbox must be selected before the signup form can be submitted. After signup, users receive a confirmation message:{" "}
            <span className="font-medium">
              You are now opted in to receive Squorum game updates. For help, reply HELP. To opt out, reply STOP.
            </span>{" "}
            Users can opt out anytime by replying STOP, or request help by replying HELP. No messages are sent without prior opt-in.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Screenshot</h2>
          <p>
            For a hosted screenshot of the opt-in form, visit the{" "}
            <Link href="/screenshot" className="underline underline-offset-4">
              screenshot page
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">STOP and HELP Handling</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              STOP: When a user replies STOP, they are unsubscribed from further messages and receive a confirmation of
              the opt-out.
            </li>
            <li>HELP: When a user replies HELP, they receive support information and contact details.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Message and data rates may apply. Message frequency may vary. Reply STOP to opt out, HELP for help.
          </p>
        </section>

        <footer className="text-sm text-muted-foreground">
          For secure form handling in Next.js, we use Server Actions which execute on the server for auth/consent flows [^3].
        </footer>
      </div>
    </main>
  )
}
