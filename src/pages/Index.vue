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
  allHackathon(filter: {default: {eq: true}}) {
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
    console.log(this.$static)
    console.log(this.$page)
    console.log(this.$props.hackathon)
  }
}
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
