<script setup>
 
 // get full year 
 const year = new Date().getFullYear();
 const profileStore = useProfileStore();

 // Récupérer le profil si ce n'est pas déjà fait
 onMounted(async () => {
   if (!profileStore.getProfile) {
     await profileStore.fetchProfile();
   }
 });

</script>



<template>
  <!-- Footer -->
  <footer class="footer-area">
    <div class="container">
      <div class="footer-content text-center">
        <NuxtLink to="/" class="logo">
          <img src="~/assets/images/logo.png" alt="Logo" id="footer-logo">
        </NuxtLink>
        <ul class="footer-menu">
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/about">À propos</NuxtLink></li>
          <li><NuxtLink to="/works">Projets</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/service">Services</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
        <ClientOnly>
          <p class="copyright">
          © {{ year }} Tous droits réservés par <span>{{ profileStore.getProfile?.name || 'Aplix' }}</span>
        </p>
        </ClientOnly>
      </div>
    </div>
  </footer>
</template>

<style>
#footer-logo {
  width: 6rem;
  height: 6rem;
}
</style>
