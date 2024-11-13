import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
    title: 'Book Krlo',
    description: 'Ticket booking website',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
