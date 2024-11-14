import { NextResponse } from 'next/server';

const EASYPAISA_API_URL =
    'https://api.sahulatpay.com/payment/initiate-ep/b93fb70c-6ac3-4c2d-b92f-a6869b6306bc';
const TIMEOUT_DURATION = 60000; // 30 seconds

export async function POST(request) {
    console.log('EasyPaisa payment route called');

    try {
        const body = await request.json();
        console.log('Request body:', JSON.stringify(body, null, 2));

        if (!body.amount || !body.phone || !body.email) {
            console.error('Missing required fields in request body');
            return NextResponse.json(
                {
                    success: false,
                    message: 'Missing required fields',
                    statusCode: 400,
                },
                { status: 400 }
            );
        }

        const payload = {
            amount: body.amount.toString(),
            phone: body.phone,
            email: body.email,
            type: 'wallet',
            orderId: `EP${Date.now()}`, // Generate a unique order ID
        };
        console.log('Formatted payload:', JSON.stringify(payload, null, 2));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            console.log('Request aborted due to timeout');
        }, TIMEOUT_DURATION);

        console.log(`Initiating fetch to EasyPaisa API: ${EASYPAISA_API_URL}`);
        const response = await fetch(EASYPAISA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        console.log('Fetch completed');

        if (!response.ok) {
            console.error(
                'EasyPaisa API error:',
                response.status,
                response.statusText
            );
            return NextResponse.json(
                {
                    success: false,
                    message: `EasyPaisa API error: ${response.status} ${response.statusText}`,
                    statusCode: response.status,
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log('EasyPaisa API response:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('Payment successful');
            return NextResponse.json(
                {
                    success: true,
                    message: 'Operation successful',
                    data: {
                        txnNo: data.data.txnNo,
                        txnDateTime: data.data.txnDateTime,
                        orderId: payload.orderId,
                    },
                    statusCode: 200,
                },
                { status: 200 }
            );
        } else {
            console.error('Payment failed:', data.message);
            return NextResponse.json(
                {
                    success: false,
                    message: data.message || 'Operation failed',
                    statusCode: data.statusCode || 400,
                },
                { status: data.statusCode || 400 }
            );
        }
    } catch (error) {
        console.error('Error processing EasyPaisa payment:', error);

        if (error.name === 'AbortError') {
            console.log('Request aborted due to timeout');
            return NextResponse.json(
                {
                    success: false,
                    message: 'Request timed out',
                    statusCode: 504,
                },
                { status: 504 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                statusCode: 500,
            },
            { status: 500 }
        );
    }
}
