<template>
  <div id="app">
    <nav :class="{ 'dark-mode': isDarkMode }">
      <h3 class="logo">Pdf Converter</h3>
      <ul>
        <li class="big-nav"><a href="https://segerlind.se/">Back to Portfolio</a></li>
        <li class="big-nav"><router-link to="/pdf-converter">PDF Converter Demo</router-link></li>
        <li class="big-nav">
          <a @click="toggleDarkMode" :class="darkModeClassName"
            :title="isDarkMode ? 'Turn off dark mode' : 'Turn on dark mode'"></a>
        </li>
        <li>
          <i @click="toggleMenu" class="fas fa-bars fa-dark mobile-menu"></i>
        </li>
      </ul>
    </nav>
    <div class="mobile-nav" :class="{
      'closed-menu': !isMenuOpen,
      'open-menu': isMenuOpen,
      'dark-mode': isDarkMode
    }">
      <span>
        <i @click="toggleMenu" class="fa-dark" style="font-style: normal">x</i>
      </span>
      <ul>
        <li><a @click="toggleMenu" href="https://segerlind.se/">Back to Portfolio</a></li>
        <li><router-link @click="toggleMenu" to="/pdf-converter">PDF Converter Demo</router-link></li>
        <li>
          <a @click="toggleDarkMode" :class="darkModeClassName"
            :title="isDarkMode ? 'Turn off dark mode' : 'Turn on dark mode'"></a>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <main>
      <router-view />
    </main>
  </div>
  <footer>
    <div class="container">
      <div class="footer">
        <h3>Copyright &#169; 2023. All rights are reserved</h3>
        <div class="footer-socials">
          <a aria-label="linkedin" target="_blank" rel="noreferrer"
            href="https://www.linkedin.com/in/elliot-segerlind-8085568b/"><i class="fab fa-linkedin"></i></a><a
            aria-label="github" target="_blank" href="https://github.com/elliot9802"><i class="fab fa-github"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false,
      darkModeClassName: '',  // You can assign the appropriate class here if necessary
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      // You can also set the value of 'darkModeClassName' here if necessary
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>