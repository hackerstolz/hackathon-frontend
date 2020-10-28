<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 id="speaker">{{ $t('speakersTitle') }}</h2>
      <p
        class="introSpeakers my-5"
        v-html="$t('introSpeakers', { mailto: $page.hackathon.contactEmail })"
      ></p>
      <v-img
        v-if="$props.speakers.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/icons/flat-icon-mic-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        cover
      ></v-img>
      <v-layout
        v-if="$props.speakers.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          :id="`speaker-${speaker.id}`"
          v-for="(speaker, i) in $props.speakers"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2 avatar-image speaker"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="speaker.image || require('../../../static/placeholder.svg')"
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            cover
          ></v-img>
          <p class="speaker-name my-1">{{ speaker.name }}</p>
          <p class="speaker-description my-1">
            {{
              getI18nNode(getSpeakerRole(speaker, $props.hackathon).professions, $i18n.locale)
                .profession
            }}
          </p>
          <p class="speaker-talk my-1">
            {{
              `"${
                getI18nNode(getSpeakerRole(speaker, $props.hackathon).talkTitles, $i18n.locale)
                  .talkTitle
              }"`
            }}
          </p>
          <v-btn
            class="my-3"
            outlined
            text
            small
            @click="
              ;(dialog.speaker.node = speaker), (dialog.speaker.show = true)
            "
            >{{ $t('more') }}</v-btn
          >
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="dialog.speaker.show"
        scrollable
        width="80%"
        max-width="640px"
        :fullscreen="isMobile"
      >
        <v-card class="card" color="#2f3a58">
          <div class="dialog-card-content pa-4">
            <v-layout row>
              <div class="ml-3 mr-4">&nbsp;</div>
              <v-spacer />
              <h3 class="mb-3">{{ dialog.speaker.node.name }}</h3>
              <v-spacer />
              <v-btn
                class="ma-0"
                color="accent"
                text
                @click="dialog.speaker.show = false"
                icon
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
            <v-img
              class="mb-2 avatar"
              :lazy-src="require('../../../static/placeholder.svg')"
              :src="
                dialog.speaker.node.image ||
                  require('../../../static/placeholder.svg')
              "
              max-height="128px"
              max-width="128px"
              height="128px"
              width="128px"
              cover
            ></v-img>
            <p class="annotation-text mb-4">
              {{
                getI18nNode(
                  getSpeakerRole(dialog.speaker.node, $props.hackathon).professions,
                  $i18n.locale
                ).profession
              }}
            </p>
            <h4>{{ $t('talkTitle') }}</h4>
            <p class="description mb-4" v-show="dialog.speaker.show">
              {{
                `"${
                  getI18nNode(
                    getSpeakerRole(dialog.speaker.node, $props.hackathon).talkTitles,
                    $i18n.locale
                  ).talkTitle
                }"`
              }}
            </p>
            <h4>
              {{
                dialog.speaker.node.salutation === 'W'
                  ? $t('aboutTheSpeakerFemale')
                  : $t('aboutTheSpeakerMale')
              }}
            </h4>
            <p
              class="long-description mb-4"
              v-html="
                formatMarkdown(
                  getI18nNode(
                    getSpeakerRole(dialog.speaker.node, $props.hackathon).descriptions,
                    $i18n.locale
                  ).description
                )
              "
            ></p>
          </div>
          <v-card-actions class="dialog-card-footer">
            <v-spacer />
            <v-btn color="accent" text @click="dialog.speaker.show = false">
              {{ $t('button.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <h2 id="jury">{{ $t('juryTitle') }}</h2>
      <p
        class="introJury my-5"
        v-html="$t('introJury', { mailto: $page.hackathon.contactEmail })"
      ></p>
      <v-layout
        v-if="$props.judges.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(judge, i) in $props.judges"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2 avatar-image judge"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="judge.image || require('../../../static/placeholder.svg')"
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            cover
          ></v-img>
          <p class="judge-title my-1">
            {{ judge.name }}
          </p>
          <p class="judge-description my-1">
            {{
              getI18nNode(getJudgeRole(judge, $props.hackathon).professions, $i18n.locale)
                .profession
            }}
          </p>
          <v-btn
            class="my-3"
            outlined
            text
            small
            @click=";(dialog.judge.node = judge), (dialog.judge.show = true)"
            >{{ $t('more') }}</v-btn
          >
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="dialog.judge.show"
        scrollable
        width="80%"
        max-width="640px"
        :fullscreen="isMobile"
      >
        <v-card class="card" color="#2f3a58">
          <div class="dialog-card-content pa-4">
            <v-layout row>
              <div class="ml-3 mr-4">&nbsp;</div>
              <v-spacer />
              <h3 class="mb-3">{{ dialog.judge.node.name }}</h3>
              <v-spacer />
              <v-btn
                class="ma-0"
                color="accent"
                text
                @click="dialog.judge.show = false"
                icon
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
            <v-img
              class="mb-4 avatar"
              :lazy-src="require('../../../static/placeholder.svg')"
              :src="
                dialog.judge.node.image ||
                  require('../../../static/placeholder.svg')
              "
              max-height="128px"
              max-width="128px"
              height="128px"
              width="128px"
              cover
            ></v-img>
            <p class="annotation-text judge mb-4">
              {{
                getI18nNode(
                  getJudgeRole(dialog.judge.node, $props.hackathon).professions,
                  $i18n.locale
                ).profession
              }}
            </p>
            <h4>
              {{
                dialog.judge.node.salutation === 'W'
                  ? $t('aboutTheJudgeFemale')
                  : $t('aboutTheJudgeMale')
              }}
            </h4>
            <p
              class="long-description mb-4"
              v-html="
                formatMarkdown(
                  getI18nNode(
                    getJudgeRole(dialog.judge.node, $props.hackathon).descriptions,
                    $i18n.locale
                  ).description
                )
              "
            ></p>
          </div>
          <v-card-actions class="dialog-card-footer">
            <v-spacer />
            <v-btn color="accent" text @click="dialog.judge.show = false">
              {{ $t('button.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <h2 id="mentor">{{ $t('mentorsTitle') }}</h2>
      <p class="introMentors my-5" v-html="$t('introMentors')"></p>
      <!-- TODO: enhance schema to maintain registration & info links to roles -->
      <!-- <v-layout
        class="mb-5"
        row
        align-center
        justify-center
        wrap
      >
        <v-btn
          class="mt-2 mr-2"
          width="auto"
          href="https://drive.google.com/open?id=1lUkfoDLM9URdCJRqDsVAI7X83AYuTgpC"
          target="_blank"
          color="info"
          outlined
          text
        >
          {{ $t('button.downloadMentoringFacts') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mt-2"
          width="auto"
          href="https://forms.gle/ZvJ6ZSBu7YvGpiBRA"
          target="_blank"
          color="warning"
          outlined
          text
        >
          {{ $t('button.registerAsMentor') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout> -->
      <v-img
        v-if="$props.mentors.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/icons/flat-icon-persons-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        cover
      ></v-img>
      <v-layout
        v-if="$props.mentors.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(mentor, i) in $props.mentors"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            :class="
              `mx-4 my-2 avatar-image mentor ${getCategoryByMentor(mentor)}`
            "
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="mentor.image || require('../../../static/placeholder.svg')"
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            cover
          ></v-img>
          <p class="mentor-title my-1">{{ mentor.name }}</p>
          <p class="mentor-description my-1">
            {{
              getI18nNode(getMentorRole(mentor, $props.hackathon).professions, $i18n.locale)
                .profession
            }}
          </p>
          <p :class="`mentor-expertise my-1 ${getCategoryByMentor(mentor)}`">
            {{
              getI18nNode(getMentorRole(mentor, $props.hackathon).descriptions, $i18n.locale)
                .description
            }}
          </p>
          <p class="mentor-availability my-1">
            {{
              getMentorRole(mentor, $props.hackathon)
                .timeslots.map(
                  ({ from, to }) =>
                    $d(new Date(parseInt(from, 10) * 1000), 'weekdayShort') +
                    ' ' +
                    $d(new Date(parseInt(from, 10) * 1000), 'time') +
                    '-' +
                    $d(new Date(parseInt(to, 10) * 1000), 'time')
                )
                .join(', ')
            }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import showdown from 'showdown'

const converter = new showdown.Converter()

const MENTOR_CATEGORY = {
  TEAM_BUILDER: 'teamBuilder',
  EXPERT: 'expert',
  PITCH_TRAINER: 'pitchTrainer'
}

export default {
  name: 'Staff',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    hackathon: Object,
    speakers: Array,
    mentors: Array,
    judges: Array
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
    getSpeakerRole(speaker, hackathon) {
      const { roles = [] } = speaker || {}
      const [firstSpeakerRole = {}] =
        roles.filter( role => role.role.title === 'Speaker' && role.hackathon.id === hackathon.id) || {}

      return firstSpeakerRole
    },
    getJudgeRole(judge, hackathon) {
      const { roles = [] } = judge || {}
      const [firstJudgeRole = {}] =
        roles.filter(role => role.role.title === 'Judge' && role.hackathon.id === hackathon.id) || {}

      return firstJudgeRole
    },
    getMentorRole(mentor, hackathon) {
      const { roles = [] } = mentor || {}
      const [firstMentorRole = {}] =
        roles.filter(role => 
          ['Technology Mentor', 'Challenge Mentor', 'Pitch Trainer', 'Team Builder'].includes(
            role.role.title
          ) && role.hackathon.id === hackathon.id
        ) || {}

      return firstMentorRole
    },
    getCategoryByMentor(mentor) {
      const {
        roles: [
          {
            role: { title: roleTitle }
          }
        ]
      } = mentor

      switch (roleTitle) {
        case 'Pitch Trainer':
          return MENTOR_CATEGORY.PITCH_TRAINER
        case 'Technology Mentor':
          return MENTOR_CATEGORY.EXPERT
        case 'Challenge Mentor':
        default:
          return MENTOR_CATEGORY.TEAM_BUILDER
      }
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
  },
  data() {
    return {
      dialog: {
        speaker: {
          node: {},
          show: false
        },
        judge: {
          node: {},
          show: false
        }
      }
    }
  }
}
</script>

<i18n>
{
  "en": {
    "speakersTitle": "Speakers",
    "introSpeakers": "Here we will publish speaker by speaker who will give you a goose bump moment at the opening ceremony on Friday. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a speaker.",
    "more": "More",
    "talkTitle": "title of the talk",
    "aboutTheSpeakerFemale": "About the speaker",
    "aboutTheSpeakerMale": "About the speaker",
    "aboutTheJudgeFemale": "About the jury member",
    "aboutTheJudgeMale": "About the jury member",
    "juryTitle": "Jury",
    "introJury": "Here we will publish really cool jury members, one after each other. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a jury member.",
    "mentorsTitle": "Mentors",
    "introMentors": "So that you have a contact person ready to answer questions on a wide variety of topics, we will put a battalion of mentors at your side. Find out more soon who you can expect here. Would you like to support yourself as a mentor? With pleasure, <a class='link' href='https://drive.google.com/file/d/1Ozx2imKmgCPqQHFShIpflCElci1Zx0yi/view?usp=sharing'>here</a> you get more information - or you register directly via this <a class=#link' href='https://forms.gle/TQxpeQuKpaVNjxp47'>form</a>.",
    "button": {
      "close": "Close",
      "downloadMentoringFacts": "Mentoring Fact-Sheet",
      "registerAsMentor": "Register as Mentor"
    }
  },
  "de": {
    "speakersTitle": "Referenten",
    "introSpeakers": "Hier werden wir nach und nach die Referenten veröffentlichen, die dir bei der Eröffnung am Freitag einen Gänsehautmoment verpassen werden. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Redner zu bewerben.",
    "more": "More",
    "talkTitle": "Titel des Vortrags",
    "aboutTheSpeakerFemale": "Über die Speakerin",
    "aboutTheSpeakerMale": "Über den Speaker",
    "aboutTheJudgeFemale": "Über das Jury Mitglied",
    "aboutTheJudgeMale": "Über das Jury Mitglied",
    "juryTitle": "Jury",
    "introJury": "Hier werden wir Jurymitglieder veröffentlichen, eine*r nach der/m anderen. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Jury-Mitglied zu bewerben.",
    "mentorsTitle": "Mentoren",
    "introMentors": "Damit du immer einen Ansprechpartner hast, der dir bei Fragen zu den unterschiedlichsten Themen zur Seite steht, stellen wir dir ein Bataillon von Mentoren zur Seite. Mehr darüber, wen du hier erwarten kannst, erfährst du in Kürze. Du möchtest selber als Mentor untertsützen? Sehr gerne, <a class='link' href='https://drive.google.com/file/d/1Ozx2imKmgCPqQHFShIpflCElci1Zx0yi/view?usp=sharing'>hier</a> ein paar Infos - oder du meldest dich direkt über dieses <a class=#link' href='https://forms.gle/TQxpeQuKpaVNjxp47'>Formular</a> an.",
    "button": {
      "close": "Schliessen",
      "downloadMentoringFacts": "Mentoring Fact-Sheet",
      "registerAsMentor": "Als Mentor*in registrieren"
    }
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

  .icon-large {
    margin: 0 auto;
  }

  .introSpeakers, .introJury, .introMentors {
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

    .avatar-image {
      border-radius: 8px;
      border: 1px solid transparent;

      &.speaker {
        border-color: #a8e5a3;
      }

      &.judge {
        border-color: rgba(255, 255, 255, 0.8);
      }

      &.mentor {
        border-color: #ffc533;

        &.expert {
          border-color: #70b4df;
        }

        &.pitchTrainer {
          border-color: #DD543B;
        }
      }
    }

    .speaker-name, .judge-title, .mentor-title {
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

    .speaker-description, .judge-description, .mentor-description {
      font-family: click-clack, sans-serif;
      font-weight: 300;
      font-size: 20px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;
      color: rgba(255, 255, 255, 0.8);
    }

    .speaker-talk {
      font-family: click-clack, sans-serif;
      font-weight: 500;
      font-size: 20px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;

      &.speaker-talk {
        color: #A8E5A3;
      }
    }

    .mentor-expertise {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 18px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;

      &.mentor-expertise {
        color: #ffc533;

        &.expert {
          color: #70b4df;
        }

        &.pitchTrainer {
          color: #DD543B;
        }
      }
    }

    .mentor-availability {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 1.2;
      letter-spacing: normal;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.v-dialog--fullscreen {
  .card {
    height: auto;

    .dialog-card-content {
      flex-grow: 1;
    }

    .dialog-card-footer {
      flex-grow: 0;
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

  h4 {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 1.5px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
  }

  .avatar {
    margin: 0 auto;
    border-radius: 50%;
  }

  .annotation-text {
    font-family: click-clack, sans-serif;
    font-weight: 500;
    font-size: 20px;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.5px;
    text-align: inherit;
    color: #A8E5A3;

    &.judge {
      color: #ffffff;
    }
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
