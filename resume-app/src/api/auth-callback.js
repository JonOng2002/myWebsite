import fetch from "node-fetch";

export default async function handler(req, res) {
  const code = req.query.code || null;
  if (!code) return res.status(400).json({ error: "No auth code provided" });

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REDIRECT_URI = "https://jonongca.com/callback"; // Same as registered in Spotify

  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
  const data = await response.json();

  if (data.access_token) {
    res.redirect(`/dashboard?access_token=${data.access_token}&refresh_token=${data.refresh_token}`);
  } else {
    res.json(data); // Show error if token exchange fails
  }
}