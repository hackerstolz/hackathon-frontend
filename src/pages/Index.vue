<template>
  <Layout>
    <Intro id="intro" :hackathon="$page ? $page.hackathon : defaultHackathon" />
    <About id="about" themeColor="primary" :isMobile="isMobile" />
    <Challenges id="challenges" themeColor="secondary" :isMobile="isMobile" />
    <Awards id="awards" themeColor="primary" :isMobile="isMobile" />
    <TeamOverview id="teams" themeColor="primary" :isMobile="isMobile" />
    <Location id="location" themeColor="secondary" />
    <Schedule id="schedule" themeColor="secondary" :isMobile="isMobile" />
    <Registration id="registration" themeColor="primary" :isMobile="isMobile" />
    <Staff id="staff" themeColor="secondary" :isMobile="isMobile" />
    <FAQ id="faq" themeColor="primary" />
    <Parties id="parties" themeColor="secondary" :isMobile="isMobile" />
    <Team id="team" themeColor="primary" :isMobile="isMobile" />
    <Footer id="footer" themeColor="primary" :isMobile="isMobile" />
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
const sectionsContext = require.context(
  '../components/sections/',
  false,
  /.*\.vue$/
)

export default {
  metaInfo: {
    title: 'Climathon'
  },
  name: 'Overview',
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
    )
  },
  props: {
    isMobile: Boolean
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
      this.$router.push(`/${this.defaultHackathon.id}`)
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
