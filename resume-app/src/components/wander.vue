<template>
    <div
      class="relative rounded-[2rem] flex col-span-2 justify-center transition duration-200 hover:scale-105 hover:ring-4 hover:ring-500 w-full h-full overflow-hidden"
    >
      <!-- Permanent Overlay with Button -->
      <Urlbutton/>
      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="true"  
        :autoplay="{ delay: 2000, disableOnInteraction: false }"
        class="w-full h-full rounded-[2rem]"
        @swiper="setSwiperInstance"
        @slideChange="handleSlideChange"
      >
        <!-- Slide 1: Video 1 -->
        <swiper-slide class="relative w-full h-full rounded-[2rem] overflow-hidden">
          <video class="absolute inset-0 w-full h-full object-cover rounded-[2rem]" autoplay muted loop playsinline>
            <source src="../assets/vid1.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </swiper-slide>
  
        <!-- Slide 2: Video 2 -->
        <swiper-slide class="relative w-full h-full rounded-[2rem] overflow-hidden">
          <video class="absolute inset-0 w-full h-full object-cover rounded-[2rem]" autoplay muted loop playsinline>
            <source src="../assets/vid2.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </swiper-slide>
  
        <!-- Slide 3: Video 3 -->
        <swiper-slide class="relative w-full h-full rounded-[2rem] overflow-hidden">
          <video class="absolute inset-0 w-full h-full object-cover rounded-[2rem]" autoplay muted loop playsinline>
            <source src="../assets/vid3.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </swiper-slide>
        
      </swiper>
    </div>
</template>
  
<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Urlbutton from "./urlbutton.vue";

// Swiper instance reference
const swiperRef = ref(null);

// Bind Swiper instance
const setSwiperInstance = (swiper) => {
  swiperRef.value = swiper;
};

// Handle slide change to restart the correct video
const handleSlideChange = () => {
  nextTick(() => {
    if (swiperRef.value) {
      // Pause all videos
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((video) => {
        video.pause();
        video.currentTime = 0; // Reset to start
      });

      // Play only the active slide's video
      const activeSlide = document.querySelector(".swiper-slide-active video");
      if (activeSlide) {
        activeSlide.play().catch(error => console.error("Autoplay prevented:", error));
      }
    }
  });
};

// Ensure the first video starts on page load
onMounted(() => {
  nextTick(() => {
    handleSlideChange();
  });
});
</script>