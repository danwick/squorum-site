export async function POST(req: Request) {
  // Provider-agnostic JSON webhook example:
  // Expected payload: { from: string, message: string }
  // In production, verify signatures from your SMS provider here.

  let body: any
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 })
  }

  const from = String(body?.from || "").trim()
  const raw = String(body?.message || "").trim()
  const keyword = raw.toUpperCase()

  if (!from || !raw) {
    return new Response(JSON.stringify({ error: "Missing from or message" }), { status: 400 })
  }

  // Basic keyword handling
  if (keyword === "STOP" || keyword === "UNSUBSCRIBE" || keyword === "CANCEL" || keyword === "END" || keyword === "QUIT") {
    // TODO: Mark user as opted-out in your database
    return Response.json({
      to: from,
      reply:
        "You’ve been opted out of Squorum game updates. You will no longer receive messages. Reply HELP for help.",
      status: "unsubscribed",
    })
  }

  if (keyword === "HELP" || keyword === "INFO") {
    return Response.json({
      to: from,
      reply:
        "Squorum SMS: Get game scheduling, reminders, and updates. Reply STOP to opt out. Message/data rates may apply.",
      status: "help",
    })
  }

  // Default echo or acknowledgement for other inbound messages
  return Response.json({
    to: from,
    reply:
      "Thanks for your message. You are subscribed to Squorum updates. Reply STOP to opt out, HELP for help.",
    status: "ok",
  })
}
