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
          <a href="/info.html" class="nav-link">Jak to funguje</a>
          <a href="#prices" class="nav-link">Ceník</a>
          <a href="/info.html" class="nav-link">Užitečné informace</a>
        </nav>

        <!-- Mobile toggle -->
        <div class="menu-toggle" @click="toggleMenu">☰</div>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileMenu" class="nav-mobile">
        <a href="/jak-to-funguje.html" class="nav-link">Jak to funguje</a>
        <a href="#prices" class="nav-link">Ceník</a>
        <a href="/blog.html" class="nav-link">Blog</a>
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
          <a href="https://hostparking.cz" target="_blank" rel="noopener">
            <!-- ИМПОРТИРУЕМ КАРТИНКУ -->
            <img :src="footerLogo" alt="HostParking Logo" />
          </a>
        </div>

        <!-- Contacts -->
        <div class="footer-contacts">
          <p><strong>Telefon:</strong> <a href="tel:+420704827317">+420 704 827 317</a></p>
          <p><strong>Email:</strong> <a href="mailto:rezervace@hostparking.cz">rezervace@hostparking.cz</a></p>
          <p><strong>Adresa:</strong> Hostivice, 253 01 HostParking</p>
        </div>

        <!-- Links -->
        <div class="footer-links">
          <p><a href="/oou.html">Ochrana osobních údajů</a></p>
          <p><a href="/VOP.pdf" download>VOP</a></p>
        </div>
      </div>

      <div class="footer-copy">
        © 2024–2025 HostParking.cz – Všechna práva vyhrazena
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import footerLogo from '@/assets/IMG-20241214-WA0008.webp'

const mobileMenu = ref(false)
function toggleMenu() {
  mobileMenu.value = !mobileMenu.value
}
</script>
  
  <style>
  :root {
    --primary: #6a0dad;
    --accent: #ffcc00;
  }
  
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* HEADER */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 5px rgba(223, 223, 223, 0.1);
    z-index: 9999;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100vw;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .logo {
    font-size: 32px;
    font-weight: bold;
    margin: 0;
  }
  .logo-link {
    text-decoration: none;
  }
  .logo-primary {
    color: var(--primary);
  }
  .logo-accent {
    color: var(--accent);
  }
  
  /* NAV */
  .nav-desktop {
    display: flex;
    gap: 24px;
  }
  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  .nav-link:hover {
    color: var(--primary);
  }
  
  /* MOBILE */
  .menu-toggle {
    font-size: 28px;
    cursor: pointer;
    display: none;
  }
  .nav-mobile {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 24px;
  }
  
  /* MAIN */
  .main {
    flex-grow: 1;
    padding-top: 64px;
  }
  
  /* FOOTER */
  .site-footer {
    background: #111;
    color: #ddd;
    padding: 3rem 2rem;
    font-size: 0.95rem;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
    align-items: flex-start;
  }
  
  .footer-logo img {
    max-width: 180px;
  }
  
  .footer-contacts p,
  .footer-links p {
    margin: 0.4rem 0;
  }
  
  .footer-contacts a,
  .footer-links a {
    color: var(--accent);
    text-decoration: none;
  }
  
  .footer-contacts a:hover,
  .footer-links a:hover {
    text-decoration: underline;
  }
  
  .footer-copy {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: #aaa;
  }
  
  /* Адаптив */
  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }
    .menu-toggle {
      display: block;
    }
    .footer-container {
      flex-direction: column;
      text-align: center;
    }
    .footer-contacts, .footer-links {
      text-align: center;
    }
  }
  </style>
  