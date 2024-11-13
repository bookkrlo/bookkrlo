export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received JazzCash payment request:', body);

        console.log('Sending request to JazzCash API');
        const response = await fetch(
            'https://api.sahulatpay.com/payment/initiate-jz/b93fb70c-6ac3-4c2d-b92f-a6869b6306bc',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: body.amount,
                    type: body.type,
                    phone: body.phone,
                    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
                }),
            }
        );

        const data = await response.json();
        console.log('Received response from JazzCash API:', data);

        if (data.success) {
            console.log('JazzCash payment initiated successfully');
            return Response.json({
                success: true,
                message: 'Payment initiated successfully',
            });
        } else {
            console.error('JazzCash payment initiation failed:', data.message);
            return Response.json({
                success: false,
                message: data.message || 'Failed to initiate payment',
            });
        }
    } catch (error) {
        console.error('Error in JazzCash payment processing:', error);
        return Response.json(
            {
                success: false,
                message: 'Internal server error',
            },
            { status: 500 }
        );
    }
}
