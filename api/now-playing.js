// /api/now-playing.js
export default async function handler(req, res) {
  try {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      console.error("❌ Missing Spotify credentials in ENV.");
      return res.status(500).json({ error: "Server misconfiguration: Missing credentials." });
    }

    // 1) Exchange refresh token for a new access token
    const refreshResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });
    const refreshData = await refreshResponse.json();
    if (!refreshData.access_token) {
      console.error("❌ Failed to refresh token:", refreshData);
      return res.status(400).json({ error: "Unable to refresh token" });
    }
    const accessToken = refreshData.access_token;

    // 2) Fetch *currently playing* track
    let nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // If 204 => no track currently playing, fallback to 'recently played'
    if (nowPlayingResponse.status === 204) {
      nowPlayingResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const recentData = await nowPlayingResponse.json();

      if (!recentData.items || !recentData.items.length) {
        return res.status(404).json({ error: "No recently played songs found." });
      }
      const recentTrack = recentData.items[0].track;
      return res.json({
        song: recentTrack.name,
        artist: recentTrack.artists.map(a => a.name).join(", "),
        albumArt: recentTrack.album.images?.[0]?.url ?? null,
        type: "recently-played",
      });
    }

    // Otherwise parse the currently-playing data
    const nowPlayingData = await nowPlayingResponse.json();
    if (!nowPlayingData || !nowPlayingData.item) {
      return res.status(404).json({ error: "No track found." });
    }

    const track = nowPlayingData.item;
    return res.json({
      song: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      albumArt: track.album.images?.[0]?.url ?? null,
      type: "currently-playing",
    });
  } catch (error) {
    console.error("❌ Unexpected error in now-playing:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}