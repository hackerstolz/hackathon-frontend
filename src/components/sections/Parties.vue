<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('sponsorsTitle') }}</h2>
      <p
        class="intro-sponsors mt-5 mb-4"
        v-html="$t('introSponsors', { mailto: $props.hackathon.contactEmail })"
      ></p>
      <v-img
        v-if="$props.sponsors.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/icons/flat-icon-money-large.svg')"
        max-height="245px"
        max-width="245px"
        height="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="$props.sponsors.length > 0"
        class="my-4"
        row
        wrap
        align-center
        justify-center
      >
        <v-flex
          v-for="(sponsor, i) in $props.sponsors"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            'ma-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            v-if="sponsor.role.challenge"
            class="batch"
            :src="require('../../assets/challenge-technology.svg')"
            max-height="96px"
            max-width="96px"
            height="96px"
            width="96px"
            contain
          ></v-img>
          <v-img
            class="mx-4 my-2"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="sponsor.logo || require('../../../static/placeholder.svg')"
            max-height="160px"
            max-width="160px"
            height="160px"
            width="160px"
            contain
          ></v-img>
          <p
            :class="{
              'sponsor-title': true,
              challenge: sponsor.role.challenge,
              'my-1': true
            }"
          >
            {{ getI18nNode(sponsor.names, $i18n.locale).name }}
          </p>
          <v-btn
            v-if="sponsor.role.challenge"
            class="mt-2"
            width="auto"
            color="info"
            outlined
            text
            small
            @click="() => $scrollTo(`#challenge-${sponsor.role.challenge.id}`)"
            >{{ $t('button.showChallenge') }}</v-btn
          >
          <div v-if="!sponsor.role.challenge" style="height: 42px">
            &nbsp;
          </div>
        </v-flex>
      </v-layout>
      <p class="outro-sponsors my-5">{{ $t('outroSponsors') }}</p>
      <v-layout row align-center justify-center wrap>
        <v-btn
          class="mx-2"
          href="https://www.iso.org/iso-50001-energy-management.html"
          target="_blank"
          color="accent"
          outlined
          text
        >
          {{ $t('button.link2Iso500001') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          href="https://www.right-basedonscience.de/en/xdc-model/"
          target="_blank"
          color="accent"
          outlined
          text
        >
          {{ $t('button.link2XDC') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          href="https://www.cdp.net/en/companies/companies-scores"
          target="_blank"
          color="accent"
          outlined
          text
        >
          {{ $t('button.link2CDP') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout>

      <h2>{{ $t('partnersTitle') }}</h2>
      <p
        class="intro-partners my-5"
        v-html="$t('introPartners', { mailto: $props.hackathon.contactEmail })"
      ></p>
      <v-img
        v-if="$props.partners.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/icons/flat-icon-heart-large.svg')"
        max-height="245px"
        max-width="245px"
        height="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="$props.partners.length > 0"
        class="my-4"
        row
        wrap
        align-center
        justify-center
      >
        <v-flex
          v-for="(partner, i) in $props.partners"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            'ma-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :lazy-src="require('../../../static/placeholder.svg')"
            :src="partner.logo || require('../../../static/placeholder.svg')"
            max-height="160px"
            max-width="160px"
            height="160px"
            width="160px"
            contain
          ></v-img>
          <p class="partner-title my-1">
            {{ getI18nNode(partner.names, $i18n.locale).name }}
          </p>
          <p
            :class="{
              'partner-subtitle': true,
              'my-1': true
            }"
          >
            {{ getI18nNode(partner.role.subtitles, $i18n.locale).subtitle }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Parties',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    hackathon: Object,
    sponsors: Array,
    partners: Array
  },
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase()
      const [i18nNode = {}] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split('-'[0])
      ) || [{}]

      return i18nNode
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
    "sponsorsTitle": "Sponsors",
    "introSponsors": "Make a difference, with your sponsoring you support promising projects or even startups which aim to save our planet – what else could you wish for? Not enough, as you wish, here some more arguments for you: You are mentioned at the event and on social media. Establish your company as a relevant and sustainable tech player in the dynamic coding community. And beside that you can provide your own challenge and prize depending on the sponsoring package of your choice. Benefit from the inventiveness of the teams working on your challenge. Act now and <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>contact us</a>!",
    "outroSponsors": "It is difficult to establish a clear and quantifiable criterion as to which sustainability criteria a sponsor must meet. Therefore, we will review different sources to get an idea of how sustainable a sponsor is. These criteria include: The last sustainability report, ISO-50001 certification, published climate indicators such as the X-Degree-Compatibility (XDC), rating in the CDP Climate Scoring etc., are all relevant criteria. If we have the impression that a sponsor does not meet our sustainability expectations, we can reject the sponsor.",
    "partnersTitle": "Partners",
    "introPartners": "You can’t support us financially? No problem, help us to promote  the event, become a network and media partner or support us with an immaterial contribution like mentors for the teams, etc. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a>!",
    "button": {
      "link2Iso500001": "ISO-500001",
      "link2XDC": "XDC",
      "link2CDP": "CDP Climate Scoring",
      "donate": "Donate without sponsorhip",
      "showChallenge": "Show Challenge"
    }
  },
  "de": {
    "sponsorsTitle": "Sponsoren",
    "introSponsors": "Macht den Unterschied, mit eurem Sponsoring unterstützt ihr vielversprechende Projekte oder gar Start-ups, die darauf abzielen, unseren Planeten zu retten - was wollt ihr euch mehr wünschen? Nicht genug? Wie ihr wünscht, hier noch ein paar weitere Argumente für euch: Ihr werdet auf der Veranstaltung und in Social Media erwähnt. Etabliert euer Unternehmen als relevanten und nachhaltigen Technologiepartner in der dynamischen Programmiergemeinschaft. Und außerdem könnt ihr je nach Sponsoring-Paket eurer Wahl eure eigene Herausforderung und euren eigenen Preis anbieten. Profitiert vom Ideenreichtum der Teams, die an eurer Herausforderung arbeiten. Handelt jetzt und <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>kontaktiert uns</a>!",
    "outroSponsors": "Es ist schwierig, ein klares und quantifizierbares Kriterium festzulegen, welche Nachhaltigkeitskriterien ein Sponsor erfüllen muss. Daher werden wir verschiedene Quellen überprüfen, um eine Vorstellung davon zu bekommen, wie nachhaltig ein Sponsor ist. Zu diesen Kriterien gehören: Der letzte Nachhaltigkeitsbericht, die ISO-50001-Zertifizierung, veröffentlichte Klimaindikatoren wie die X-Degree-Compatibility (XDC), die Bewertung im CDP Climate Scoring etc. sind alle relevante Kriterien. Wenn wir den Eindruck haben, dass ein Sponsor unsere Nachhaltigkeitserwartungen nicht erfüllt, können wir den Sponsor ablehnen.",
    "partnersTitle": "Partner",
    "introPartners": "Du kannst uns nicht finanziell unterstützen? Kein Problem, helft uns, die Veranstaltung zu bewerben, werdet Netzwerk- und Medienpartner oder unterstützt uns mit einem immateriellen Beitrag wie Mentoren für die Teams, etc. <a class='link' href='mailto:{mailto}?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiert uns</a>!",
    "button": {
      "link2Iso500001": "ISO-500001",
      "link2XDC": "XDC",
      "link2CDP": "CDP Climate Scoring",
      "donate": "Spenden ohne Sponsoring",
      "showChallenge": "Challenge anzeigen"
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

  .intro-sponsors, .outro-sponsors, .intro-partners {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);

    &.outro-sponsors {
      color: #A8E5A3;
    }
  }

  .stack-grid-item {
    position: relative;
    transition: all 300ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;

    .sponsor-title, .partner-title {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      font-style: normal;
      font-size: 20px;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 1px;
      text-align: inherit;
      color: #ffffff;

      &.challenge {
        color: #ffffff; // #70B4DF
      }
    }

    .partner-subtitle {
      font-family: click-clack, sans-serif;
      font-weight: 500;
      font-size: 20px;
      font-style: normal;
      line-height: 1.2;
      letter-spacing: 0.5px;
      text-align: inherit;
      color: darken(#FFFFFF, 20%);

      &.important {
        color: #70B4DF;
      }
    }

    .batch {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      top: 0;
      right: auto;
      left: auto;
      transform: translateY(-42%) translateX(-45%);
    }
  }
}
</style>
