import mongoose from 'mongoose';

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

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);

export default Ticket;
