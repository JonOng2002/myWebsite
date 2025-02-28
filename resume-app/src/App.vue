<template>
  <div :class="{
    'bg-slate-100 text-dark': !isDark,
    'bg-gray-950 text-white': isDark
  }" class="min-h-screen w-full flex flex-col items-center justify-center">
    <nav :class="{
      'bg-slate-100 text-gray-500': !isDark,
      'bg-gray-950 text-gray-300': isDark
    }" class="w-full px-8 md:px-8">
      <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <!-- Logo -->
        <div class="text-emerald-500">
          <p class="font-semibold sm:text-xl">Jonathan Ong</p>
        </div>
        <div class="text-gray-500 dark:text-gray-300 order-3 w-full md:w-auto md:order-2">
          <ul class="flex font-semibold justify-between">
            <li class="md:px-4 md:py-2 hover:text-emerald-500"><a href="#">Work</a></li>
            <li class="md:px-4 md:py-2 hover:text-emerald-500"><a href="/assets/resume.pdf"
                download="Jonathan_Ong_Resume.pdf"
                class="resume-link flex items-center gap-2 text-gray-500 hover:text-emerald-500 transition duration-200">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="flex flex-col items-start justify-start gap-8 py-16">
      <h1 class="text-sm font-bold sm:text-6xl text-start">
        Hi, this is Jonathan.
      </h1>
    </div>

    <!-- Bento Grid Section -->
    <div class="grid w-full h-[120vh] grid-cols-4 grid-rows-4 gap-4 px-64">
      <div class="col-span-2 row-span-1">
        <aboutMe />
      </div>
      <div class="col-span-1 row-span-1 rounded-[2rem] bg-emerald-400 hover:ring-2"></div>
      <div class="col-span-1 row-span-2 rounded-[2rem] bg-blue-400 hover:ring-2"></div>

      <div :class="{ 'bg-white border-2 border-gray-300': !isDark, 'bg-gray-300 border-2 border-gray-600': isDark }"
        class="col-span-1 row-span-1 rounded-[2rem] flex items-center justify-center transition duration-200 hover:scale-105 hover:ring-2">
        <Switch v-model="isDark"
          class="relative inline-flex h-[42px] w-[84px] shrink-0 cursor-pointer rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          :class="isDark ? 'bg-slate-600' : 'bg-amber-400'">
          <span class="sr-only">Toggle dark mode</span>
          <!-- Single Icon Container -->
          <span aria-hidden="true"
            :class="isDark ? 'translate-x-[46px] -translate-y-[-4px]' : 'translate-x-1 -translate-y-[-4px]'"
            class="pointer-events-none  h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out flex items-center justify-center">
            <!-- Only show one icon at a time with transition -->
            <transition name="icon-fade" mode="out-in">
              <svg v-if="!isDark" key="sun" class="w-5 h-5 text-amber-600" viewBox="0 0 100 10" fill="currentColor">
              </svg>
              <svg v-else key="moon" class="w-5 h-5 text-blue-800" viewBox="0 0 100 100" fill="currentColor">

              </svg>
            </transition>
          </span>
        </Switch>
      </div>
      <div
        class="col-span-1 row-span-1 rounded-[2rem] bg-linkedin-blue transition duration-200 hover:scale-105 h-full relative hover:ring-2">
        <a href="https://www.linkedin.com/in/jonathan-ong-66502a2b8/"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block">
          <img src="./assets/linkedin.png" alt="LinkedIn Logo" class="object-cover ">
        </a>
      </div>


      <div class="col-span-1 row-span-2 rounded-[2rem] bg-linkedin-blue hover:ring-2"></div>
      <Wander />
      <div class="col-span-1 row-span-1 rounded-[2rem] bg-orange-400 hover:ring-2"></div>
      <div class="col-span-2 row-span-1 rounded-[2rem] bg-orange-400 hover:ring-2"></div>
      <div class="col-span-2 row-span-1 rounded-[2rem] bg-orange-400 hover:ring-2"></div>
    </div>

    <!-- Extra Section to Ensure Scrolling -->
    <div class="py-20 text-center">
      <p class="text-lg font-medium dark:text-white">Scroll down for more...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Switch } from '@headlessui/vue'
import AboutMe from './components/aboutMe.vue'
import Wander from './components/wander.vue'

// State for dark mode
const isDark = ref(localStorage.getItem('theme') === 'dark')

// Toggling dark mode
const toggleDark = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// On page load, check for dark mode preference in localStorage
onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
</script>



<style>
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
