<template>
    <div class="wrapper">
      <div class="carousel">
        <transition-group name="fade" tag="div">
          <div 
            v-for="(framework, index) in visibleFrameworks" 
            :key="framework.name" 
            class="carousel__item"
            :class="getPositionClass(index)"
          >  
              <img :src="framework.logo" class="framework-logo" />
          </div>
        </transition-group>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    transitionSpeed: {
      type: Number,
      default: 1000 // Default speed: 2 seconds
    },
    autoScrollInterval: {
      type: Number,
      default: 2500 // Auto scroll every 3 seconds
    }
  },
  data() {
    return {
        frameworks: [
        { name: "Vue.js", logo: new URL('../assets/vue.png', import.meta.url).href },  
        { name: "Flask", logo: new URL('../assets/flask.png', import.meta.url).href }, 
        { name: "JavaScript", logo: new URL('../assets/js.png', import.meta.url).href }, 
        { name: "Java", logo: new URL('../assets/java.png', import.meta.url).href },
        { name: "Tailwind", logo: new URL('../assets/tailwind.png', import.meta.url).href },
        { name: "Azure", logo: new URL('../assets/Azure.png', import.meta.url).href },
        { name: "Outsystems", logo: new URL('../assets/Outsystems.png', import.meta.url).href },
        { name: "Sql", logo: new URL('../assets/sql.png', import.meta.url).href }
      ],
      currentIndex: 0
    };
  },
  computed: {
    visibleFrameworks() {
      const start = this.currentIndex;
      return [
        this.frameworks[(start - 2 + this.frameworks.length) % this.frameworks.length], // Top 2
        this.frameworks[(start - 1 + this.frameworks.length) % this.frameworks.length], // Top 1
        this.frameworks[start % this.frameworks.length],  // Active
        this.frameworks[(start + 1) % this.frameworks.length], // Bottom 1
        this.frameworks[(start + 2) % this.frameworks.length]  // Bottom 2
      ];
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.frameworks.length;
    },
    startAutoScroll() {
      setInterval(() => {
        this.nextSlide();
      }, this.autoScrollInterval);
    },
    getPositionClass(index) {
      return [
        index === 0 ? "top2" : "",  // Top Most (Farthest)
        index === 1 ? "top" : "",   // Slightly Above Active
        index === 2 ? "active" : "", // The Focused One
        index === 3 ? "bottom" : "", // Below Active
        index === 4 ? "bottom2" : "", // Bottom Most
      ].join(" ");
    }
  },
  mounted() {
    this.startAutoScroll();
  }
};
</script>

<style scoped>
/* 🌟 Wrapper */
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 🌟 Carousel */
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: -50%; /* Moves it 50px up */
}

/* 🌟 Each Item */
.carousel__item {
  position: absolute;
  width: 100%;
  transform: translateX(-50%); /* Centers the items */
  display: flex;
  align-items: center; /* Center content */
  justify-content: center;
  text-align: center;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), 
  opacity 1.2s ease-in-out;
}

/* 🎯 Middle Item - Active */
/* 🎯 Active Item - Centered */
.carousel__item.active {
  transform: translateX(-50%) translateY(0) scale(1.3);
  opacity: 1;
  z-index: 5;
  
}

/* 🎯 Top and Bottom Items */
.carousel__item.top {
  transform: translateX(-50%) translateY(-130%) scale(0.8);
  opacity: 0.5;
  z-index: 4;
}
.carousel__item.bottom {
  transform: translateX(-50%) translateY(130%) scale(0.8);
  opacity: 0.5;
  z-index: 3;
}

/* 🎯 Further Away Items */
.carousel__item.top2 {
  transform: translateX(-50%) translateY(-220%) scale(0.5);
  opacity: 0.3;
  z-index: 4;
}
.carousel__item.bottom2 {
  transform: translateX(-50%) translateY(220%) scale(0.5);
  opacity: 0.3;
  z-index: 3;
}

/* 🎨 Card Styling */
.carousel__item-body {
display: flex;
  padding: 16px;
  text-align: center;
  width: 90%;
  align-items: center;

}

/* 🎨 Framework Logos */
.framework-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

/* 🌟 Vue Transition Group */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s, transform .5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: .1;
  transform: translateY(220%) scale(0.2);
  transition: opacity .4s; transform: .4s ease-in-out;
}
</style>