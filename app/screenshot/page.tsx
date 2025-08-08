export default function ScreenshotPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="space-y-4">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold">Squorum SMS Opt&#45;In Form Screenshot</h1>
          <p className="text-muted-foreground">
            This page hosts a screenshot of the SMS opt&#45;in form for compliance reviews and documentation.
          </p>
          <p className="text-sm">
            Direct source URL:{" "}
            <a
              href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-08-08%20at%2007.51.17%402x-vGerC5NgWrsukSmPOtUZOVWbUjrKof.png"
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-08-08%20at%2007.51.17%402x-vGerC5NgWrsukSmPOtUZOVWbUjrKof.png
            </a>
          </p>
        </header>

        <div className="overflow-hidden rounded-lg border bg-muted/20">
          {/* Per user instruction, use the Source URL directly. Using img avoids Next Image remote config. */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-08-08%20at%2007.51.17%402x-vGerC5NgWrsukSmPOtUZOVWbUjrKof.png"
            alt="Screenshot of the Squorum SMS opt-in form showing phone input, required consent checkbox, and policy hints."
            className="h-auto w-full"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          If you need a stable URL tied to your domain, deploy this site and share the link to this page.
        </p>
      </div>
    </main>
  )
}
