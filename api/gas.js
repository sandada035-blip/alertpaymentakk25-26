export default async function handler(req, res) {
  const GAS_URL = (process.env.GAS_URL || "").trim();

  if (!GAS_URL) {
    return res.status(500).json({ error: "Missing GAS_URL" });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Vercel API works",
      gasUrlStart: GAS_URL.slice(0, 60),
      gasUrlEnd: GAS_URL.slice(-10)
    });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(req.body || {})
    });

    const text = await response.text();

    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({
      error: "fetch failed",
      name: err.name,
      message: err.message,
      gasUrlStart: GAS_URL.slice(0, 80)
    });
  }
}
