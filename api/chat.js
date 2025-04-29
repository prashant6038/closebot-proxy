export default async function handler(req, res) {
    // Manually set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://marketmd.io');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    // Log headers to confirm they are set
    console.log('Setting CORS Headers:', {
        'Access-Control-Allow-Origin': 'https://marketmd.io',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
    });

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return res.status(200).end();
    }

    console.log('Request Origin:', req.headers.origin);
    console.log('Request Method:', req.method);

    if (req.method !== 'POST') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        console.log('Missing message in request body');
        return res.status(400).json({ message: 'Missing message' });
    }

    try {
        const closebotResponse = await fetch("https://api.closebot.ai/message", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer v3PXUAV7pAS5bl3_QI8h7Q`,
            },
            body: JSON.stringify({
                bot_id: "35831",
                message: message,
            }),
        });

        console.log("CloseBot API Status:", closebotResponse.status);
        const data = await closebotResponse.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("CloseBot Proxy Error:", error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
}
