<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <v-card
        v-for="(award, i) in $props.hackathon.awards || []"
        :key="i"
        class="card pa-3 mb-4"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat
      >
        <h3 class="mb-1">
          {{ getI18nNode(award.titles, $i18n.locale).title }}
        </h3>
        <h4 class="mb-3">
          {{ getI18nNode(award.titles, $i18n.locale).subtitle }}
        </h4>
        <v-img :src="award.image" max-height="128px" contain></v-img>
        <div
          :style="{ color: $vuetify.theme.themes.dark.warning }"
          class="prize my-3"
        >
          {{ getI18nNode(award.prize, $i18n.locale).prize }}
        </div>
        <div>
          <p
            class="description"
            v-html="
              formatMarkdown(
                getI18nNode(award.descriptions || [], $i18n.locale)
                  .description || ''
              )
            "
          ></p>
        </div>
        <v-btn
          v-if="award.criteria && award.criteria.length > 0"
          class="mt-2 mr-2"
          width="auto"
          color="warning"
          outlined
          text
          small
          @click="showCriteriaDialog(award)"
          >{{ $t('button.showCriteria') }}</v-btn
        >
      </v-card>

      <!-- TODO: use challenge awards 
      <ClientOnly>
        <stack
          ref="stack"
          :column-min-width="320"
          :gutter-width="24"
          :gutter-height="24"
          monitor-images-loaded
        >
          <stack-item
            v-for="(award, i) in challengeAwards"
            :key="i"
            class="stack-grid-item"
          >
            <v-card
              class="card pa-3"
              width="100%"
              color="rgba(255,255,255,0.1)"
              flat
            >
              <h3 class="mb-1">
                {{ getI18nNode(award.titles, $i18n.locale).title }}
              </h3>
              <h4 class="mb-3">
                {{ getI18nNode(award.titles, $i18n.locale).subtitle }}
              </h4>
              <v-img
                :src="award.image"
                max-height="128px"
                height="128px"
                contain
                @load="reflow"
              ></v-img>
              <div
                :style="{ color: $vuetify.theme.themes.dark.error }"
                class="prize my-3"
              >
                {{ getI18nNode(award.prize, $i18n.locale).prize }}
              </div>
              <p
                class="description"
                v-html="
                  formatMarkdown(
                    getI18nNode(award.descriptions, $i18n.locale).description
                  )
                "
              ></p>
              <v-btn
                v-if="award.criteria.length > 0"
                class="mt-2 mr-2"
                width="auto"
                :color="$vuetify.theme.themes.dark.error"
                outlined
                text
                small
                @click="
                  ;(criteria = getI18nNode(award.criteria, $i18n.locale)
                    .criteria),
                    (criteriaShow = true)
                "
                >{{ $t('button.showCriteria') }}</v-btn
              >
              <v-btn
                v-if="
                  award.$challengeID !== null &&
                    award.$challengeID !== undefined
                "
                class="mt-2"
                width="auto"
                :color="award.color"
                outlined
                text
                small
                @click="() => $scrollTo(`#challenge-${award.$challengeID}`)"
                >{{ $t('button.showChallenge') }}</v-btn
              >
            </v-card>
          </stack-item>
        </stack>
      </ClientOnly> -->

      <div class="infoArea mt-5">
        <p
          class="awardInfo"
          v-html="$t('awardInfo', { mailto: $props.hackathon.contactEmail })"
        ></p>
      </div>

      <!-- criteria -->
      <v-dialog
        v-model="criteriaShow"
        scrollable
        width="80%"
        max-width="640px"
        :fullscreen="isMobile"
        @click="criteriaShow = true"
      >
        <v-card class="card" color="#2f3a58">
          <div class="dialog-card-content pa-4">
            <v-layout row>
              <div class="ml-3 mr-4">&nbsp;</div>
              <v-spacer />
              <h3 class="mb-3">{{ $t('juryCriteriaTitle') }}</h3>
              <v-spacer />
              <v-btn
                class="ma-0"
                color="accent"
                text
                @click="criteriaShow = false"
                icon
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
            <div class="markdown" v-html="formatMarkdown(criteria)"></div>
          </div>
          <v-card-actions class="dialog-card-footer">
            <v-spacer />
            <v-btn color="accent" text @click="criteriaShow = false">{{
              $t('button.close')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'
import showdown from 'showdown'
// import { Stack, StackItem } from "vue-stack-grid";

const converter = new showdown.Converter()

export default {
  name: 'Awards',
  // components: {
  //   Stack: () =>
  //     import('vue-stack-grid')
  //       .then((m) => m.Stack)
  //       .catch(),
  //   StackItem: () =>
  //     import('vue-stack-grid')
  //       .then((m) => m.StackItem)
  //       .catch(),
  // },
  props: {
    themeColor: {
      type: String,
      default: 'primary',
    },
    isMobile: Boolean,
    hackathon: Object,
    // challenges: Array,
  },
  computed: {
    sectionColor() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary
    },
    // challengeAwards() {
    //   return this.$props.challenges
    //     .filter(({ node }) => !!node.award)
    //     .map(({ node }) => ({ ...node.award, $challengeID: node.id }))
    // },
  },
  methods: {
    formatMarkdown(text) {
      try {
        return converter.makeHtml(text)
      } catch {
        return ''
      }
    },
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        (n) => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    },
    showCriteriaDialog(award) {
      this.criteria = this.getI18nNode(
        award.criteria,
        this.$i18n.locale
      ).criteria
      this.criteriaShow = true
    },
    // reflow: debounce(() => {
    //   this.$refs.stack.reflow()
    // }, 100),
  },
  data() {
    return {
      criteriaShow: false,
      criteria: '',
    }
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Awards",
    "juryCriteriaTitle":"Bewertungskriterien der Jury",
    "awardInfo": "The rules according to which the jury evaluates the teams are callable at the prizes which require an evaluation. The main jury is not responsible for the selection of the winners of a technology prize (if advertised), but a jury representative of the technology sponsor. All requirements for your project and your team are listed in the FAQ section. If you still have questions <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>contact us</a> simply.",
    "button": {
      "showFactSheet": "Show Fact-Sheet (DE)",
      "showChallenge": "Show Challenge",
      "showCriteria": "evaluation criteria",
      "close": "Close"
    }
  },
  "de": {
    "title": "Auszeichnungen",
    "juryCriteriaTitle":"Bewertungskriterien der Jury",
    "awardInfo": "Die Regeln, nach denen die Jury die Teams bewertet ist an den Preisen die eine Bewertung voraussetzen aufrufbar. Für die Auswahl der Sieger eines Technologie-Preises (sofern ausgeschrieben) ist nicht die Hauptjury, sondern ein Jury-Vertreter des Technologie-Sponsors zuständig. Alle Anforderungen an dein Projekt und dein Team sind im FAQ-Bereich untergebracht. Sofern du noch Fragen hast <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>kontaktiere uns</a> einfach.",
    "button": {
      "showFactSheet": "Fact-Sheet anzeigen (DE)",
      "showChallenge": "Challenge anzeigen",
      "showCriteria": "Bewertungskriterien",
      "close": "Schliessen"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section {
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

  .card {
    h3 {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      letter-spacing: 1px;
      color: rgba(255, 255, 255, 0.8);
    }

    h4 {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      font-size: 14px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
    }

    .prize {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
      color: inherit;
    }

    .description {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .infoArea {
    margin-bottom: 128px;

    .awardInfo {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.card {
  height: 100%;

  h3 {
    font-family: Gagalin, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.8);
  }

  .annotation-text {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.5px;
    text-align: inherit;
    color: #ffffff;
  }

  .long-description {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  .dialog-card-footer {
    button {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      letter-spacing: 1.5px;
    }
  }
}
</style>
