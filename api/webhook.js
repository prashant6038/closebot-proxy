export default async function handler(req, res) {
    // Manually set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://marketmd.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    console.log('Setting CORS Headers for Webhook:', {
        'Access-Control-Allow-Origin': 'https://marketmd.io',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });

    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request for webhook');
        return res.status(200).end();
    }

    console.log('Webhook Request Origin:', req.headers.origin);
    console.log('Webhook Request Method:', req.method);

    if (req.method === 'POST') {
        const data = req.body;
        
        console.log('Received from Framer:', data);

        return res.status(200).json({ success: true, message: 'Data received' });
    }

    console.log('Method not allowed for webhook:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
}
