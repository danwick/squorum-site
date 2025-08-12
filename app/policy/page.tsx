export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Squorum SMS Opt‑In Policy</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              This page documents how users consent to receive SMS from Squorum and how we handle STOP and HELP
              requests.
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-10 space-y-10">
            {/* Who Sends The Messages */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Who Sends The Messages
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Messages are sent by Squorum to users who have provided explicit consent.
              </p>
            </section>

            {/* What Users Receive */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                What Users Receive
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Transactional messages only: game scheduling, confirmations, reminders, and related updates.
              </p>
            </section>

            {/* How Users Opt In */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                How Users Opt In
              </h2>
              <ol className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span className="leading-relaxed">
                    During account setup at{" "}
                    <a
                      href="https://v0-squorum-site.vercel.app"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2"
                    >
                      https://v0-squorum-site.vercel.app
                    </a>
                    , users enter their mobile number.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span className="leading-relaxed">
                    Users must check a consent box labeled:{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      "I agree to receive text messages about game scheduling, reminders, and updates from Squorum."
                    </strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span className="leading-relaxed">
                    The checkbox must be selected before the form can be submitted.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </span>
                  <span className="leading-relaxed">
                    After successful signup, users receive a confirmation text:{" "}
                    <em className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                      "You are now opted in to receive Squorum game updates. For help, reply HELP. To opt out, reply
                      STOP."
                    </em>
                  </span>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-gray-100">Screenshot of the opt‑in UI:</strong>{" "}
                  <a
                    href="https://v0-squorum-site.vercel.app/screenshot"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2"
                  >
                    https://v0-squorum-site.vercel.app/screenshot
                  </a>
                </p>
              </div>
            </section>

            {/* Message Frequency and Fees */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Message Frequency and Fees
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Message frequency varies based on activity, typically 0–8 messages per week. Message and data rates may
                apply.
              </p>
            </section>

            {/* STOP and HELP */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                STOP and HELP
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">STOP</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Reply STOP to unsubscribe. You will receive a confirmation of the opt‑out and no further messages
                    will be sent unless you re‑opt in.
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">HELP</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Reply HELP for support information and contact details.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-gray-100">Support:</strong>{" "}
                  <a
                    href="mailto:danwick@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2"
                  >
                    danwick@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not sell or share phone numbers for third‑party marketing. Numbers are used only to deliver
                Squorum's transactional updates.
              </p>
            </section>

            {/* Last Updated */}
            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Last Updated:</strong> August 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
