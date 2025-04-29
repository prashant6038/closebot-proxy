import cors from 'cors';

const corsOptions = {
    origin: ['https://marketmd.io', 'https://*.framer.app'], // Allow your Framer domain
    methods: ['POST', 'OPTIONS'], // Include OPTIONS for preflight requests
    allowedHeaders: ['Content-Type', 'Accept'],
};

export default async function handler(req, res) {
    // Apply CORS middleware
    await new Promise((resolve) => cors(corsOptions)(req, res, resolve));

    // Handle preflight OPTIONS requests explicitly
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log('Request Origin:', req.headers.origin); // Log the origin to verify

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Missing message' });
    }

    try {
        const closebotResponse = await fetch("https://api.closebot.ai/message", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.CLOSEBOT_API_KEY}`,
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
