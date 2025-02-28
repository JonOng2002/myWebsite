<template>
    <div v-if="track">
      <h2>Now Playing:</h2>
      <p>{{ track.name }} by {{ track.artist }}</p>
      <img :src="track.image" alt="Album Art" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        track: null
      };
    },
    async created() {
      try {
        const tokenRes = await fetch('/api/spotify');
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
  
        if (!accessToken) {
          throw new Error('Access token is not available');
        }
  
        const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
  
        if (res.status === 204 || res.status > 400) {
          throw new Error('No content or error fetching currently playing track');
        }
  
        const data = await res.json();
        if (data && data.item) {
          this.track = {
            name: data.item.name,
            artist: data.item.artists.map(artist => artist.name).join(', '),
            image: data.item.album.images[0].url
          };
        }
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    }
  };
  </script>