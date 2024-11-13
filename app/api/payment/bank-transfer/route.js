import { NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Ticket from '@/models/Ticket';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: process.env.MAIL_PORT == 465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.APP_PASSWORD,
    },
});

export async function POST(request) {
    await connectDB();

    try {
        const { name, email, phone, ticketCount, amountPaid, screenshot } =
            await request.json();

        // Validate input
        if (
            !name ||
            !email ||
            !phone ||
            !ticketCount ||
            !amountPaid ||
            !screenshot
        ) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Upload screenshot to Cloudinary
        let uploadResponse;
        try {
            uploadResponse = await cloudinary.uploader.upload(screenshot, {
                upload_preset: 'bookkrlo_screenshots',
            });
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            return NextResponse.json(
                { success: false, message: 'Error uploading screenshot' },
                { status: 500 }
            );
        }

        // Create a new ticket entry
        const newTicket = new Ticket({
            name,
            email,
            phone,
            paymentMethod: 'bank_transfer',
            ticketCount,
            amountPaid,
            transactionId: Date.now().toString(),
            screenshotUrl: uploadResponse.secure_url,
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
- Transaction ID: ${newTicket.transactionId}
- Amount Paid: Rs ${amountPaid}
- Number of Tickets: ${ticketCount}
- Payment Method: Bank Transfer

Your tickets will be sent to you shortly in a separate email.

If you have any questions, please don't hesitate to contact us.

Best regards,
The BookKrlo Team`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            // Don't return here, as the transaction is still successful
        }

        return NextResponse.json({
            success: true,
            message: 'Bank transfer details saved successfully',
            data: {
                txnNo: newTicket.transactionId,
                txnDateTime: newTicket.createdAt,
            },
        });
    } catch (error) {
        console.error('Error processing bank transfer:', error);
        return NextResponse.json(
            { success: false, message: 'Error processing your request' },
            { status: 500 }
        );
    }
}
