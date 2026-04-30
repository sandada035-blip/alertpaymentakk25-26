export default async function handler(req, res) {
  const GAS_URL = (process.env.GAS_URL || "").trim();

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "Vercel API works",
      gasUrlSet: !!GAS_URL
    });
  }

  if (!GAS_URL) {
    return res.status(500).json({ error: "Missing GAS_URL" });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body || {})
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({
      error: "fetch failed",
      message: err.message
    });
  }
}
