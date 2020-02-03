<template>
  <Layout>
    <EventHeader id="header" :isMobile="isMobile" themeColor="secondary" />
    <EventInfo id="info" :isMobile="isMobile" themeColor="secondary" />
    <EventLocation id="location" :isMobile="isMobile" themeColor="primary" />
    <EventBag id="bag" :isMobile="isMobile" themeColor="secondary" />
    <Footer id="footer" themeColor="primary" />
  </Layout>
</template>

<script>
import Footer from '../components/sections/Footer.vue'
const sectionsContext = require.context(
  '../components/sections/event/',
  true,
  /.*\.vue$/
)

export default {
  metaInfo: {
    title: 'Event Infos'
  },
  name: 'Event',
  components: {
    ...sectionsContext.keys().reduce(
      (map, key) => ({
        ...map,
        [sectionsContext(key).default.name]: sectionsContext(key).default
      }),
      {}
    ),
    Footer
  },
  props: {
    isMobile: Boolean
  },
  data() {
    return {}
  }
}
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
