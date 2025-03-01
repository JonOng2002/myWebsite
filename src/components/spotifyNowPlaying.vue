<template>
  <div class="spotify-widget" style="min-height: 80px;">
    <!-- If still loading the first time, show a spinner or "Loading..." -->
    <div v-if="loading">
      <p>Loading your current track...</p>
    </div>

    <!-- If done loading but we have a track -->
    <div v-else-if="song">
      <img :src="song.albumArt" alt="Album Cover" width="64" height="64" />
      <div>
        <p><strong>{{ song.title }}</strong></p>
        <p>{{ song.artist }}</p>
        <p v-if="songType === 'currently-playing'">LIVE Now</p>
        <p v-else-if="songType === 'recently-played'">Last Played</p>
      </div>
    </div>

    <!-- If no track found -->
    <div v-else>
      <p>Not playing anything...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,     // for spinner
      song: null,
      songType: null,
    };
  },
  methods: {
    async getSongData() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) {
          // 404 => no track playing or recently played
          this.loading = false;
          return;
        }
        const data = await res.json();
        this.song = {
          title: data.song,
          artist: data.artist,
          albumArt: data.albumArt
        };
        this.songType = data.type; // 'currently-playing' or 'recently-played'
      } catch (err) {
        console.error("Error fetching now-playing data:", err);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    // 1) Fetch initial track
    this.getSongData();

    // 2) Poll every 30s
    setInterval(() => {
      this.getSongData();
    }, 30_000);
  }
};
</script>