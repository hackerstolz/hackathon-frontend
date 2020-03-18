<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>
        {{ $t('language') }}
        <v-icon class="ml-3" :x-large="!isMobile">g_translate</v-icon>
      </h2>
      <p class="introText mb-5">{{ $t('introText') }}</p>
      <h3>{{ $t('title') }}</h3>

      <v-card
        v-for="({ node: day }, i) in timetable"
        :key="i"
        class="card pa-3 mb-5"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat
      >
        <h3 class="mt-2 mb-3">
          {{ $d(new Date(parseInt(day.date, 10) * 1000), 'weekday') }}
        </h3>
        <h4 class="mb-5">
          {{ $d(new Date(parseInt(day.date, 10) * 1000), 'short') }}
        </h4>
        <v-card
          v-for="(slot, j) in day.slots"
          :key="j"
          :class="{
            'schedule-item': true,
            'mb-5': true,
            'py-2': slot.speaker,
            speaker: slot.speaker
          }"
          :color="slot.speaker ? 'rgba(255,255,255,0.1)' : 'transparent'"
          :ripple="slot.speaker"
          @click="
            () =>
              slot.speaker ? $scrollTo(`#speaker-${slot.speaker.id}`) : null
          "
          flat
        >
          <v-img
            :class="{
              'mx-4': true,
              avatar: slot.speaker
            }"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="
              slot.speaker
                ? slot.speaker.image ||
                  slot.image ||
                  require('../../../static/placeholder.svg')
                : slot.image || require('../../../static/placeholder.svg')
            "
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            cover
          >
            <v-img
              class="speaker-icon"
              v-if="slot.speaker"
              :src="require('../../assets/icons/flat-icon-schedule-mic.svg')"
              max-height="36px"
              max-width="36px"
              width="36px"
              cover
            ></v-img>
          </v-img>
          <div class="info-area">
            <div class="time my-1">
              {{ $d(new Date(parseInt(slot.from, 10) * 1000), 'time') }}
            </div>
            <p class="item-title my-1">
              {{
                slot.speaker
                  ? `"${
                      getI18nNode(
                        getSpeakerRole(slot.speaker).talkTitles,
                        $i18n.locale
                      ).talkTitle
                    }"`
                  : getI18nNode(slot.titles, $i18n.locale).title
              }}
            </p>
            <p
              class="item-description my-1"
              v-html="
                slot.speaker
                  ? slot.speaker.name
                  : formatMarkdown(
                      getI18nNode(slot.descriptions, $i18n.locale).description
                    )
              "
            ></p>
            <v-btn
              v-if="slot.linkExternal"
              class="mt-2"
              width="auto"
              :href="slot.linkExternal.url"
              target="_blank"
              outlined
              text
            >
              {{ getI18nNode(slot.linkExternal.titles, $i18n.locale).title }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import showdown from 'showdown'

const converter = new showdown.Converter()

export default {
  name: 'Schedule',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    timetable: Array
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
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
    },
    getSpeakerRole(speaker) {
      const { roles = [] } = speaker || {}
      const [firstSpeakerRole = {}] =
        roles.filter(({ role }) => role.title === 'Speaker') || {}

      return firstSpeakerRole
    },
    formatMarkdown(text) {
      return converter.makeHtml(text)
    }
  }
}
</script>

<i18n>
{
  "en": {
    "title": "Schedule",
    "language": "Event Language",
    "introText": "The event language is German. This means the talks (unless otherwise marked) and the moderation are in German. However, we welcome all nationalities, languages and dialects. If you have any questions or don't understand something, the whole organizing team will be happy to help you in English. You also have the freedom to decide if you want to pitch in English or German."
  },
  "de": {
    "title": "Eventablauf",
    "language": "Eventsprache",
    "introText": "Die Eventsprache ist Deutsch. Das bedeutet die Vorträge (soweit nicht anders gekennzeichnet) und die Moderation sind auf Deutsch. Wir heißen jedoch alle Nationalitäten, Sprachen und Dialekte willkommen. Wenn ihr Fragen habt oder etwas nicht verstanden habt, hilft euch das gesamte Orga-Team auf Englisch gerne weiter. Darüber hinaus habt ihr auch die Freiheit zu entscheiden ob ihr auf Englisch oder Deutsch pitchen wollt."
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section {
  padding-bottom: 80px;

  h2 {
    font-family: Gagalin, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 40px;
    letter-spacing: 1.4px;
    text-align: center;
    color: #ffffff;
    margin-top: 64px;
    margin-bottom: 32px;

    @media screen and (max-width: 600px) {
      font-size: 24px;
    }
  }

  h3 {
    font-family: Gagalin, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 28px;
    letter-spacing: 1.4px;
    text-align: center;
    color: #ffffff;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .introText {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  .card {
    h3 {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-stretch: normal;
      font-size: 48px;
      line-height: 1;
      letter-spacing: 2.5px;
      text-align: center;
      color: rgba(255, 255, 255, 0.38);
    }

    h4 {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 20px;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.38);
    }

    .schedule-item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 auto;

      &.speaker {
        cursor: pointer;
      }

      .avatar {
        position: relative;
        border-radius: 50%;
        border: 2px solid #ffffff;

        .speaker-icon {
          position: absolute;
          top: auto;
          bottom: 4px;
          left: 28px;
          right: 28px;
        }
      }

      .info-area {
        text-align: left;

        .time {
          font-family: Roboto Condensed, sans-serif;
          font-weight: 300;
          font-size: 36px;
          font-style: normal;
          line-height: 1.2;
          letter-spacing: 2px;
          text-align: inherit;
          color: rgba(255, 255, 255, 0.8);
        }

        .item-title {
          font-family: Gagalin, sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: 20px;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 1px;
          text-align: inherit;
          color: rgba(255, 255, 255, 0.8);
        }

        .item-description {
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

      @media screen and (max-width: 600px) {
        flex-direction: column;

        .info-area {
          margin-top: 16px;
          text-align: center;
        }
      }
    }
  }
}
</style>
