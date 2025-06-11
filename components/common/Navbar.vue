<script setup> 
import { inject, provide, ref } from "vue";  

// slidebar open
const menuOpen = ref(false);
provide('menuOpen', menuOpen)

const setMenuOpen = (value = true) => { 
	menuOpen.value = value;
};
</script>


<template>
  <!-- Header --> 
  <header class="header-area">
    <div class="container">
      <div class="gx-row d-flex align-items-center justify-content-between">
        <NuxtLink to="/" class="logo"> 
          <img src="~/assets/images/logo.png" alt="Logo" id="navbar-logo">
        </NuxtLink>

        <nav class="navbar" :class="menuOpen ? 'active' : ''">
          <ul class="menu">
            <li><NuxtLink to="/" @click="setMenuOpen(false)">Accueil</NuxtLink></li>
            <li><NuxtLink to="/about" @click="setMenuOpen(false)">À propos</NuxtLink></li>
            <li><NuxtLink to="/works" @click="setMenuOpen(false)">Projets</NuxtLink></li>
            <li><NuxtLink to="/blog" @click="setMenuOpen(false)">Blog</NuxtLink></li>
            <li><NuxtLink to="/service" @click="setMenuOpen(false)">Services</NuxtLink></li>
            <li><NuxtLink to="/contact" @click="setMenuOpen(false)">Contact</NuxtLink></li>
          </ul>
          <NuxtLink to="/contact" class="theme-btn">Discutons</NuxtLink>
        </nav>      

        <NuxtLink to="/contact" class="theme-btn">Discutons</NuxtLink>

        <div :class="`show-menu ${menuOpen ? 'active' : ''}`" @click="setMenuOpen(!menuOpen)">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </header> 

</template>


<style>
  #navbar-logo {
    width: 6rem;
    height: 6rem;
  }
</style>