import cors from 'cors';

const corsOptions = {
    origin: ['https://marketmd.io', 'https://*.framer.app'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Accept'],
};

export default async function handler(req, res) {
    await new Promise((resolve) => cors(corsOptions)(req, res, resolve));

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Missing message" });
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

        const data = await closebotResponse.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("CloseBot Proxy Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
