<template>
  <div id="app">
    <router-view :isMobile="isMobile" />
  </div>
</template>

<script>
export default {
  name: 'App',
  // TODO: replace by query information
  metaInfo: {
    title: 'Climathon 2019 • Mannheim',
    meta: [
      // OPEN GRAPH (e.g. Facebook)
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://climathon.hackerstolz.de' },
      { property: 'og:site_name', content: 'Climathon 2019 • Mannheim' },
      { property: 'og:title', content: 'Climathon 2019 • Mannheim' },
      {
        property: 'og:description',
        content:
          '🌍☀️🌈 100+ Teilnehmer*innen • 10+ Klima-Challenges • Wir wollen nicht nur über Nachhaltigkeit sprechen, sondern handeln und sehen, was Technologie zur Bekämpfung des Klimawandels beitragen kann. Registriere dich jetzt!'
      },
      { property: 'og:image', content: require('../static/meta-thumb.jpg') },

      // TWITTER
      { name: 'twitter:title', content: 'Climathon 2019 • Mannheim' },
      {
        name: 'twitter:description',
        content:
          '🌍☀️🌈 100+ Teilnehmer*innen • 10+ Klima-Challenges • Wir wollen nicht nur über Nachhaltigkeit sprechen, sondern handeln und sehen, was Technologie zur Bekämpfung des Klimawandels beitragen kann. Registriere dich jetzt!'
      },
      {
        name: 'twitter:image',
        content: require('../static/meta-thumb.jpg')
      },
      { name: 'twitter:image:alt', content: 'Climathon 2019 • Mannheim' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@hackerstolz' }
    ]
  },
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
      this.isMobile = window.innerWidth <= 600
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
