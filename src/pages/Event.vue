<template>
  <Layout>
    <EventHeader id="header" :isMobile="isMobile" themeColor="secondary" />
    <EventInfo id="info" :isMobile="isMobile" themeColor="secondary" />
    <EventLocation id="location" :isMobile="isMobile" themeColor="primary" />
    <EventBag id="bag" :isMobile="isMobile" themeColor="secondary" />
    <Footer id="footer" themeColor="primary" />
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  hackathon(id: $id) {
    id
    title
    descriptions { language description }
    from
    to
    duration
  }
  allChallenge(filter: {hackathon: {eq:$id}}) {
    edges {
      node {
        id
      }
    }
  }
}
</page-query>

<static-query>
query {
  allHackathon(filter: {default: {eq: true}, active: {eq: true}}) {
    edges {
      node {
        id
        title
        descriptions { language description }
        from
        to
        duration
      }
    }
  }
}
</static-query>

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
      { property: 'og:image', content: require('../../static/meta-thumb.jpg') },

      // TWITTER
      { name: 'twitter:title', content: 'Climathon 2019 • Mannheim' },
      {
        name: 'twitter:description',
        content:
          '🌍☀️🌈 100+ Teilnehmer*innen • 10+ Klima-Challenges • Wir wollen nicht nur über Nachhaltigkeit sprechen, sondern handeln und sehen, was Technologie zur Bekämpfung des Klimawandels beitragen kann. Registriere dich jetzt!'
      },
      {
        name: 'twitter:image',
        content: require('../../static/meta-thumb.jpg')
      },
      { name: 'twitter:image:alt', content: 'Climathon 2019 • Mannheim' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@hackerstolz' }
    ]
  },
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
  },
  computed: {
    defaultHackathon() {
      const defaultHackathons = this.$static.allHackathon.edges || [
        { node: {} }
      ]
      const [{ node: defaultHackathon }] = defaultHackathons

      return defaultHackathon || {}
    }
  },
  mounted() {
    // forward to default hackathon if no ID was provided
    if (!this.$route.params.id && this.defaultHackathon.id) {
      this.$router.push(`/event/${this.defaultHackathon.id}`)
    }

    console.log(this.$route)
    console.log('$static', this.$static)
    console.log('$page', this.$page)
    console.log('$props', this.$props.hackathon)
  }
}
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
