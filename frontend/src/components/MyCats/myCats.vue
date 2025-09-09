<template>
    <div 
      @click="$emit('click')" 
      :class="{ 'bg-orange-400': !isDark, 'bg-gray-700': isDark }"
      class="col-span-1 row-span-1 rounded-[2rem] relative overflow-hidden transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-orange-500 cursor-pointer group"
    >
      <!-- Cat Background Image -->
      <div class="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
        <img 
          src="../../assets/kids.jpg" 
          alt="My Cats" 
          class="w-full h-full object-cover to-20%"
        />
      </div>
      
      <!-- Overlay to make text readable -->
      <div class="absolute inset-0 bg-black bg-opacity-15 group-hover:bg-opacity-50 transition-all duration-300"></div>
      
      <!-- Content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center transform transition-transform duration-300 group-hover:translate-y-[-20px]">
        <h3 :class="{ 'text-white': true }" class="text-2xl font-bold mb-1">My Cats</h3>
        <div class="w-12 h-1 bg-white rounded-full mb-2"></div>
        <p :class="{ 'text-white': true }" class="text-sm text-center">Meet Timmy & Yuumi</p>
      </div>
      
      <!-- Hover Button Effect -->
      <div class="absolute inset-0 flex items-end justify-center p-6 z-20">
        <div 
          class="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View My Cats
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isDark: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['click']);
  </script>