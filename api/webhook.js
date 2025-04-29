import cors from 'cors';

const corsOptions = {
    origin: ['https://api.closebot.ai', 'https://marketmd.io', 'https://*.framer.app'],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
};

export default async function handler(req, res) {
    await new Promise((resolve) => cors(corsOptions)(req, res, resolve));

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log('Webhook Request Origin:', req.headers.origin);

    if (req.method === 'POST') {
        const data = req.body;
        
        console.log('Received from Framer:', data);

        return res.status(200).json({ success: true, message: 'Data received' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
