<template>
  <Layout>
    <EventHeader id="header" :isMobile="isMobile" themeColor="secondary" />
    <EventInfo
      id="info"
      v-if="$page && $page.hackathon"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
      themeColor="secondary"
    />
    <EventLocation id="location" :isMobile="isMobile" themeColor="primary" />
    <EventBag id="bag" :isMobile="isMobile" themeColor="secondary" />
    <Footer id="footer" themeColor="primary" />
  </Layout>
</template>

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

<page-query>
query ($id: ID!) {
  hackathon(id: $id) {
    id
    title # Title 
    twitter # Twitter Handle 
    thumbnail # Thumbnail 
    eventPageActive # Event Page active 
    descriptions { # Meta Descriptions 
      language # Language 
      description # Description 
    }
    hashtags { # Hashtags 
      hashtag # Hashtag 
    } 
  }
}
</page-query>

<script>
import Footer from "../components/sections/Footer.vue";
const sectionsContext = require.context(
  "../components/sections/event/",
  true,
  /.*\.vue$/
);

export default {
  name: "Event",
  metaInfo() {
    return {
      title: this.$page.hackathon.title,
      meta: [
        // OPEN GRAPH (e.g. Facebook)
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: `https://climathon.hackerstolz.de/${this.$page.hackathon.id}`
        },
        { property: "og:site_name", content: this.$page.hackathon.title },
        { property: "og:title", content: this.$page.hackathon.title },
        {
          property: "og:description",
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          property: "og:image",
          content: this.$page.hackathon.thumbnail
        },

        // TWITTER
        { name: "twitter:title", content: this.$page.hackathon.title },
        {
          name: "twitter:description",
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          name: "twitter:image",
          content: this.$page.hackathon.thumbnail
        },
        { name: "twitter:image:alt", content: this.$page.hackathon.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: this.$page.hackathon.twitter }
      ]
    };
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
    return {};
  },
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase();
      const [i18nNode] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split("-"[0])
      ) || [{}];

      return i18nNode;
    }
  },
  computed: {
    defaultHackathon() {
      const defaultHackathons = this.$static.allHackathon.edges || [
        { node: {} }
      ];
      const [{ node: defaultHackathon }] = defaultHackathons;

      return defaultHackathon || {};
    }
  },
  mounted() {
    // forward to default hackathon if no ID was provided
    if (!this.$route.params.id && this.defaultHackathon.id) {
      this.$router.push(`/event/${this.defaultHackathon.id}`);
    }

    // nav to main page if event site is not active, yet
    if (
      this.$page &&
      this.$page.hackathon &&
      this.$page.eventPageActive === false
    ) {
      this.$router.push(`/${this.defaultHackathon.id}`);
    }
  }
};
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
