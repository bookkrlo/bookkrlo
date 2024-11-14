import { NextResponse } from 'next/server';

export async function POST(request) {
    console.log('EasyPaisa payment route called');
    try {
        const body = await request.json();
        console.log('Request body:', body);

        // Format the request payload to match the API requirements
        const payload = {
            amount: body.amount.toString(),
            phone: body.phone,
            email: body.email,
            type: 'wallet',
        };
        console.log('Formatted payload:', payload);

        console.log('Initiating fetch to EasyPaisa API');
        const response = await fetch(
            'https://api.sahulatpay.com/payment/initiate-ep/b93fb70c-6ac3-4c2d-b92f-a6869b6306bc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        );
        console.log('Fetch completed');

        if (!response.ok) {
            console.error(
                'EasyPaisa API error:',
                response.status,
                response.statusText
            );
            throw new Error(
                `EasyPaisa API error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        console.log('EasyPaisa API response:', data);

        // Match the exact response format from the API
        if (data.success) {
            return NextResponse.json({
                success: true,
                message: 'Operation successful',
                data: {
                    txnNo: data.data.txnNo,
                    txnDateTime: data.data.txnDateTime,
                },
                statusCode: 200,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: data.message || 'Operation failed',
                statusCode: data.statusCode || 400,
            });
        }
    } catch (error) {
        console.error('Error processing EasyPaisa payment:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
}
