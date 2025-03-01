<template>
  <div class="spotify-widget flex items-center justify-center p-4 bg-green-600 text-white rounded-2xl">
    <div v-if="song">
      <img :src="song.albumArt" alt="Album Cover" class="w-16 h-16 rounded-lg mr-4">
      <div>
        <p class="text-lg font-bold">{{ song.title }}</p>
        <p class="text-sm">{{ song.artist }}</p>
      </div>
    </div>
    <p v-else>Not playing anything...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song: null,
    };
  },
  methods: {
    async fetchLastPlayed() {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");
      if (!accessToken) return console.error("No access token found");

      try {
        const response = await fetch(`/api/last-played?access_token=${accessToken}`);
        const data = await response.json();
        if (data.song) {
          this.song = {
            title: data.song,
            artist: data.artist,
            albumArt: data.albumArt
          };
        } else {
          this.song = null;
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    }
  },
  mounted() {
    this.fetchLastPlayed();
  }
};
</script>