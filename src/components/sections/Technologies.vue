<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <p class="intro my-5" v-html="$t('intro')"></p>

      <v-row justify="center">
        <v-expansion-panels popout :value="challengeOpen">
          <v-expansion-panel
            :id="`tech-${technologie.id}`"
            class="technologie"
            v-for="({ node: technologie }, i) in $props.technologies"
            :key="i"
          >
            <v-expansion-panel-header
              class="technologie-head"
              color="rgba(255,255,255,0.1)"
              ripple
            >
              <v-layout column>
                <v-img
                  :src="technologie.image || technologie.provider.logo || require('../../../static/placeholder.svg')"
                  max-height="128px"
                  contain
                ></v-img>
                <p
                  v-if="!technologie.provider === ''"
                  :class="{
                    author: true,                    
                    'my-4': true
                  }"
                  v-html="getI18nNode(technologie.provider.names, $i18n.locale).name"
                ></p>
                <h4
                  class="mb-4"
                  v-html="getI18nNode(technologie.titles, $i18n.locale).title"
                ></h4>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="technologie-content"
              color="rgba(255,255,255,0.1)"
            >
              <v-layout column>                
                <v-img
                  v-if="!technologie.provider === ''"
                  :class="{
                    batch: true,
                    'my-5': true
                  }"
                  :src="technologie.provider.logo"
                  max-height="84px"
                  contain
                ></v-img>
                <div
                  class="markdown my-4"
                  v-html="
                    formatMarkdown(
                      getI18nNode(technologie.descriptions, $i18n.locale)
                        .description
                    )
                  "
                ></div>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import clone from 'lodash/clone'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import showdown from 'showdown'
import { getUrlHashQuery as getQuery } from '../../i18n'

const converter = new showdown.Converter()

export default {
  name: 'Technologies',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    technologies: Array
  },
  mounted() {
    this.routeUpdate(this.$route)
  },
  computed: {
    sectionColor() {
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
    routeUpdate($route) {
      const query = getQuery()
      const validTechnologie=
        query.technologie &&
        document.getElementById(`tech-${technologie.id}`)

      // scroll to and display challenge if defined
      if (validTechnologie) {
        this.$scrollTo(`#tech-${technologie.id}`)
        this.expandTech(query.technologie)
      }
    },
    expandTech(techID) {
      this.technologies.forEach((c, i) =>
        c.ID.toString() === techID.toString()
          ? ((c.expand = true), (this.challengeOpen = i))
          : (c.expand = false)
      )
    }
  },
  watch: {
    $route: function(value) {
      this.routeUpdate(value)
    }
  },
  data() {
    return {
      challengeOpen: null,
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Technoligies & Data",
    "intro": "Here you find a list of technologies and data sets which will be provide. Have fun!"    
  },
  "de": {
    "title": "Technoligien & Daten",
    "intro": "Hier findest du alle Technoligien und Daten aufgelistet, die bereitgestellt werden. Viel Spaß damit!"    
  }
}
</i18n>

<!-- global rules -->
<style lang="stylus">
.markdown {
  h5 {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    line-height: 2;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  p() {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  p {
    p();
  }

  ul {
    li {
      p();
      margin: 1rem 0;
      font-style: italic;
      list-style: none;

      &:after {
        content: '\00a0\00a0~';
      }

      &:before {
        content: '~\00a0\00a0';
      }
    }
  }
}
</style>

<!-- scoped rules -->
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

  .intro {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: #A8E5A3;
  }

  .technologie, .v-expansion-panel.technologie {
    background-color: transparent;

    h3 {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 24px;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.8);
    }

    h4 {
      font-family: Roboto Condensed, sans-serif;
      font-size: 26px;
      font-weight: 600;
      line-height: 1.4;
      letter-spacing: 1.5px;
      text-align: center;
      color: #ffffff;
    }

    p {
      font-family: Roboto Condensed, sans-serif;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);     
    }

    .batch {
      position: relative;
      :before {
        content: " ";
        width: calc(50% - 150px);
        height: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        top: 50%;
        left: 0px;
        position: absolute;
        display: block;
      }
      :after {
        content: " ";
        width: calc(50% - 150px);
        height: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        top: 50%;
        right: 0px;
        position: absolute;
        display: block;
      }      
    }
  }
}
</style>
