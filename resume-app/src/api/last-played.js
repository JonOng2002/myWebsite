import fetch from "node-fetch";

export default async function handler(req, res) {
  const { access_token } = req.query;
  if (!access_token) return res.status(400).json({ error: "No access token" });

  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const data = await response.json();
  if (!data.items || data.items.length === 0) {
    return res.json({ error: "No recently played tracks found" });
  }

  res.json({
    song: data.items[0].track.name,
    artist: data.items[0].track.artists.map((a) => a.name).join(", "),
    albumArt: data.items[0].track.album.images[0].url,
  });
}