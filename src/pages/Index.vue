<template>
  <Layout></Layout>
</template>

<script>
export default {
  name: 'Overview',
  metaInfo() {
    return {
      title: this.defaultHackathon.title,
      meta: [
        // OPEN GRAPH (e.g. Facebook)
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `https://climathon.hackerstolz.de/${this.defaultHackathon.urlName}`,
        },
        { property: 'og:site_name', content: this.defaultHackathon.title },
        { property: 'og:title', content: this.defaultHackathon.title },
        {
          property: 'og:description',
          content: this.getI18nNode(
            this.defaultHackathon.descriptions,
            this.$i18n.locale
          ).description,
        },
        {
          property: 'og:image',
          content: this.defaultHackathon.thumbnail,
        },

        // TWITTER
        { name: 'twitter:title', content: this.defaultHackathon.title },
        {
          name: 'twitter:description',
          content: this.getI18nNode(
            this.defaultHackathon.descriptions,
            this.$i18n.locale
          ).description,
        },
        {
          name: 'twitter:image',
          content: this.defaultHackathon.thumbnail,
        },
        { name: 'twitter:image:alt', content: this.defaultHackathon.title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: this.defaultHackathon.twitter },
      ],
    }
  },
  props: {
    isMobile: Boolean,
  },
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        (n) => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    },
  },
  computed: {
    defaultHackathon() {
      const defaultHackathons = this.$static.allHackathon.edges || [
        { node: {} },
      ]
      const [{ node: defaultHackathon }] = defaultHackathons

      return defaultHackathon || {}
    },
  },
  mounted() {
    // forward to default hackathon if no ID was provided
    if (this.defaultHackathon.urlName) {
      this.$router.replace(`/${this.defaultHackathon.urlName}`)
    }
  },
}
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>

//Query default Hackathon
<static-query>
query {
  allHackathon(filter: { default: { eq: true }, active: { eq: true } }) {
    edges {
      node {
        id
        urlName # URL Name 
        title # Title 
        default # Default 
        active # Active 
        from # From 
        to # To 
        canceled
        duration # Duration 
        eventPageActive # Event Page active 
        contactEmail # Contact EMail 
        twitter # Twitter Handle 
        hashtags{ # Hashtags 
          hashtag # Hashtag 
          isMain # isMain 
        } 
        linkTicketshop{ # Ticketshop Link 
          name # Name - further fields see Link 
        } 
        linkCommunity{ # Community Link 
          name # Name - further fields see Link 
        } 
        linkImprint{ # Imprint Link 
          name # Name - further fields see Link 
        } 
        thumbnail # Thumbnail 
        descriptions{ # Meta Descriptions 
          language # Language 
          description # Description 
        } 
        awards{ # Awards 
          name # Name - further fields see Award 
        } 
        faqs{ # FAQs 
          name # Name - further fields see FAQs 
        } 
      }
    }
  }
}
</static-query>
