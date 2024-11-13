import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/config/database';
import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_PORT == 465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
    },
});

// Define the Ticket schema
const TicketSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    paymentMethod: String,
    ticketCount: Number,
    amountPaid: Number,
    transactionId: String,
    screenshotUrl: String,
    createdAt: { type: Date, default: Date.now },
});

// Create the Ticket model
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);

export async function POST(request) {
    await connectDB();

    try {
        const {
            name,
            email,
            phone,
            paymentMethod,
            ticketCount,
            amountPaid,
            transactionId,
        } = await request.json();

        // Create a new ticket entry
        const newTicket = new Ticket({
            name,
            email,
            phone,
            paymentMethod,
            ticketCount,
            amountPaid,
            transactionId,
        });

        // Save the ticket to the database
        await newTicket.save();

        // Send confirmation email
        const mailOptions = {
            from: {
                name: 'BookKrlo',
                address: process.env.EMAIL_ADDRESS,
            },
            to: email,
            subject: 'Your BookKrlo Purchase Confirmation',
            text: `Dear ${name},

Thank you for your purchase on BookKrlo!

Transaction Details:
- Transaction ID: ${transactionId}
- Amount Paid: Rs ${amountPaid}
- Number of Tickets: ${ticketCount}
- Payment Method: ${paymentMethod}

Your tickets will be sent to you shortly in a separate email.

If you have any questions, please don't hesitate to contact us.

Best regards,
The BookKrlo Team`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Ticket saved successfully and confirmation email sent',
        });
    } catch (error) {
        console.error('Error saving ticket or sending email:', error);
        return NextResponse.json(
            { success: false, message: 'Error processing your request' },
            { status: 500 }
        );
    }
}
