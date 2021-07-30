<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <p class="introText my-5" v-html="$t('introText')"></p>
      <v-card
        class="my-5"
        v-scroll-to="'#faq'"
        color="transparent"
        ripple
        flat
        @click="() => {}"
      >
        <p class="priceText my-5">
		{{
		  getI18nNode($props.hackathon.priceDescriptions, $i18n.locale)
			.description
        }}
		</p>
      </v-card>
      <v-btn
        v-if="$props.hackathon.linkTicketshop"    
        class="buy-tickets mt-4 mb-8 white--text"
        width="auto"
        :href="ticketShopURL"
        :disabled="!ticketShopURL"
        target="_blank"
        color="success"
        large
        >{{
          getI18nNode($props.hackathon.linkTicketshop.titles, $i18n.locale)
            .title
        }}</v-btn
      >
      <v-layout row align-center justify-center wrap>
        <!-- <v-btn
          class="mt-2 mr-2"
          width="auto"
          :href="ticketShopURL"
          :disabled="!ticketShopURL"
          target="_blank"
          color="info"
          outlined
          text
        >
          {{ $t('button.link2Ticktes') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn> -->
        <v-btn
          class="mt-2 mr-2"
          width="auto"
          :href="communityURL"
          :disabled="!communityURL"
          target="_blank"
          color="warning"
          outlined
          text
        >
          {{ $t('button.link2Slack') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout>
      
      <v-layout class="my-4" row wrap align-start justify-center>
        <v-flex
          v-for="(type, i) in types"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile,
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="type.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="type-title my-1">
            {{ $i18n.locale === 'en' ? type.i18nTitle[0] : type.i18nTitle[1] }}
          </p>
          <p class="type-description my-1">
            {{
              $i18n.locale === 'en'
                ? type.i18nDescription[0]
                : type.i18nDescription[1]
            }}
          </p>
        </v-flex>
      </v-layout>
      <p class="highlightText my-3">{{ $t('highlightText') }}</p>
      <p class="outroText my-5">{{ $t('outroText') }}</p>
      
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Registration',
  props: {
    themeColor: {
      type: String,
      default: 'primary',
    },
    isMobile: Boolean,
    hackathon: Object,
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
    communityURL() {
      return this.$props.hackathon.linkCommunity
        ? this.$props.hackathon.linkCommunity.url
        : ''
    },
    // ticketShopText() {
    //   return this.$props.hackathon.linkTicketshop.titles
    //     ? this.
    //     : ''
    // },
    ticketShopURL() {
      return this.$props.hackathon.linkTicketshop
        ? this.$props.hackathon.linkTicketshop.url
        : ''
    },
    sectionColor() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary
    },
  },
  data() {
    return {
      types: [
        {
          icon: require('../../assets/icons/flat-icon-terminal.svg'),
          i18nTitle: ['Developer', 'Entwickler*in'],
          i18nDescription: [
            'Programmers who turn thoughts into code. Only the input speed of your keyboard sets you limits.',
            'Programmierer, die Gedanken in Code verwandeln. Nur die Eingabegeschwindigkeit deiner Tastatur setzt dir Grenzen.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-stack.svg'),
          i18nTitle: ['Engineer', 'Techniker*in'],
          i18nDescription: [
            'With a deep scientific background you build the complex engine room of any technical project.',
            'Mit einem tiefen wissenschaftlichen Hintergrund baust du den komplexen Maschinenraum eines jeden technischen Projekts.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-network.svg'),
          i18nTitle: ['Data Scientist', 'Datenwissenschaftler*in'],
          i18nDescription: [
            'You and data, it’s a long story. A mixture of data magic and a touch of AI.',
            'Du und Daten, es ist eine lange Geschichte. Eine Mischung aus Datenmagie und einem Hauch von KI.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-tools.svg'),
          i18nTitle: ['Maker', 'Macher*in'],
          i18nDescription: [
            'Loves tinkering around with hardware and IoT. Your hands start to itch when you hear a great idea.',
            'Liebt es, an Hardware und IoT herumzubasteln. Deine Hände fangen an zu jucken, wenn du eine tolle Idee hörst.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-bulp.svg'),
          i18nTitle: ['Idea Generator', 'Ideengenerator*in'],
          i18nDescription: [
            'You spark creation with your original ideas and understand the problem at hand.',
            'Du inspirierst die Kreation mit deinen originellen Ideen und verstehst das anstehende Problem.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-astronaut.svg'),
          i18nTitle: ['Superpower', 'Superkraft'],
          i18nDescription: [
            'Not techie or a designer, but your magic touch will bring projects to life.',
            'Nicht Techniker oder Designer, aber deine magische Note wird Projekte zum Leben erwecken.',
          ],
        },
        {
          icon: require('../../assets/icons/flat-icon-colors.svg'),
          i18nTitle: ['Designer', 'Designer*in'],
          i18nDescription: [
            'In your skillful hands, dashboards and applications gain clarity and style.',
            'In deinen geschickten Händen gewinnen Dashboards und Anwendungen an Klarheit und Stil.',
          ],
        },
      ],
    }
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Registration",
    "introText": "Wondering what kind of hackers are needed to take on the challenges? Find them here, but please don’t forget, the only really important condition for you as a participant: <strong>planet earth lover!</strong> By the way, in our FAQ we explain in more detail that there are really no requirements to take part at the Climathon.",
    "highlightText": "Teams of 3 to 7 people work together on a project idea.",
    "outroText": "If you don’t have a complete team yet, don’t worry, you can register as an individual participant in the application process and then find teammates before the event in our slack community or during the first day.",
    "priceText": "CANCELED - The new corona regulation, a noticeable increase in 'digital fatigue' and the resulting low ticket sales for this year's Climathon are factors that have moved us with a heavy heart to cancel the Climathon Mannheim for this year. We are looking forward to hopefully better conditions and to counting you again next year!",
    "button": {
      "link2Ticktes": "Go to Ticketshop",
      "link2Slack": "Join slack community",
      "buyTickets": "Get tickets now!"
    }
  },
  "de": {
    "title": "Registrierung",
    "introText": "Du fragst dich, welche Art von Hackern benötigt werden, um die Herausforderungen anzunehmen? Hier findest du sie, aber vergiss nicht, die einzige wirklich wichtige Bedingung für dich als Teilnehmer: <strong>Liebhaber von Planet Erde!</strong> In unserem FAQ gehen wir übrigens näher darauf ein, dass es wirklich keine Voraussetzungen gibt beim Climathon mitzumachen.",
    "highlightText": "Teams von 3 bis 7 Personen arbeiten gemeinsam an einer Projektidee.",
    "outroText": "Wenn du noch kein komplettes Team hast, kannst du dich als Einzelteilnehmer im Bewerbungsprozess anmelden und dann vor der Veranstaltung in unserer Slack Community oder am ersten Tag vor Ort Teamkollegen finden.",
    "priceText": "ABGESAGT - Die neue Corona-Verordnung, eine spürbar aufkommende digitale Müdigkeit und dem damit verbundenen geringen Ticketverkauf für den diesjährigen Climathon sind Faktoren, die uns schweren Herzens dazu bewegt haben, den Climathon Mannheim für dieses Jahr abzusagen. Wir freuen uns auf hoffentlich bessere Rahmenbedingungen im nächsten Jahr!",
    "button": {
      "link2Ticktes": "Zum Ticketshop",
      "link2Slack": "Slack Community beitreten",
      "buyTickets": "Jetzt Tickets sichern!"
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

  .highlightText {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    // TODO: replace color by constant
    color: #A8E5A3;
  }

  .introText, .outroText, .priceText {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);

    &.priceText {
      cursor: pointer;
      color: #ffc533;
    }
  }

  .stack-grid-item {
    transition: all 300ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .type-title {
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

    .type-description {
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

  .buy-tickets {
    font-family: Gagalin, sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 1.5px;
    font-size: 22px;
    color: #ffffff;
  }
}
</style>
