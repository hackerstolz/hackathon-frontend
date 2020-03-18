<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <v-card
        v-for="(faq, i) in $props.faqs"
        :key="i"
        class="faq-card pa-3 mb-4"
        color="rgba(255,255,255,0.1)"
        ripple
        flat
        @click="openID === faq.id ? (openID = null) : (openID = faq.id)"
      >
        <h3 class="faq-title my-1 mx-3">
          {{ getI18nNode(faq.question, $i18n.locale).question }}
        </h3>
        <v-expand-transition>
          <p
            v-if="faq.id === openID"
            class="faq-text my-1 mx-3 mt-4"
            v-html="
              formatMarkdown(getI18nNode(faq.answer, $i18n.locale).answer)
            "
          ></p>
        </v-expand-transition>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import showdown from 'showdown'

const converter = new showdown.Converter()

export default {
  name: 'FAQ',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    faqs: Array
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary
    }
  },
  methods: {
    formatMarkdown(text) {
      return converter.makeHtml(text)
    },
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    },
    toogleTile(i) {
      const clickedFaq = this.faqs[i]
      const prevShow = this.faqs[i].show

      this.faqs.forEach(c => (c.show = false))
      clickedFaq.show = !prevShow
    }
  },
  data() {
    return {
      openID: null
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "FAQ"
  },
  "de": {
    "title": "FAQ"
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

  .faq-card {
    cursor: pointer;

    .faq-title {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: rgba(255, 255, 255, 0.8);
    }

    .faq-text {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: left;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
