// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { message, name, email } = req.body;

  try {
    const response = await fetch('https://api.closebot.ai/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer v3PXUAV7pAS5bl3_QI8h7Q' // <--- Replace with your Closebot API key
      },
      body: JSON.stringify({
        message: message,
        name: name,
        email: email
      }),
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
