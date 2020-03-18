<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <p
        class="intro-text my-5"
        v-html="$t('intro', { mailto: $props.hackathon.contactEmail })"
      ></p>
      <v-layout class="my-4" row wrap align-start justify-center>
        <v-flex
          v-for="(member, i) in $props.organizers"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="avatar mx-4 my-2"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="member.image || require('../../../static/placeholder.svg')"
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            cover
          ></v-img>
          <p class="member-name my-1">{{ member.name }}</p>
          <p class="member-organisation my-1">
            {{
              getI18nNode(getOrganizerRole(member).professions, $i18n.locale)
                .profession
            }}
          </p>
          <p class="member-description my-1">
            {{
              getI18nNode(getOrganizerRole(member).descriptions, $i18n.locale)
                .description
            }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Organizer',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    hackathon: Object,
    organizers: Array
  },
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    },
    getOrganizerRole(speaker) {
      const { roles = [] } = speaker || {}
      const [firstOrganizerRole = {}] =
        roles.filter(({ role }) => role.title === 'Organizer') || {}

      return firstOrganizerRole
    }
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Orga Team",
    "intro": "Such a hackathon really needs a lot of helpers, you can identify yourself with our vision and want to support the climathon? Awesome, we can still use a lot of support. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> right now!"
  },
  "de": {
    "title": "Orga-Team",
    "intro": "Ein solcher Hackathon braucht wirklich viele Helfer, du kannst dich mit unserer Vision identifizieren und willst den Climathon unterstützen? Fantastisch, wir können immer noch eine Menge Unterstützung gebrauchen. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> jetzt!"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section {
  padding-bottom: 128px;

  h2 {
    font-family: Gagalin, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 28px;
    letter-spacing: 1.4px;
    text-align: center;
    color: #ffffff;
    margin-top: 128px;
    margin-bottom: 64px;
  }

  .intro-text {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  .stack-grid-item {
    transition: all 300ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      border-radius: 8px;
    }

    .member-name {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 1px;
      text-align: inherit;
      color: #ffffff;
    }

    .member-organisation {
      font-family: click-clack, sans-serif;
      font-weight: 500;
      font-size: 20px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;
      color: rgba(255, 255, 255, 0.8);
    }

    .member-description {
      font-family: click-clack, sans-serif;
      font-weight: 300;
      font-size: 20px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
