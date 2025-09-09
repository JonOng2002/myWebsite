<template>
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
      :class="{'opacity-0 pointer-events-none': !isVisible, 'opacity-100': isVisible}"
      @click.self="$emit('close')"
    >
      <div 
        class="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl mx-4 overflow-hidden transition-transform duration-300 transform"
        :class="{'scale-95 opacity-0': !isVisible, 'scale-100 opacity-100': isVisible}"
      >
        <!-- Close button -->
        <button 
          @click="$emit('close')" 
          class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Slideshow -->
        <swiper
          :modules="[Autoplay, Pagination, Navigation]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :navigation="true"
          class="w-full"
          style="height: 80vh; max-height: 80vh;"
        >
          <!-- Timmy Slide -->
          <swiper-slide class="p-6">
            <div class="flex flex-col h-full">
              <h2 class="text-3xl font-bold mb-4" :class="{'text-gray-800': !isDark, 'text-white': isDark}">Meet Timmy</h2>
              <div class="flex flex-col md:flex-row gap-6 flex-grow">
                <div class="w-full md:w-1/2">
                  <img 
                    :src="cats[0].image" 
                    :alt="cats[0].name"
                    class="w-full h-4/5 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div class="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 class="text-xl font-semibold mb-2" :class="{'text-gray-700': !isDark, 'text-gray-200': isDark}">{{ cats[0].name }}</h3>
                  <p class="mb-4" :class="{'text-gray-600': !isDark, 'text-gray-300': isDark}">{{ cats[0].description }}</p>
                  <ul class="space-y-2" :class="{'text-gray-600': !isDark, 'text-gray-300': isDark}">
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[0].facts[0] }}
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[0].facts[1] }}
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[0].facts[2] }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </swiper-slide>
  
          <!-- Yuumi Slide -->
          <swiper-slide class="p-6">
            <div class="flex flex-col h-full">
              <h2 class="text-3xl font-bold mb-4" :class="{'text-gray-800': !isDark, 'text-white': isDark}">Meet Yuumi</h2>
              <div class="flex flex-col md:flex-row gap-6 flex-grow">
                <div class="w-full md:w-1/2">
                  <img 
                    :src="cats[1].image" 
                    :alt="cats[1].name"
                    class="w-full h-4/5 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div class="w-full md:w-1/2 flex flex-col justify-center paddgi">
                  <h3 class="text-xl font-semibold mb-2" :class="{'text-gray-700': !isDark, 'text-gray-200': isDark}">{{ cats[1].name }}</h3>
                  <p class="mb-4" :class="{'text-gray-600': !isDark, 'text-gray-300': isDark}">{{ cats[1].description }}</p>
                  <ul class="space-y-2" :class="{'text-gray-600': !isDark, 'text-gray-300': isDark}">
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[1].facts[0] }}
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[1].facts[1] }}
                    </li>
                    <li class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-amber-400 rounded-full"></span>
                      {{ cats[1].facts[2] }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Pagination, Navigation } from "swiper/modules";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    },
    isDark: {
      type: Boolean,
      default: false
    }
  });
  
  defineEmits(['close']);
  
  // Cat data with expanded information
  const cats = [
    { 
      name: "Timmy", 
      description: "Timmy is my playful 4-year-old tabby who loves afternoon naps and chasing laser pointers. He is incredibly social and is also the friendliest cat that visitors often said.",
      facts: [
        "American Curl",
        "Loves Zoomies",
        "Helps yuumi to sort her litter box after her duties, how friendly!"
      ],
      image: new URL('../../assets/timmy1.jpg', import.meta.url).href 
    },
    { 
      name: "Yuumi", 
      description: "Yuumi is my elegant tripod cat. Despite her reserved nature, she's incredibly affectionate with those she trusts.",
      facts: [
        "She has only 3 legs!",
        "She fell from great heights and was rescued by my partner and I.",
        "Her meow is more like a squeak!"
      ],
      image: new URL('../../assets/yuumi1.jpg', import.meta.url).href 
    }
  ];
  </script>
  
  <style scoped>
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: white;
    background: rgba(0, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  :deep(.swiper-button-next:after),
  :deep(.swiper-button-prev:after) {
    font-size: 18px;
    font-weight: bold;
  }
  
  :deep(.swiper-pagination-bullet) {
    background: #f59e0b;
  }
  </style>