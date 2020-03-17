<template>
  <Layout>
    <Intro
      v-if="$page && $page.hackathon"
      id="intro"
      :hackathon="$page.hackathon"
    />
    <About id="about" themeColor="primary" :isMobile="isMobile" />
    <Challenges
      v-if="$page && $page.allChallenge"
      id="challenges"
      themeColor="secondary"
      :isMobile="isMobile"
      :challenges="$page.allChallenge.edges"
    />
    <Awards
      v-if="$page && $page.hackathon && $page.hackathon.awards.length > 0"
      id="awards"
      themeColor="primary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
    />
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
    id # ID 
		urlName # URL Name 
		title # Title 
		default # Default 
		active # Active 
		from # From 
		to # To 
		duration # Duration 
		eventPageActive # Event Page active 
		contactEmail # Contact EMail 
		twitter # Twitter Handle 
		hashtag # Hashtag 
		linkTicketshop { # Ticketshop Link 
			id # ID - further fields see Link 
		} 
		linkCommunity { # Community Link 
			id # ID - further fields see Link 
		} 
		linkImprint { # Imprint Link 
			id # ID - further fields see Link 
		} 
		thumbnail # Thumbnail 
		descriptions { # Meta Descriptions 
			language # Language 
			description # Description 
		} 
		awards { # Awards 
			id # ID 
			name # Name 
			image # Image 
			titles { # Titles 
				language # Language 
				title # Title 
				subtitle # Subtitle 
			} 
			prize { # Prize 
				language # Language 
				prize # Prize 
			} 
			descriptions { # Descriptions 
				language # Language 
				description # Description 
			} 
			criteria { # Criteria 
				language # Language 
				criteria # Criteria 
			}
		} 
		faqs{ # FAQs 
			id # ID - further fields see FAQs 
		} 
  }
  allChallenge(filter: { hackathon: { eq: $id } }) {
    edges {
      node {
        id # ID 
        name # Name 
        titles { # Titles 
          language # Language 
          title # Title 
        } 
        hackathon { # Hackathon 
          id # ID - further fields see Hackathon 
        } 
        image # Image 
        descriptions { # Descriptions 
          language # Language 
          description # Description 
        } 
        type { # Type 
          id # ID - further fields see Challenge Type  
          title # Title 
        }
        author { # Author 
          language # Language 
          author # author 
        } 
        category { # Category 
          id # ID 
          name # Name 
        }
        award # FIXME: check how to get this work
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
  name: 'Overview',
  metaInfo() {
    return {
      title: this.$page.hackathon.title,
      meta: [
        // OPEN GRAPH (e.g. Facebook)
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `https://climathon.hackerstolz.de/${this.$page.hackathon.id}`
        },
        { property: 'og:site_name', content: this.$page.hackathon.title },
        { property: 'og:title', content: this.$page.hackathon.title },
        {
          property: 'og:description',
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          property: 'og:image',
          content: this.$page.hackathon.thumbnail
        },

        // TWITTER
        { name: 'twitter:title', content: this.$page.hackathon.title },
        {
          name: 'twitter:description',
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          name: 'twitter:image',
          content: this.$page.hackathon.thumbnail
        },
        { name: 'twitter:image:alt', content: this.$page.hackathon.title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: this.$page.hackathon.twitter }
      ]
    }
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
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    }
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
  }
}
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
