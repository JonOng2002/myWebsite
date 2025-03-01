// api/now-playing.js
export default async function handler(req, res) {
  console.log("📡 Fetching now-playing song...");

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error("❌ Missing Spotify credentials or refresh token.");
    return res.status(500).json({ error: "Server misconfiguration: Missing credentials." });
  }

  try {
    console.log("🔄 Requesting new access token using refresh token...");
    const refreshResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
    });
    const refreshData = await refreshResponse.json();
    const accessToken = refreshData.access_token;
    if (!accessToken) {
      console.error("❌ Failed to refresh token:", refreshData);
      return res.status(400).json({ error: "Unable to refresh token" });
    }
    console.log("✅ New Access Token obtained.");

    // Fetch currently playing track
    let nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let songType = "currently-playing";
    if (nowPlayingResponse.status === 204) {
      console.log("ℹ️ No track currently playing. Fetching recently played track instead.");
      nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      songType = "recently-played";
    } else {
      console.log("ℹ️ Currently playing track found.");
    }

    const nowPlayingData = await nowPlayingResponse.json();
    const track = nowPlayingData.item || (nowPlayingData.items ? nowPlayingData.items[0].track : null);

    if (!track) {
      console.log("❌ No track found in response.");
      return res.status(404).json({ error: "No track found." });
    }

    console.log("✅ Track data received:", {
      song: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      type: songType,
    });

    res.json({
      song: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      album: track.album.name,
      albumArt: track.album.images[0].url,
      spotifyUrl: track.external_urls.spotify,
      isPlaying: nowPlayingData.is_playing,
      type: songType, // Indicates whether the song is "currently-playing" or "recently-played"
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}