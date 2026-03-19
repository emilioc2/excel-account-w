import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const serviceName = typeof body.serviceName === 'string' ? body.serviceName.trim() : ''
  const subject = serviceName
    ? `Website Enquiry — ${serviceName} — from ${name}`
    : `Website Contact — from ${name}`

  const phone = typeof body.phone === 'string' ? body.phone : ''
  const company = typeof body.company === 'string' ? body.company : ''
  const message = typeof body.message === 'string' ? body.message : ''

  const htmlBody = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    ${serviceName ? `<p><strong>Service:</strong> ${serviceName}</p>` : ''}
    ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>` : ''}
  `.trim()

  try {
    await resend.emails.send({
      from: 'website@excelaccounting.co.za',
      to: 'emiliochanderdutt9@gmail.com',
      replyTo: email,
      subject,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }
}
