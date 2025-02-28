<template>
    <header>
      <nav class="navbar">
        <div class="logo">
          <a href="/">MyLogo</a>
        </div>
        <ul :class="{ 'menu-open': menuOpen }" class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div class="menu-icon" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Navbar Styling */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
  }
  
  .navbar .logo a {
    color: white;
    font-size: 24px;
    text-decoration: none;
  }
  
  .navbar .nav-links {
    display: flex;
    list-style: none;
  }
  
  .navbar .nav-links li {
    margin: 0 15px;
  }
  
  .navbar .nav-links li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
  }
  
  .navbar .nav-links li a:hover {
    color: #f0a500;
  }
  
  /* Mobile Menu Icon */
  .menu-icon {
    display: none;
    cursor: pointer;
  }
  
  .menu-icon .bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px;
    transition: 0.3s;
  }
  
  /* Media Query for Mobile */
  @media screen and (max-width: 768px) {
    .navbar .nav-links {
      position: absolute;
      top: 60px;
      right: 0;
      background-color: #333;
      width: 100%;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      display: none;
    }
  
    .navbar .nav-links.menu-open {
      display: flex;
    }
  
    .menu-icon {
      display: block;
    }
  }
  </style>