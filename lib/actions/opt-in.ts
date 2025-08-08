"use server"

type State = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

function isValidE164(phone: string) {
  // Accepts E.164: + and up to 15 digits
  return /^\+[1-9]\d{7,14}$/.test(phone.replace(/\s+/g, ""))
}

export async function optIn(prevState: State, formData: FormData): Promise<State> {
  // Validate required consent and phone number server-side
  const consent = formData.get("consent")
  const phone = String(formData.get("phone") || "").trim().replace(/\s+/g, "")

  const errors: Record<string, string> = {}

  if (!phone) {
    errors.phone = "Phone number is required."
  } else if (!isValidE164(phone)) {
    errors.phone = "Enter a valid phone number in E.164 format (e.g., +15551234567)."
  }

  if (!consent) {
    errors.consent = "You must agree to receive text messages from Squorum."
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please correct the errors and try again.", errors }
  }

  // NOTE: This is where you'd persist consent and phone to your database,
  // and trigger your SMS provider to send a confirmation message.
  // For example: store { phone, consentAt: new Date(), source: "web" }

  // Return success state to render the on-page confirmation message.
  return {
    ok: true,
    message:
      "You are now opted in to receive Squorum game updates. For help, reply HELP. To opt out, reply STOP.",
  }
}
