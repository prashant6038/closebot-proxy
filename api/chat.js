export default async function handler(req, res) {
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
        Authorization: "Bearer v3PXUAV7pAS5bl3_QI8h7Q", // <<-- Insert your API key here
      },
      body: JSON.stringify({
        bot_id: "35831", // <<-- Insert your Bot ID here
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
