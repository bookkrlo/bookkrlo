export async function POST(request) {
    try {
        const body = await request.json();

        // Format the request payload to match the API requirements
        const payload = {
            orderId: body.orderId || `D${Date.now()}`, // Generate orderId if not provided
            amount: body.amount.toString(),
            phone: body.phone,
            email: body.email,
            type: 'wallet',
        };

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

        const data = await response.json();

        // Match the exact response format from the API
        if (data.success) {
            return Response.json({
                success: true,
                message: 'Operation successful',
                data: {
                    txnNo: data.data.txnNo,
                    txnDateTime: data.data.txnDateTime,
                },
                statusCode: 200,
            });
        } else {
            return Response.json({
                success: false,
                message: data.message || 'Operation failed',
                statusCode: data.statusCode || 400,
            });
        }
    } catch (error) {
        console.error('Error processing EasyPaisa payment:', error);
        return Response.json({
            success: false,
            message: 'Internal server error',
            statusCode: 500,
        });
    }
}
