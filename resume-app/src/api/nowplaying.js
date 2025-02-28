export default async function handler(req, res) {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN; // Store in Vercel env vars
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 204 || response.status > 400) {
        return res.status(200).json({ isPlaying: false });
      }
  
      const song = await response.json();
  
      res.json({
        isPlaying: song.is_playing,
        title: song.item.name,
        artist: song.item.artists.map((artist) => artist.name).join(', '),
        album: song.item.album.name,
        albumImageUrl: song.item.album.images[0].url,
        songUrl: song.item.external_urls.spotify,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch currently playing track' });
    }
  }