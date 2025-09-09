<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300"
    :class="{ 'opacity-0 pointer-events-none': !isVisible, 'opacity-100': isVisible }" @click.self="$emit('close')">
    <div
      class="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl mx-4 overflow-hidden transition-transform duration-300 transform"
      :class="{ 'scale-95 opacity-0': !isVisible, 'scale-100 opacity-100': isVisible }">
      <!-- Close button -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Slideshow -->
      <swiper :modules="[Autoplay, Pagination, Navigation]" :slides-per-view="1" :loop="true"
        :autoplay="{ delay: 15000, disableOnInteraction: false }" :pagination="{ clickable: true }" :navigation="true"
        class="w-full" style="height: 80vh; max-height: 80vh;">
        
        <!-- Animal Shelter Slide -->
        <swiper-slide class="p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <h2 class="text-3xl font-bold mb-4" :class="{ 'text-gray-800': !isDark, 'text-white': isDark }">The Right To
              Live Shelter</h2>
            <div class="flex flex-col md:flex-row gap-6 flex-grow h-[calc(100%-2rem)]">
              <!-- Left Image Column - Fixed Height -->
              <div class="w-full md:w-1/2 flex-shrink-0 h-[calc(100%-3rem)]">
                <swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
                  :autoplay="{ delay: 3000, disableOnInteraction: false }"
                  :pagination="{ clickable: true, dynamicBullets: true }"
                  class="w-full h-90 md:h-full rounded-xl shadow-lg overflow-hidden">
                  <swiper-slide v-for="(image, index) in activities[0].images" :key="`shelter-${index}`"
                    class="flex items-center justify-center h-full w-full bg-neutral-200">
                    <img :src="image" :alt="`${activities[0].title} - Image ${index + 1}`"
                      class="h-full w-full object-contain" />
                  </swiper-slide>
                </swiper>
              </div>
              
              <!-- Right Text Column - Scrollable -->
              <div class="w-full md:w-1/2 flex flex-col overflow-y-auto pr-2 h-64 md:h-full">
                <h3 class="text-xl font-semibold mb-2" :class="{ 'tewhite': !isDark, 'text-gray-200': isDark }">{{
                  activities[0].title }}</h3>
                <p class="mb-4" :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{
                  activities[0].description }}</p>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">My Role:
                  </h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[0].role }}</p>
                </div>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">Impact:</h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[0].impact }}</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>

        <!-- Laos Service Learning Slide -->
        <swiper-slide class="p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <h2 class="text-3xl font-bold mb-4" :class="{ 'text-gray-800': !isDark, 'text-white': isDark }">Service
              Learning in Laos</h2>
            <div class="flex flex-col md:flex-row gap-6 flex-grow h-[calc(100%-2rem)]">
              <!-- Left Image Column - Fixed Height -->
              <div class="w-full md:w-1/2 flex-shrink-0 h-[calc(100%-3rem)]">
                <swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
                  :autoplay="{ delay: 3000, disableOnInteraction: false }"
                  :pagination="{ clickable: true, dynamicBullets: true }"
                  class="w-full h-64 md:h-full rounded-xl shadow-lg overflow-hidden">
                  <swiper-slide v-for="(image, index) in activities[1].images" :key="`laos-${index}`"
                    class="flex items-center justify-center h-full w-full bg-neutral-200">
                    <img :src="image" :alt="`${activities[1].title} - Image ${index + 1}`"
                      class="h-full w-full object-contain" />
                  </swiper-slide>
                </swiper>
              </div>
              
              <!-- Right Text Column - Scrollable -->
              <div class="w-full md:w-1/2 flex flex-col overflow-y-auto pr-2 h-64 md:h-full">
                <h3 class="text-xl font-semibold mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">{{
                  activities[1].title }}</h3>
                <p class="mb-4" :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{
                  activities[1].description }}</p>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">My Role:
                  </h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[1].role }}</p>
                </div>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">Impact:</h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[1].impact }}</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>

        <!-- Thye Hua Kwan Slide -->
        <swiper-slide class="p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <h2 class="text-3xl font-bold mb-4" :class="{ 'text-gray-800': !isDark, 'text-white': isDark }">Thye Hua Kwan
              Community Hospital</h2>
            <div class="flex flex-col md:flex-row gap-6 flex-grow h-[calc(100%-2rem)]">
              <!-- Left Image Column - Fixed Height -->
              <div class="w-full md:w-1/2 flex-shrink-0 h-[calc(100%-3rem)]">
                <swiper :modules="[Autoplay, Pagination]" :slides-per-view="1" :loop="true"
                  :autoplay="{ delay: 3000, disableOnInteraction: false }"
                  :pagination="{ clickable: true, dynamicBullets: true }"
                  class="w-full h-64 md:h-full rounded-xl shadow-lg overflow-hidden">
                  <swiper-slide v-for="(image, index) in activities[2].images" :key="`thk-${index}`"
                    class="flex items-center justify-center h-full w-full bg-neutral-200">
                    <img :src="image" :alt="`${activities[2].title} - Image ${index + 1}`"
                      class="h-full w-full object-contain" />
                  </swiper-slide>
                </swiper>
              </div>
              
              <!-- Right Text Column - Scrollable -->
              <div class="w-full md:w-1/2 flex flex-col overflow-y-auto pr-2 h-64 md:h-full">
                <h3 class="text-xl font-semibold mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">{{
                  activities[2].title }}</h3>
                <p class="mb-4" :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{
                  activities[2].description }}</p>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">My Role:
                  </h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[2].role }}</p>
                </div>
                <div class="mt-4">
                  <h4 class="font-medium mb-2" :class="{ 'text-gray-700': !isDark, 'text-gray-200': isDark }">Impact:</h4>
                  <p :class="{ 'text-gray-600': !isDark, 'text-gray-300': isDark }">{{ activities[2].impact }}</p>
                </div>
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

// Volunteering activities data with detailed information and multiple images
const activities = [
  {
    title: "The Right To Live Dog Shelter",
    description: "Since January 2024, I've committed every Saturday to volunteering at The Right To Live, a shelter dedicated to rescuing and rehabilitating stray dogs in Singapore. This ongoing experience has deepened my understanding of animal welfare and the importance of community involvement in addressing the stray animal population.",
    role: "I provide comprehensive care for the shelter's residents, including walking dogs to ensure they get proper exercise, administering baths to maintain their hygiene, and engaging in socialization activities to improve their adoptability. Additionally, I assist with maintaining detailed records of each dog's health, behavior, and adoption status, ensuring proper care continuity.",
    impact: "My consistent volunteer work has helped alleviate the critical weekend manpower shortage at the shelter, directly improving the quality of life for 15-20 dogs weekly.",
    images: [
      new URL('../../assets/trtl1.jpg', import.meta.url).href,
      new URL('../../assets/trtl2.jpg', import.meta.url).href,
      new URL('../../assets/trtl3.jpg', import.meta.url).href
    ]
  },
  {
    title: "Team Ursa - Service Learning in Laos",
    description: "In December 2019, I participated in 'Team Ursa', an international service learning project in Luang Prabang, Laos. This transformative two-week initiative focused on addressing critical infrastructure needs in remote villages while fostering cross-cultural exchange and educational support for children with special needs.",
    role: "As a core team member, I helped construct a sustainable water tank system that now provides clean water to an entire village. I also played a key role in planning and executing a comprehensive day visit to the Luang Prabang School for the Deaf and Blind, where I led interactive educational activities, helped prepare and serve lunch, and facilitated English language lessons tailored to students with sensory disabilities.",
    impact: "Our water tank project has provided reliable access to clean water for over 30 students, significantly reducing waterborne illnesses. The outreach program at the School for the Deaf and Blind benefited approximately 40 students, providing them with educational materials, nutritious meals, and a cultural exchange that broadened perspectives for both the students and our team members.",
    images: [
      new URL('../../assets/laos1.jpg', import.meta.url).href,
      new URL('../../assets/laos2.jpg', import.meta.url).href,
      new URL('../../assets/laos3.jpg', import.meta.url).href
    ]
  },
  {
    title: "Team Ursa - Thye Hua Kwan Community Hospital",
    description: "Throughout 2019, during my time at Nanyang Junior College, I served as an active member of the International Service Learning Club, focusing our efforts on the elderly residents at Thye Hua Kwan Community Hospital. This half-year-long commitment allowed me to develop meaningful relationships with senior citizens.",
    role: "I coordinated and participated in weekly visits to the community hospital, where I played an important role in executing age-appropriate activities that promoted cognitive stimulation, physical mobility, and social engagement. These ranged from traditional games that preserved cultural heritage to gentle exercise sessions.",
    impact: "Our consistent presence and thoughtfully designed activities significantly improved the quality of life for over 30 senior citizens throughout 2019. Hospital staff reported noticeable improvements in residents' mood, social engagement, and overall well-being following our regular visits. For many residents with few family visitors, our program provided crucial social interaction and emotional support, improving mood of elderly patients in long-term care.",
    images: [
      new URL('../../assets/thk1.jpg', import.meta.url).href,
    ]
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
  background: #f97316;
}
</style>