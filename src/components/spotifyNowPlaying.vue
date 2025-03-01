<template>
  <div
    class="spotify-widget flex flex-col items-center justify-center p-4 rounded-2xl transition-all"
    :class="widgetClass"
  >
    <!-- Show spinner while loading -->
    <div v-if="loading" class="flex flex-col items-center">
      <div class="spinner mb-2 bg-black"></div>
      <p class="text-black">Loading your current track...</p>
    </div>

    <!-- When data is loaded and there is a track -->
    <div v-else-if="song" class="flex items-center">
      <img :src="song.albumArt" alt="Album Cover" class="w-16 h-16 rounded-lg mr-4" />
      <div>
        <p class="text-lg font-bold">{{ song.title }}</p>
        <p class="text-sm">{{ song.artist }}</p>
        <p class="text-xs" v-if="songType === 'currently-playing'">LIVE Now</p>
        <p class="text-xs" v-else-if="songType === 'recently-played'">Last Played</p>
      </div>
    </div>

    <!-- When no song data is available -->
    <div v-else>
      <p>Not playing anything...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      song: null,
      songType: null,
    };
  },
  computed: {
    widgetClass() {
      // Change widget styling based on track type
      if (this.songType === "currently-playing") {
        return "bg-green-600 text-white";
      } else if (this.songType === "recently-played") {
        return "bg-blue-600 text-white";
      }
      return "bg-gray-200 text-dark";
    },
  },
  methods: {
    async getSongData() {
      this.loading = true;
      try {
        const res = await fetch("/api/now-playing", {
          headers: { Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}` },
        });
        if (!res.ok) {
          // If no track is found or an error occurs, simply clear the song
          this.song = null;
          this.songType = null;
          return;
        }
        const data = await res.json();
        if (data.song) {
          this.song = {
            title: data.song,
            artist: data.artist,
            albumArt: data.albumArt,
          };
          // data.type should be set by your backend as 'currently-playing' or 'recently-played'
          this.songType = data.type || "recently-played";
        } else {
          this.song = null;
          this.songType = null;
        }
      } catch (err) {
        console.error("Error fetching now-playing data:", err);
      } finally {
        this.loading = false;
      }
    },
    async refreshAccessToken() {
      console.log("🔄 Refreshing access token...");
      try {
        const response = await fetch("/api/refresh-token");
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);
          console.log("✅ Token refreshed successfully:", data.access_token);
        } else {
          console.error("❌ Failed to refresh token:", data);
        }
      } catch (error) {
        console.error("❌ Error refreshing token:", error);
      }
    },
  },
  mounted() {
    // Fetch initial data
    this.getSongData();

    // Auto-refresh token every 55 minutes
    setInterval(() => {
      this.refreshAccessToken();
    }, 55 * 60 * 1000);

    // Poll now-playing data every 30 seconds
    setInterval(() => {
      this.getSongData();
    }, 30000);
  },
};
</script>

<style scoped>
/* Spinner style */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>