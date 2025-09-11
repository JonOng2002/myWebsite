<template>
  <div
    class="spotify-widget rounded-[2rem] overflow-hidden relative transition-all duration-300 hover:scale-105 hover:ring-2 group cursor-pointer"
    :class="[
      songType === 'currently-playing' ? 'hover:ring-green-500' : 'hover:ring-blue-500',
      loading ? 'bg-gray-200' : ''
    ]"
    @click="openSpotify"
  >
    <!-- Background Image - Artist Image -->
    <div v-if="song && song.artistImage" class="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
      <img 
        :src="song.artistImage" 
        alt="Artist Image" 
        class="w-full h-full object-cover opacity-90"
      />
      <!-- Overlay for better text readability -->
      <div 
        class="absolute inset-0 transition-all duration-300"
        :class="songType === 'currently-playing' ? 'bg-green-600 bg-opacity-20 group-hover:bg-opacity-30' : 'bg-blue-600 bg-opacity-70 group-hover:bg-opacity-80'"
      ></div>
    </div>
    
    <!-- Fallback to Album Art if no artist image -->
    <div v-else-if="song && song.albumArt" class="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
      <img 
        :src="song.albumArt" 
        alt="Album Art" 
        class="w-full h-full object-cover opacity-70"
      />
      <div 
        class="absolute inset-0 transition-all duration-300"
        :class="songType === 'currently-playing' ? 'bg-green-600 bg-opacity-70 group-hover:bg-opacity-80' : 'bg-blue-600 bg-opacity-70 group-hover:bg-opacity-80'"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 h-full w-full flex flex-col p-4">
      <!-- Show spinner while loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center h-full">
        <div class="spinner mb-2"></div>
        <p class="text-gray-700">Loading your current track...</p>
      </div>

      <!-- When data is loaded and there is a track -->
      <div v-else-if="song" class="flex flex-col h-full">
        <!-- Header -->
        <div class="mb-2">
          <h3 class="text-lg font-semibold text-white">
            {{ songType === 'currently-playing' ? 'Now Playing' : 'Last Played' }}
          </h3>
          <div class="w-12 h-1 bg-white rounded-full"></div>
        </div>
        
        <!-- Song Info -->
        <div class="flex items-center flex-grow">
          <img 
            :src="song.albumArt" 
            alt="Album Cover" 
            class="w-16 h-16 rounded-lg mr-4 shadow-lg"
          />
          <div class="text-white">
            <p class="font-bold text-lg line-clamp-2">{{ song.title }}</p>
            <p class="text-sm opacity-90">{{ song.artist }}</p>
            <div 
              class="mt-1 px-2 py-0.5 rounded text-xs inline-flex items-center"
              :class="songType === 'currently-playing' ? 'bg-green-500' : 'bg-blue-500'"
            >
              <span v-if="songType === 'currently-playing'" class="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              {{ songType === 'currently-playing' ? 'LIVE Now' : 'Last Played' }}
            </div>
          </div>
        </div>
        
        <!-- Hover Button Effect -->
        <div class="absolute inset-0 flex items-end justify-start p-6 z-20 pointer-events-none">
          <div 
            class="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto"
          >
            Open Spotify
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- When no song data is available -->
      <div v-else class="flex flex-col items-center justify-center h-full">
        <p class="text-gray-700">Not playing anything...</p>
      </div>
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
  methods: {
    async getSongData() {
      this.loading = true;
      try {
        const res = await fetch("http://localhost:3000/api/now-playing", {
          headers: { Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}` },
        });
        if (!res.ok) {
          // If no track is found or an error occurs, simply clear the songa
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
            artistImage: data.artistImage, // Add artistImage from API response
            spotifyUrl: data.spotifyUrl,   // Add spotifyUrl from API response
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
    openSpotify() {
      if (this.song && this.song.spotifyUrl) {
        window.open(this.song.spotifyUrl, '_blank');
      }
    }
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

/* Animate pulse for live indicator */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Line clamp for long titles */
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>