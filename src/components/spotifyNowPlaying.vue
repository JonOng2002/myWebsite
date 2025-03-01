<template>
  <div
    class="spotify-widget flex flex-col items-center justify-center p-4 rounded-2xl transition-all"
    :class="widgetClass"
  >
    <!-- While loading data, show a loading spinner/placeholder -->
    <div v-if="loading" class="flex items-center">
      <p class="text-lg">Loading…</p>
    </div>

    <!-- Show song details if available and not loading -->
    <div v-else-if="song" class="flex items-center">
      <img :src="song.albumArt" alt="Album Cover" class="w-16 h-16 rounded-lg mr-4" />
      <div>
        <p class="text-lg font-bold">{{ song.title }}</p>
        <p class="text-sm">{{ song.artist }}</p>
        <p class="text-xs" v-if="songType === 'currently-playing'">Live Now</p>
        <p class="text-xs" v-else-if="songType === 'recently-played'">Last Played</p>
      </div>
    </div>

    <!-- If no song is available and not loading -->
    <p v-else>Not playing anything...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: null,
      song: null,
      songType: null,
      loading: false,
    };
  },
  computed: {
    widgetClass() {
      // Change the widget color based on whether the track is live or last played
      if (this.songType === "currently-playing") {
        return "bg-green-600 text-white";
      } else if (this.songType === "recently-played") {
        return "bg-blue-600 text-white";
      }
      return "bg-gray-200 text-dark";
    },
  },
  methods: {
    async fetchNowPlaying() {
      console.log("📡 Fetching now-playing song from backend...");
      if (!this.accessToken) {
        console.error("❌ No access token available.");
        return;
      }

      // Set loading true and capture the start time for buffering
      this.loading = true;
      const startTime = Date.now();

      try {
        const response = await fetch("/api/now-playing", {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        if (!response.ok) {
          console.error("❌ API Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        console.log("✅ Received data:", data);
        if (data.song) {
          this.song = {
            title: data.song,
            artist: data.artist,
            albumArt: data.albumArt,
          };
          this.songType = data.type;
        } else {
          this.song = null;
          this.songType = null;
        }
      } catch (error) {
        console.error("❌ Error fetching Spotify data:", error);
      } finally {
        // Calculate elapsed time and ensure at least 500ms delay
        const elapsed = Date.now() - startTime;
        if (elapsed < 500) {
          await new Promise((resolve) => setTimeout(resolve, 500 - elapsed));
        }
        this.loading = false;
      }
    },
    async refreshAccessToken() {
      console.log("🔄 Refreshing access token...");
      try {
        const response = await fetch("/api/refresh-token");
        const data = await response.json();
        if (data.access_token) {
          this.accessToken = data.access_token;
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
    console.log("🔄 Checking stored access token...");
    // Try to load the access token from localStorage
    this.accessToken = localStorage.getItem("spotify_access_token");

    if (this.accessToken) {
      this.fetchNowPlaying();
    } else {
      console.warn("⚠️ No access token found. Make sure you have logged in and set a token.");
    }

    // Auto-refresh token every 55 minutes (if needed)
    setInterval(() => {
      this.refreshAccessToken();
    }, 55 * 60 * 1000);

    // Fetch now-playing song every 30 seconds
    setInterval(() => {
      this.fetchNowPlaying();
    }, 30 * 1000);
  },
};
</script>

<style scoped>
/* Example spinner style (optional) */
/* You can customize the spinner below or replace it with an image/component */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>