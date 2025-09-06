export const runtime = "nodejs"
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



export async function POST(req: Request) {
    const data = await req.json().catch(() => null);


    if(!data) {
        return NextResponse.json({ ok: false, error: "Invalid JSON"}, {status: 400 });
    }

    const email = String(data.email || "").trim();
    const budget = data.budget ?? "";
    const color = String(data.color || "").trim();
    const specialRequests = String(data["special-requests"] || "").trim();

    if(!email) {
        return NextResponse.json({ ok: false, error: "Email Required"}, {status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b24786be28bd5e",
    pass: "930c9cc02b49d5"
  }
});
        await transporter.verify();


        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: "New PC Build Request (Mailtrap Test)",
            text: `
             New request form: ${email}
             
             Budget: ${budget}
             Color: ${color}
             Special Requests: ${specialRequests}
            `,
        });

        return NextResponse.json({ ok: true});
    }   catch (err: any) {
        console.error("Mail error:", err);
        return NextResponse.json({ ok: false, error: "Failed to send email"}, { status: 500});
    }
}