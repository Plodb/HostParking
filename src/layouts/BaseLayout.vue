<template>
  <div class="page">
    <!-- Header -->
    <header class="site-header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo">
          <RouterLink to="/" class="logo-link">
            <span class="logo-primary">HOST</span><span class="logo-accent">PARKING</span>
          </RouterLink>
        </div>

        <!-- Desktop nav -->
        <nav class="nav-desktop">
          <a href="/" class="nav-link active">Úvod</a>
          <a href="/info.html" class="nav-link">Jak to funguje</a>
          <a href="/#prices" class="nav-link">Ceník</a>
          <a href="/info.html" class="nav-link">Užitečné informace</a>
        </nav>

        <!-- Mobile toggle -->
        <div class="menu-toggle" @click="toggleMenu">☰</div>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileMenu" class="nav-mobile">
          <a href="/" class="nav-link active">Úvod</a>
          <a href="/info.html" class="nav-link">Jak to funguje</a>
          <a href="/#prices" class="nav-link">Ceník</a>
          <a href="/info.html" class="nav-link">Užitečné informace</a>
      </div>
    </header>

    <!-- Main -->
    <main class="main">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-container">
        <!-- Logo -->
        <div class="footer-logo">
          <a href="/" rel="noopener">
            <img src="/logoHphead.webp" alt="HostParking" />
          </a>
        </div>

        <!-- Contacts -->
        <div class="footer-contacts">
          <p>Telefon: <a href="tel:+420704827317">+420&nbsp;704&nbsp;827&nbsp;317</a></p>
          <p>E-mail: <a href="mailto:rezervace@hostparking.cz">rezervace@hostparking.cz</a></p>
          <p>Adresa: <a href="https://maps.app.goo.gl/Utjs1CB6jTfcMFRT9" target="_blank">Hostivice, 253 01 HostParking</a></p>
        </div>

        <!-- Links -->
        <div class="footer-links">
          <p><a href="/oou.html">Ochrana osobních údajů</a></p>
          <p><a href="/VOP.pdf" download>VOP</a></p>
        </div>
      </div>

      <div class="footer-copy">
        © 2024–{{ new Date().getFullYear() }} <a href="/">HostParking.cz</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

const mobileMenu = ref(false)
function toggleMenu() {
  mobileMenu.value = !mobileMenu.value
}
</script>

  