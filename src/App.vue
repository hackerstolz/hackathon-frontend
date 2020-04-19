<template>
  <div id="app">
    <router-view :isMobile="isMobile" />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize() {
      this.$data.isMobile = window.innerWidth <= 600
    }
  },
  metaInfo() {
   return {
     title: this.$static.metadata.siteName,
     meta: [
       {
         key: 'description',
         name: 'description',
         content: this.$static.metadata.siteDescription
       }
     ]
   }
  }
}
</script>

<style lang="stylus">
@font-face {
  font-family: Gagalin;
  font-style: normal;
  font-font-weight: 400;
  text-rendering: optimizeLegibility;
  src: local('Gagalin-Regular'), url('./assets/fonts/Gagalin-Regular.woff2') format('woff2'), url('./assets/fonts/Gagalin-Regular.woff'), url('./assets/fonts/Gagalin-Regular.ttf'), url('./assets/fonts/Gagalin-Regular.otf');
}

html, body {
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
