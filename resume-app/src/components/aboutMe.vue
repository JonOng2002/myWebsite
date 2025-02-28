<template>
    <div
      class="rounded-[2rem] bg-blue-400 flex flex-col justify-center p-6 transition duration-200 hover:scale-105 hover:ring-4 hover:ring-500 w-full h-full"
      @mouseenter="goToSlide(1)" 
      @mouseleave="goToSlide(0)" 
    >
      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="false"  
        class="w-full h-full"
        @swiper="setSwiperInstance"
      >
        <!-- Slide 1: Profile Picture -->
        <swiper-slide class="flex flex-col items-center justify-center">
          <img
            src="../assets/myProfile.jpg"
            alt="Jonathan Ong"
            class="w-40 h-40 rounded-full object-cover shadow-lg"
          />
        </swiper-slide>
  
        <!-- Slide 2: About Me Text -->
        <swiper-slide class="flex flex-col justify-center items-start p-10">
          <h2 class="text-2xl font-bold mb-2">About Me</h2>
          <p class="text-sm">
            Enthusiastic SMU sophomore exploring the intersection of Information Systems (Product Development) and Computer Science (AI). 
            Eager to learn and apply innovative approaches in creating user-centric products enhanced by AI technologies.
          </p>
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Pagination } from "swiper/modules";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  
  // Define a reactive Swiper reference
  const swiperRef = ref(null);
  
  // Correct way to bind Swiper instance
  const setSwiperInstance = (swiper) => {
    swiperRef.value = swiper;
  };
  
  // Function to move slides on hover
  const goToSlide = (index) => {
    if (swiperRef.value) {
      swiperRef.value.slideTo(index);
    }
  };
  </script>