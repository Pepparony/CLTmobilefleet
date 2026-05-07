// app/api/request-service/route.ts  (fleet.cltmobile.com)
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      accountId, companyName, vehicleId, vehicleName,
      serviceType, description, preferredDate, preferredTime,
      contactName, contactPhone,
    } = body;

    // Save request to MongoDB
    const client = await clientPromise;
    const db = client.db('test');
    await db.collection('fleetServiceRequests').insertOne({
      accountId,
      companyName,
      vehicleId,
      vehicleName,
      serviceType,
      description: description || '',
      preferredDate,
      preferredTime: preferredTime || '',
      contactName,
      contactPhone,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    // Email admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    function fmtDate(d: string) {
      const [y, m, day] = d.split('-').map(Number);
      return new Date(y, m - 1, day).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
    }

    await transporter.sendMail({
      from: `"CLTmobile Fleet" <${process.env.SMTP_USER}>`,
      to: 'support@cltmobile.com',
      subject: `Fleet Service Request — ${companyName} · ${vehicleName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f0; padding: 24px; border-radius: 12px;">
          <div style="background: #171717; border-radius: 10px; padding: 20px 24px; margin-bottom: 20px;">
            <p style="color: #fbbf24; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px 0;">Fleet Service Request</p>
            <h1 style="color: white; font-size: 22px; margin: 0;">${companyName}</h1>
          </div>

          <div style="background: white; border-radius: 10px; padding: 20px 24px; margin-bottom: 12px;">
            <p style="color: #6b7280; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Vehicle</p>
            <p style="color: #111; font-size: 18px; font-weight: bold; margin: 0;">${vehicleName}</p>
          </div>

          <div style="background: white; border-radius: 10px; padding: 20px 24px; margin-bottom: 12px;">
            <p style="color: #6b7280; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Service Requested</p>
            <p style="color: #111; font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">${serviceType}</p>
            ${description ? `<p style="color: #4b5563; font-size: 14px; margin: 0;">${description}</p>` : ''}
          </div>

          <div style="background: white; border-radius: 10px; padding: 20px 24px; margin-bottom: 12px;">
            <p style="color: #6b7280; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Preferred Schedule</p>
            <p style="color: #111; font-size: 16px; font-weight: bold; margin: 0;">${fmtDate(preferredDate)}${preferredTime ? ` at ${preferredTime}` : ''}</p>
          </div>

          <div style="background: white; border-radius: 10px; padding: 20px 24px; margin-bottom: 20px;">
            <p style="color: #6b7280; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Point of Contact</p>
            <p style="color: #111; font-size: 16px; font-weight: bold; margin: 0 0 4px 0;">${contactName}</p>
            <a href="tel:${contactPhone}" style="color: #ca8a04; font-size: 14px;">${contactPhone}</a>
          </div>

          <div style="text-align: center;">
            <a href="https://team.cltmobile.com/AdminJobsOverview/fleet" style="background: #eab308; color: #171717; font-weight: bold; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; display: inline-block;">
              View in Fleet Manager →
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Service request error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}