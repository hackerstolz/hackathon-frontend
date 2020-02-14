<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <p class="intro my-5" v-html="$t('intro')"></p>
      <!-- <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <stack-item v-for="category in categoriesSorted" :key="category.id" class="stack-grid-item">
          <v-card
            :class="{
              card: true,
              'pa-3': true,
              'active-challenges': category.challenges.length > 0
            }"
            :color="
              category.challenges.length > 0
                ? 'rgba(76,174,121,0.2)'
                : 'rgba(255,255,255,0.1)'
            "
            ripple
            flat
            @click="category.show = true"
          >
            <h3 class="mb-3">{{ $t(`categories.${category.key}.title`) }}</h3>
            <v-img :src="category.img" max-height="128px" contain @load="reflow"></v-img>
            <div
              v-if="category.challenges.length === 0"
              class="count my-3"
            >{{ $tc('challengeCount', category.challenges.length) }}</div>
            <v-btn
              v-if="category.challenges.length > 0"
              class="my-3"
              color="accent"
              outlined
              text
              small
            >
              {{ $tc('challengeCount', category.challenges.length) }}
            </v-btn>
            <p class="description">
              {{
              $t(`categories.${category.key}.description`)
              .slice(0, 100)
              .concat('...')
              }}
            </p>

            <v-dialog
              v-model="category.show"
              scrollable
              width="80%"
              max-width="640px"
              :fullscreen="isMobile"
              @input="category.show = false"
            >
              <v-card
                :class="{
                  card: true,
                  'active-challenges': category.challenges.length > 0
                }"
                color="#2f3a58"
              >
                <div
                  :class="{
                    'dialog-card-content': true,
                    'pa-3': true
                  }"
                >
                  <v-layout row>
                    <div class="ml-3 mr-4">&nbsp;</div>
                    <v-spacer />
                    <h3 class="mb-3">{{ $t(`categories.${category.key}.title`) }}</h3>
                    <v-spacer />
                    <v-btn class="ma-0" color="accent" text @click="category.show = false" icon>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-layout>
                  <v-img :src="category.img" max-height="128px" contain></v-img>
                  <div class="count my-3">{{ $tc('challengeCount', category.challenges.length) }}</div>
                  <p
                    class="description"
                    v-show="category.show"
                  >{{ $t(`categories.${category.key}.description`) }}</p>
                  <div class="challenge" v-for="(challenge, j) in category.challenges" :key="j">
                    <v-img
                      :class="{
                        batch: true,
                        [challenge.type.toLowerCase()]: true,
                        'mt-5': true,
                        'mb-4': true
                      }"
                      :src="
                        require(`../../assets/challenge-${challenge.type.toLowerCase()}.svg`)
                      "
                      max-height="84px"
                      contain
                    ></v-img>
                    <p
                      :class="{
                        author: true,
                        [challenge.type.toLowerCase()]: true,
                        'mb-4': true
                      }"
                      v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nAuthor[0]
                          : challenge.i18nAuthor[1]
                      "
                    ></p>
                    <h4
                      class="mb-4"
                      v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nTitle[0]
                          : challenge.i18nTitle[1]
                      "
                    ></h4>
                    <h5 class="mb-2">{{ $t('challangeSummary') }}</h5>
                    <p
                      class="mb-4"
                      v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nSummary[0]
                          : challenge.i18nSummary[1]
                      "
                    ></p>
                    <h5 class="mb-2">{{ $t('challangeDescription') }}</h5>
                    <p
                      class="mb-4"
                      v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nDescription[0]
                          : challenge.i18nDescription[1]
                      "
                    ></p>
                    <h5 class="mb-2">{{ $t('challangeVision') }}</h5>
                    <p
                      class="mb-4"
                      v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nVision[0]
                          : challenge.i18nVision[1]
                      "
                    ></p>
                  </div>
                </div>
                <v-card-actions class="dialog-card-footer">
                  <v-spacer />
                  <v-btn color="accent" text @click="category.show = false">
                    {{
                    $t('button.close')
                    }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </stack-item>
      </stack>-->

      <v-row justify="center">
        <v-expansion-panels popout :value="challengeOpen">
          <v-expansion-panel
            :id="`challenge-${challenge.ID}`"
            class="challenge"
            v-for="(challenge,i) in challenges"
            :key="i"
          >
            <v-expansion-panel-header class="challenge-head" color="rgba(255,255,255,0.1)" ripple>
              <v-layout column>
                <h3
                  class="mb-3"
                >{{ $t(`categories.${getCategoryKey(challenge.categoryID)}.title`) }}</h3>
                <v-img :src="getCategoryImg(challenge.categoryID)" max-height="128px" contain></v-img>
                <p
                  :class="{
                        author: true,
                        [challenge.type.toLowerCase()]: true,
                        'mb-4': true
                      }"
                  v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nAuthor[0]
                          : challenge.i18nAuthor[1]
                      "
                ></p>
                <h4
                  class="mb-4"
                  v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nTitle[0]
                          : challenge.i18nTitle[1]
                      "
                ></h4>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="challenge-content" color="rgba(255,255,255,0.1)">
              <v-layout column>
                <v-img
                  :class="{
                        batch: true,
                        [challenge.type.toLowerCase()]: true,
                        'mt-5': true,
                        'mb-4': true
                      }"
                  :src="
                        require(`../../assets/challenge-${challenge.type.toLowerCase()}.svg`)
                      "
                  max-height="84px"
                  contain
                ></v-img>
                <h5 class="mb-2">{{ $t('challangeSummary') }}</h5>
                <p
                  class="mb-4"
                  v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nSummary[0]
                          : challenge.i18nSummary[1]
                      "
                ></p>
                <h5 class="mb-2">{{ $t('challangeDescription') }}</h5>
                <p
                  class="mb-4"
                  v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nDescription[0]
                          : challenge.i18nDescription[1]
                      "
                ></p>
                <h5 class="mb-2">{{ $t('challangeVision') }}</h5>
                <p
                  class="mb-4"
                  v-html="
                        $i18n.locale === 'en'
                          ? challenge.i18nVision[0]
                          : challenge.i18nVision[1]
                      "
                ></p>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

      <div class="submitArea">
        <h2 class="align-left">{{ $t('titleSubmit') }}</h2>
        <v-img
          class="mb-4"
          :src="require('../../assets/icons/flat-icon-puzzle.svg')"
          max-height="128px"
          contain
        ></v-img>
        <v-btn
          v-if="challengeSubmissionOpen"
          class="link-to-cgoal mb-4"
          href="https://forms.gle/d5EmFpQPosEJD2PKA"
          target="_blank"
          color="info"
          outlined
          text
        >
          {{ $t('button.link2Form') }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <p v-if="challengeSubmissionOpen" class="submitText">{{ $t('submitText') }}</p>
        <p v-if="challengeSubmissionOpen" class="submitDeadline">{{ $t('submitDeadline') }}</p>
        <p v-if="!challengeSubmissionOpen" class="submitInfo">{{ $t('submitInfo') }}</p>
      </div>
      <!-- <p class="submitInfo">{{ $t("submitDeadline") }}</p> -->
    </v-container>
  </section>
</template>

<script>
import clone from "lodash/clone";
import debounce from "lodash/debounce";
import find from "lodash/find";
import { Stack, StackItem } from "vue-stack-grid";
import { getUrlHashQuery as getQuery } from "../../i18n";

const CHALLENGE_TYPE = {
  CITY: "CITY",
  COMMUNITY: "COMMUNITY",
  SPONSOR: "SPONSOR"
};

export default {
  name: "Challenges",
  components: { Stack, StackItem },
  props: {
    themeColor: {
      type: String,
      default: "primary"
    },
    isMobile: Boolean
  },
  mounted() {
    this.routeUpdate(this.$route);
  },
  computed: {
    categoriesSorted() {
      return clone(this.categories).sort(
        (a, b) => b.challenges.length - a.challenges.length
      );
    },
    sectionColor() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary;
    }
  },
  methods: {
    getCategoryImg(ID) {
      const { img } = this.getCategory(ID);
      return img;
    },
    getCategoryKey(ID) {
      const { key } = this.getCategory(ID);
      return key;
    },
    getCategory(ID) {
      return find(this.categories, { id: ID }) || {};
    },
    routeUpdate($route) {
      const query = getQuery();
      const validChallenge =
        query.challenge &&
        document.getElementById(`challenge-${query.challenge}`);

      // scroll to and display challenge if defined
      if (validChallenge) {
        this.$scrollTo(`#challenge-${query.challenge}`);
        this.expandChallenge(query.challenge);
      }
    },
    expandChallenge(challengeID) {
      this.challenges.forEach((c, i) =>
        c.ID.toString() === challengeID.toString()
          ? ((c.expand = true), (this.challengeOpen = i))
          : (c.expand = false)
      );
    }
    // reflow: debounce(function() {
    //   this.$refs.stack.reflow();
    // }, 100)
  },
  watch: {
    $route: function(value) {
      this.routeUpdate(value);
    }
  },
  data() {
    return {
      challengeSubmissionOpen: false,
      categories: [
        {
          id: 0,
          key: "smartCity",
          img: require("../../assets/icons/flat-icon-smartCity.svg")
        },
        {
          id: 1,
          key: "mobility",
          img: require("../../assets/icons/flat-icon-mobility.svg")
        },
        {
          id: 2,
          key: "retrofitting",
          img: require("../../assets/icons/flat-icon-retrofitting.svg")
        },
        {
          id: 3,
          key: "circularEconomy",
          img: require("../../assets/icons/flat-icon-circularEconomy.svg")
        },
        {
          id: 4,
          key: "food",
          img: require("../../assets/icons/flat-icon-food.svg")
        },
        {
          id: 5,
          key: "finance",
          img: require("../../assets/icons/flat-icon-finance.svg")
        },
        {
          id: 6,
          key: "behaviour",
          img: require("../../assets/icons/flat-icon-behaviour.svg")
        },
        {
          id: 7,
          key: "water",
          img: require("../../assets/icons/flat-icon-water.svg")
        },
        {
          id: 8,
          key: "energy",
          img: require("../../assets/icons/flat-icon-energy.svg")
        },
        {
          id: 9,
          key: "extremeWeather",
          img: require("../../assets/icons/flat-icon-extremeWeather.svg")
        },
        {
          id: 10,
          key: "waste",
          img: require("../../assets/icons/flat-icon-waste.svg")
        },
        {
          id: 11,
          key: "pollution",
          img: require("../../assets/icons/flat-icon-pollution.svg")
        }
      ],
      challengeOpen: null,
      challenges: [
        {
          ID: 100,
          type: CHALLENGE_TYPE.SPONSOR,
          expand: false,
          categoryID: 0,
          i18nAuthor: [
            "GBG - Mannheimer housing company ltd.",
            "GBG - Mannheimer Wohnungsbaugesellschaft mbH"
          ],
          i18nTitle: [
            'How could an algorithm for a smart and climate-friendly calculation of future housing demand, housing location and housing characteristics ("foresighted housing supply") look like and which data could be networked in a new way typical for mashup?',
            'Wie könnte ein Algorithmus zur intelligenten und klimafreundlichen Berechnung von zukünftigem Wohnungsbedarf, Wohnlage und Wohnungseigenschaften ("vorausschauendes Wohnungsangebot") aussehen und welche Daten könnten auf neue Mashup-typische Weise vernetzt werden?'
          ],
          i18nSummary: [
            'With around 18,846 apartments, GBG Mannheim is the largest local housing association in Baden-Württemberg. It provides living space for about 13 percent of Mannheim\'s citizens. On commission from the City of Mannheim, GBG is taking over individual construction projects that are important for the sustainable development of the city. How could an algorithm for a smart and climate-friendly calculation of future housing demand, housing location and housing characteristics ("foresighted housing supply") look like and which data could be networked in a new way typical for meshup?',
            'Die GBG Mannheim ist mit rund 18.846 Wohnungen die größte lokale Wohnungsgesellschaft in Baden-Württemberg. Sie bietet rund 13 Prozent der Mannheimer Bevölkerung Lebensraum. Im Auftrag der Stadt Mannheim übernimmt die GBG einzelne Bauvorhaben, die für die nachhaltige Entwicklung der Stadt wichtig sind. Wie könnte ein Algorithmus zur intelligenten und klimafreundlichen Berechnung von zukünftigem Wohnungsbedarf, Wohnlage und Wohnungseigenschaften ("vorausschauendes Wohnungsangebot") aussehen und welche Daten könnten auf neue Meshup-typische Weise vernetzt werden?'
          ],
          i18nDescription: [
            "<ul class='list'><li>A wide variety of creative and visionary data can be \"linked\"! Also very complex!</li><li>For example: statistical data (birth rate, death rate, place of residence, place of work, but also future data that may become available through an X-Road architecture in Germany), data from the housing sector, social media data or participative data and IoT data (e.g. environmental data).</li></ul>",
            "<ul class='list'><li>Eine Vielzahl von kreativen und visionären Daten kann \"verknüpft\" werden! Auch sehr komplex!</li><li><li>Zum Beispiel: statistische Daten (Geburtenrate, Sterblichkeitsrate, Wohnort, Arbeitsplatz, aber auch zukünftige Daten, die durch eine X-Road-Architektur in Deutschland verfügbar werden können), Daten aus dem Wohnungssektor, Social Media-Daten oder partizipative Daten und IoT-Daten (z.B. Umweltdaten).</li></ul>"
          ],
          i18nVision: [
            "There are no limits to your imagination in this challenge.",
            "Der Fantasie sind bei dieser Herausforderung keine Grenzen gesetzt."
          ]
        },
        {
          ID: 101,
          type: CHALLENGE_TYPE.SPONSOR,
          expand: false,
          categoryID: 0,
          i18nAuthor: ["MVV Energy AG", "MVV Energie AG"],
          i18nTitle: [
            "How can life in the city of Mannheim be made more liveable through the use of LoRaWAN technology?",
            "Wie kann das Leben in der Stadt Mannheim durch die Verwendung der LoRaWAN-Technologie lebenswerter gestaltet werden?"
          ],
          i18nSummary: [
            "Create the cities of the future today. The development of a city into a Smart City is an individual task for every community. Smart Cities support the efficient, sustainable and liveable design of cities by intelligently using municipal infrastructure. This will be boosted with the help of IoT and various IT, mobile and cloud computing technologies.",
            "Die Städte der Zukunft schon heute gestalten. Die Entwicklung einer Stadt zur „Smart City“ ist eine kommunale Zukunftsaufgabe. Smart Cities unterstützen eine effiziente, nachhaltige und lebenswerte Gestaltung der Städte durch die intelligente Nutzung der kommunalen Infrastruk-tur. Diese wird mit Hilfe von IoT und diversen IT-, Mobile- und Cloud-Computing-Technologien weiter vorangetrieben."
          ],
          i18nDescription: [
            "In this context, MVV Energie AG is setting up a LoRaWAN (Long Range Wide Area Network) in Mannheim to enable efficient and cost-effective data collection. LoRaWAN is a great technology to collect, transmit and intelligently evaluate environmental data such as meteorological data or air pollutants. We are striving to monitor emissions and derive measures to improve the quality of life. In urban gardening, sensors can be used to measure moisture levels in order to motivate the community to maintain the garden, e.g. through reward systems. Thus the following ques-tion arises: How can life in the city of Mannheim be made more liveable through the use of LoRaWAN technology?",
            "In diesem Zusammenhang baut MVV Energie AG ein LoRaWAN (Long Range Wide Area Network) in Mannheim auf, um so eine effiziente und kostengünstige Datenerfassung zu ermöglichen. Über LoRaWAN können u.a. Umweltdaten (wie z.B. meteorologische Daten oder Luftschadstoffe) erfasst, übertragen und intelligent ausgewertet werden. Diese Informationen können wir nut-zen, um Emissionen zu überwachen und Maßnahmen zur Verbesserung der Lebensqualität umzu-setzen. Aber auch in anderen Bereichen wie beispielsweise beim Urban Gardening können Sen-soren zur Erdfeuchtigkeitsmessung eingesetzt werden und so die Community zur Pflege des Gar-tens (z.B. über Belohnungssysteme) zu motivieren. Somit stellt sich folgende Frage: Wie kann das Leben in der Stadt Mannheim durch die Verwendung der LoRaWAN-Technologie lebenswerter gestaltet werden?"
          ],
          i18nVision: [
            '<ul class="list"><li>The solution can either focus on a specific aspect e.g. mobility, energy supply etc., or con-sider the city as a whole. There are no limits to the ideas as long as LoRaWAN supports this technically. </li><li>For the challenge, current sensor data from the city, transmitted via LoRaWAN, will be made available to you. - You have the possibility to develop a concept or to realize prototypes - if you use the data provided by us is up to you. </li><li>The solution can either be an application for the municipality (B2M e.g. optimization sugges-tions) or for the citizens (B2C e.g. incentive for more sustainable behaviour).</li></ul>We are looking forward to your ideas!',
            '<ul class="list"><li>Die Lösung kann sich entweder auf einen bestimmten Teilbereich (z.B. Mobilität oder Ener-gieversorgung) fokussieren, oder die Stadt als Ganzes betrachten. Den Ideen sind keine Grenzen gesetzt, solange LoRaWAN dies technisch unterstützt. </li><li>Für die Challenge werden Euch aktuelle Sensordaten aus der Stadt zur Verfügung gestellt, die via LoRaWAN übertragen werden.</li><li>Ihr habt die Möglichkeit ein Konzept zu entwickeln oder Prototypen praktisch umzusetzen – ob Ihr die von uns zur Verfügung gestellten Daten nutzt, bleibt dabei euch überlassen. </li>Die Lösung kann entweder eine Anwendung für die Gemeinde (z.B. Optimierungsvorschläge) oder für die Bürger (z.B. Anreiz für nachhaltigeres Verhalten) darstellen.</li></ul>Wir freuen uns auf Eure Ideen!'
          ]
        },
        {
          ID: 102,
          type: CHALLENGE_TYPE.SPONSOR,
          expand: false,
          categoryID: 1,
          i18nAuthor: [
            "Rhein-Neckar-Verkehr GmbH",
            "Rhein-Neckar-Verkehr GmbH"
          ],
          i18nTitle: [
            "By which means does a modern and smart public transportation system really change our behaviour, enhance our lives, and protects the environment?",
            "Mit welchen Mitteln verändert ein modernes und intelligentes öffentliches Verkehrssystem wirklich unser Verhalten, verbessert unser Leben und schützt die Umwelt?"
          ],
          i18nSummary: [
            "Mobility, as a basic need of mankind, affects all of us permanently. The Rhein-Neckar-Verkehr GmbH (rnv) fosters a sustainable strategy of innovation, efficiency, an increase of the modal split, benefits for the environment, and cohesiveness to ensure the highest quality possible for its existing customers. In addition, the rnv strives to attract as many new customers as possible - esp. those switching from the usage of their own car to the usage of public transportation.</br>Now you can be part of this offensive by shaping the public transportation sector towards a customer-focused mobility as a service landscape by using data in new ways, taking advantage of digitalization and new technology, and by the innovative combination of hard- and software in the internet of things.",
            "Mobilität als Grundbedürfnis des Menschen betrifft uns alle dauerhaft. Die Rhein-Neckar-Verkehr GmbH (rnv) fördert eine nachhaltige Strategie der Innovation, Effizienz, Erhöhung des Modal Splits, Nutzen für die Umwelt und Kohäsion, um ihren Bestandskunden die bestmögliche Qualität zu gewährleisten. Darüber hinaus ist die rnv bestrebt, möglichst viele neue Kunden zu gewinnen - insbesondere solche, die von der Nutzung des eigenen Autos auf die Nutzung des öffentlichen Verkehrs umsteigen.<br/><br/>Jetzt kannst du Teil dieser Offensive sein, indem du den ÖPNV durch neue Datennutzung, Nutzung von offenen Daten, Digitalisierung und neuen Technologien sowie durch die innovative Kombination von Hard- und Software im Internet der Dinge zu einer kundenorientierten Mobilitätslandschaft entwickelst."
          ],
          i18nDescription: [
            'The rnv provides its open service Start.Info API as well as already published data on its open data portal for its 81 bus and tram lines plus exclusive data just for this challenge! Together with all kinds of additional data from partner challenges or the web you can focus on one or more topics in the context of the following areas:<ul class="list"><li>Navigation for mobility-impaired and visually handicapped people to and from our stops, within our vehicles, etc. Tons of open maps, open routing services, gits with open source codes are available. Different technologies may apply. Do you want to solve this jigsaw?</li><li>Enhancements of the rnv/VRN eTarif app: What is your dream of seamless traveling without the need of having a ticket? CICO, CIBO, BIBO! Psycho?</li><li>Occupancy rates of our public transportation vehicles allow varieties towards a more efficient usage of our vehicles. But how to get the data as cheap as possible for a given accuracy? How to predict those rates? How to influence customer behaviour in using our vehicles as a win-win? How to…??? It’s your turn!</li><li>User information itself: What are the newest trends or the latest technologies to inform our customers on the go or at a location? What kind of information can be given by stationary monitors and all kinds of wearables? Think for example about mobility hubs or how a new residential quarter should look like, if no individual cars are allowed?</li></ul>',
            "Die rnv bietet seinen offenen Dienst Start.Info API sowie bereits veröffentlichte Daten auf seinem offenen Datenportal für seine 81 Bus- und Straßenbahnlinien sowie exklusive Daten speziell für diese Herausforderung! Zusammen mit möglichen Zusatzdaten von Partnerherausforderungen oder dem Web kannst du dich auf ein oder mehrere Themen im Rahmen der folgenden Bereiche konzentrieren: <br/><br/>Navigation für mobilitätseingeschränkte und sehbehinderte Menschen zu und von unseren Haltestellen, innerhalb unserer Fahrzeuge, etc. Tonnen von offenen Karten, offenen Routing-Diensten, Gits mit offenen Quellcodes sind verfügbar. Es können verschiedene Technologien zum Einsatz kommen. Möchtest du dieses Puzzle lösen? <br/><br/>Erweiterungen der rnv/VRN eTarif App: Was ist dein Traum vom nahtlosen Reisen ohne Ticket? CICO, CIBO, BIBO! Psycho? <br/><br/>Auslastung unserer öffentlichen Verkehrsmittel ermöglicht Varianten zu einer effizienteren Nutzung unserer Fahrzeuge. Aber wie bekommt man die Daten bei einer gegebenen Genauigkeit so günstig wie möglich? Wie kann man die Auslastungvorhersagen? Wie kann man das Kundenverhalten beim Einsatz unserer Fahrzeuge als Win-Win-Situation beeinflussen? Wie kann man....??? Du bist an der Reihe! <br/><br/>Benutzerinformationen selbst: Welche sind die neuesten Trends oder die neuesten Technologien, um unsere Kunden unterwegs oder an einem Standort zu informieren? Welche Informationen können stationäre Monitore und alle Arten von Wearables liefern? Denkezum Beispiel an Mobilitätszentren oder wie ein neues Wohnquartier aussehen soll, wenn keine Pkw mehr im Quartier erlaubt sind?"
          ],
          i18nVision: [
            "We encourage you and strongly believe that you will come up with awesome ideas and thoughts, lovely sketches and scribbles, solutions, prototypes, and demonstrators, we never even dared to dream about before. The sky is the limit!",
            "Wir ermutigen dich und glauben fest daran, dass du fantastische Ideen und Gedanken, schöne Skizzen, Lösungen, Prototypen und Demonstratoren hervorbringen wirst, von denen wir noch nie zuvor geträumt haben. The sky is the limit!"
          ]
        },
        {
          ID: 103,
          type: CHALLENGE_TYPE.CITY,
          expand: false,
          categoryID: 2,
          i18nAuthor: [
            "City of Mannheim • Department of Real Estate Management",
            "Stadt Mannheim • Fachbereich Immobilienmanagement"
          ],
          i18nTitle: [
            "How must a central data management system be technically prepared in order to integrate sensors of real estate management that have not been able to interact so far?",
            "Wie muss ein zentrales Datenmanagementsystem technisch vorbereitet werden, damit bislang nicht interaktionsfähige Sensoren des Immobilienmanagements eingebunden werden können?"
          ],
          i18nSummary: [
            "All technical tasks and functions are integrated in the technical real estate management of the City of Mannheim in order to view the tasks from the perspective of the entire life cycle of a building. The field of building technology consists of 2 teams (heating, air-conditioning and sanitary technology as well as electrical/telecommunications and elevator technology) and the respective workshops.",
            "Im technischen Immobilienmanagement der Stadt Mannheim sind alle technischen Aufgaben und Funktionen gebündelt, um die Aufgaben mit Blick auf den gesamten Lebenszyklus eines Gebäudes zu betrachten. Das Sachgebiet Gebäudetechnik besteht aus 2 Teams (Wärme, Klima- und Sanitärtechnik sowie Elektro-/Fernmelde- und Aufzugstechnik) und den jeweils zugeordneten Werkstätten."
          ],
          i18nDescription: [
            "The following points must be noted when developing the solution:<ul class='list'><li>About 430 buildings are to be integrated in between 2 and 10 sensors.</li><li>The buildings are spread over the whole area of the city of Mannheim.</li><li>Solutions with wireless technology are preferable to wired solutions.</li><li>Cyber Security Standards according to the German Federal Office for Information Security have to be adhered to.</li></ul>",
            "Zur Entwicklung der Lösung müssen folgende Punkte beachtet werden:<ul class='list'><li>Es sollen in etwa 430 Gebäuden zwischen 2 bis zu 10 Sensoren eingebunden wer-den.</li><li>Die Gebäude sind über das gesamte Gebiet der Stadt Mannheim verstreut.</li><li>Lösungen mit Funktechnik sind kabelgebundenen Lösungen vorzuziehen.</li><li>Cyber Security Standards nach Bundesamt für Sicherheit in der Informationstechnik sind zwingend einzuhalten.</li></ul>"
          ],
          i18nVision: [
            "We hope our criterias are well defined, beside that there are really no limits to your imagination in this challenge.",
            "Wir hoffen unsere Kriterien sind gut definiert, davon abgesehen sind deiner Phantasie in dieser Challenge wirklich keine Grenzen gesetzt."
          ]
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Challenges",
    "intro": "Here you will find a list of all categories for which challenges can be offered, highlighted in green the categories for which at least one challenge already exists. Why is this important? At the Climathon you have to decide as a team for <strong>ONE CHALLENGE</strong> on which you want to work and at the end submit your solution. Only in a few exceptions where it makes sense, a solution for <strong>two</strong> challenges can be offered.",
    "titleSubmit": "Submit your own challenge",
    "submitText": "I bet you can come up with something so much more innovative than we do! Go ahead and submit your own challenge to complete our puzzle – if we agree with it, it will be listed on this side as well. This also means that other teams can work on solutions for your challenge, even if you decide spontaneously for another challenge.",
    "submitDeadline": "Submit deadline is Friday 25. Oct 15:00",
    "submitInfo": "PLEASE NOTE THAT NO FURTHER CHALLENGES CAN BE SUBMITTED. There are already enough good challenges online, so we decided not to accept any more challenges. If you disagree and think that we should accept yours, please send us an email.",
    "button": {
      "link2Form": "Open submit form",
      "close": "Close"
    },
    "challengeCount": "Processing at Climathon 2020 | one challenge | {count} challenges",
    "challangeSummary": "Summary",
    "challangeDescription": "Status quo & Resources",
    "challangeVision": "Vision & Outcome",
    "categories": {
      "smartCity": {
        "title": "Smart City",
        "description": "Smart City is the supreme discipline for holistic development concepts aimed at making cities more efficient, technologically advanced, greener and more socially inclusive. These concepts include technical, economic and societal innovations that combine modern technologies in the fields of energy, mobility, urban planning, administration and communications. All with the aim of maximising the city’s sustainability potential and improving the quality of life for its inhabitants."
      },
      "mobility": {
        "title": "Mobility",
        "description": "Until now, the transport industry has been the most resistant to emissions progress. At the same time, cities are key in tackling this challenge as they are faced with the mobility trilemma of clean air, carbon, and congestion whilst facing ever increasing demands to move people and goods around."
      },
      "retrofitting": {
        "title": "Retrofitting",
        "description": "Buildings play a crucial role in mitigating climate change and are directly linked to the resilience of future neighbourhoods, districts, and cities. There is an urgent need for cities to bring about a significant increase in current retrofit rates to realise the „well below two degrees“ Paris goal."
      },
      "circularEconomy": {
        "title": "Circular Economy",
        "description": "Traditional linear economy supports short-sighted design, conspicuous consumption, and inefficient waste handling. Cities are prime candidates for pioneering a new, long-term vision: The circular economy—which integrates sustainable production across supply chains as well as better consumption."
      },
      "food": {
        "title": "Food",
        "description": "World food production needs to double by 2050 to cater to population growth, while also dealing with the impacts of climate change. The need to develop integrated and sustainable urban food systems, including value chains and consumer behaviour, is an urgent call to action for cities."
      },
      "finance": {
        "title": "Climate Finance",
        "description": "In cities, the funding gap for sustainable infrastructure is $93 trillion globally over the next 15 years. Focusing on promising investment vehicles as well as project preparation and capacity building will allow investors to be matched to bankable green assets in cities."
      },
      "behaviour": {
        "title": "Human Behaviour",
        "description": "Citizen behaviour is largely responsible for current trends in global climate change. Hence, changing unsustainable consumption and production patterns unlocks a crucial climate impact potential."
      },
      "water": {
        "title": "Water Management",
        "description": "Cities face increasing water challenges due to climate change. Water utilities, such as drinking water infrastructure, wastewater and drainage can be damaged by storms, sea level rise, and unsustainable policies. Climate change also causes water shortage, affecting over 150 million people globally."
      },
      "energy": {
        "title": "Energy",
        "description": "Cities consume 78% of the world’s energy and produce 60% of its emissions. As urban population increases worldwide, cities are crucial to emission reduction efforts."
      },
      "extremeWeather": {
        "title": "Extreme Weather",
        "description": "In the last decades, extreme climate events, such as heat waves, cold waves, intense storms. and droughts have become more frequent and intense. Further increases are expected to occur at unprecedented levels therefore resilience development is an urgent need for all cities."
      },
      "waste": {
        "title": "Waste Management",
        "description": "As cities face pressure to improve resource management efficiency, confront rising energy prices, and are running out of landfill space, reducing or avoiding waste generation becomes increasingly important. Waste management could improve the emissions of all sectors of the economy."
      },
      "pollution": {
        "title": "Air Pollution",
        "description": "More than 80% of people living in urban areas are exposed to poor air quality. Reducing air pollution should be a priority to all cities, not just for decreasing the negative effects of climate change, but for citizens’ health as well."
      }
    }
  },
  "de": {
    "title": "Herausforderungen",
    "intro": "Hier findest du aufgelistet alle Kategorien zu denen Challenges angeboten werden können, grün hervorgehoben die Kategorien zu denen bereits mind. eine Challenge existiert. Warum das wichtig ist? Auf dem Climathon musst du dich als Team für <strong>EINE CHALLENGE</strong> entscheiden an der du arbeiten möchtest und am Ende deine Lösung zu einreichst. Nur in wenigen Ausnahmen bei denen es Sinn macht, kann eine Lösung für <strong>zwei</strong> Challenges angeboten werden.",
    "titleSubmit": "Reichen Sie Ihre eigene Herausforderung ein",
    "submitText": "Ich wette, du kannst dir etwas so viel Innovativeres einfallen lassen als wir! Reiche deine eigene Herausforderung ein – wenn wir diese genehmigen, wird diese auch auf der Climathon Seite aufgeführt. Das bedeutet auch, dass andere Teams an Lösungen für deine Herausforderung arbeiten können, auch wenn du dich auf dem Event spontan für eine andere Herausforderung entscheiden solltest.",
    "submitDeadline": "Einsendeschluss ist Freitag, der 25. Okt 15:00",
    "submitInfo": "ACHTUNG, ES KÖNNEN KEINE WEITEREN CHALLENGES MEHR EINGEREICHT WERDEN. Es sind bereits ausreichend viele gute Challenges online, daher haben wir beschlossen keine neuen Challenges mehr anzunehmen. Wenn du anderer Meinung bist und glaubst, dass wir genau deine doch noch annehmen sollen, schreibe uns gerne ein Mail.",
    "button": {
      "link2Form": "Formular öffnen",
      "close": "Schliessen"
    },
    "challengeCount": "Bearbeitung beim Climathon 2020 | eine Herausforderung | {count} Herausforderungen",
    "challangeSummary": "Zusammenfassung",
    "challangeDescription": "Status quo & Ressourcen",
    "challangeVision": "Vision & Ergebnis",
    "categories": {
      "smartCity": {
        "title": "Smart City",
        "description": "Smart City ist die Königsdisziplin für ganzheitliche Entwicklungskonzepte, die darauf abzielen, Städte effizienter, technologisch fortschrittlicher, grüner und sozialer zu gestalten. Dazu gehören technische, wirtschaftliche und gesellschaftliche Innovationen, die moderne Technologien in den Bereichen Energie, Mobilität, Stadtplanung, Verwaltung und Kommunikation kombinieren. Mit dem Ziel, das Nachhaltigkeitspotenzial der Stadt zu maximieren und die Lebensqualität ihrer Bewohner zu verbessern."
      },
      "mobility": {
        "title": "Mobilität",
        "description": "Bislang war die Transportindustrie am widerstandsfähigsten gegen den Fortschritt bei den Emissionen. Gleichzeitig sind die Städte entscheidend für die Bewältigung dieser Herausforderung, da sie mit dem Mobilitäts-Trilemma aus sauberer Luft, Kohlenstoff und Staus konfrontiert sind und gleichzeitig mit immer höheren Anforderungen an den Transport von Menschen und Gütern konfrontiert sind."
      },
      "retrofitting": {
        "title": "Nachrüstung",
        "description": "Gebäude spielen eine entscheidende Rolle bei der Eindämmung des Klimawandels und stehen in direktem Zusammenhang mit der Widerstandsfähigkeit zukünftiger Quartiere, Bezirke und Städte. Es ist dringend erforderlich, dass die Städte die derzeitigen Nachrüstraten deutlich erhöhen, um das Pariser Ziel „deutlich unter zwei Grad“ zu erreichen."
      },
      "circularEconomy": {
        "title": "Zirkuläre Ökonomie",
        "description": "Die traditionelle lineare Ökonomie unterstützt kurzsichtiges Design, auffälligen Verbrauch und ineffiziente Abfallbehandlung. Städte sind erstklassige Kandidaten für die Entwicklung einer neuen, langfristigen Vision: Die Kreislaufwirtschaft – welche eine nachhaltige Produktion sowie einen besseren Verbrauch über die gesamte Lieferketten hinweg integriert."
      },
      "food": {
        "title": "Nahrung",
        "description": "Die weltweite Nahrungsmittelproduktion muss sich bis 2050 verdoppeln, um dem Bevölkerungswachstum gerecht zu werden und gleichzeitig muss sie die Auswirkungen auf den Klimawandel bewältigen. Die Notwendigkeit, integrierte und nachhaltige städtische Ernährungssysteme, einschließlich Wertschöpfungsketten und Verbraucherverhalten, zu entwickeln, ist ein dringender Handlungsbedarf für Städte."
      },
      "finance": {
        "title": "Klimafinanzierung",
        "description": "In den Städten beträgt die Finanzierungslücke für nachhaltige Infrastruktur in den nächsten 15 Jahren weltweit 93 Billionen Dollar. Die Fokussierung auf vielversprechende Investitionsvehikel sowie die Vorbereitung von Projekten und der Aufbau von Kapazitäten können es den Investoren ermöglichen, bankfähige grüne Vermögenswerte in Städten zu erwerben."
      },
      "behaviour": {
        "title": "Menschliches Verhalten",
        "description": "Das Verhalten der Bürger ist weitgehend für die aktuellen Trends des globalen Klimawandels verantwortlich. Die Veränderung nicht nachhaltiger Konsum- und Produktionsmuster erschließt daher ein entscheidendes Klimafolgenpotenzial."
      },
      "water": {
        "title": "Wasserwirtschaft",
        "description": "Die Städte sind aufgrund des Klimawandels mit wachsenden Wasserproblemen konfrontiert. Wasserwerke wie Trinkwasserinfrastruktur, Abwasser und Entwässerung können durch Stürme, Meeresspiegelanstieg und nicht nachhaltige Maßnahmen beschädigt werden. Der Klimawandel verursacht auch Wasserknappheit, von der weltweit über 150 Millionen Menschen betroffen sind."
      },
      "energy": {
        "title": "Energie",
        "description": "Städte verbrauchen 78% der weltweiten Energie und sind verantwortlich für 60% der Emissionen. Da die städtische Bevölkerung weltweit zunimmt, sind Städte entscheidend für die Bemühungen zur Emissionsreduzierung."
      },
      "extremeWeather": {
        "title": "Extremwetter",
        "description": "In den letzten Jahrzehnten sind extreme Wetterereignisse wie Hitzewellen, Kältewellen, intensive Stürme und Dürren häufiger und intensiver geworden. Es wird erwartet, dass es zu weiteren Zunahmen in noch nie dagewesenem Ausmaß kommen wird, weshalb die Entwicklung der Widerstandsfähigkeit für alle Städte ein dringender Bedarf ist."
      },
      "waste": {
        "title": "Abfallwirtschaft",
        "description": "Da die Städte unter Druck stehen, die Effizienz des Ressourcenmanagements zu verbessern, den steigenden Energiepreisen zu begegnen und die Deponieräume knapp werden, wird die Reduzierung oder Vermeidung von Abfall immer wichtiger. Die Abfallwirtschaft könnte die Emissionen aller Wirtschaftssektoren verbessern."
      },
      "pollution": {
        "title": "Luftverschmutzung",
        "description": "Mehr als 80% der Menschen in städtischen Gebieten sind einer schlechten Luftqualität ausgesetzt. Die Verringerung der Luftverschmutzung sollte für alle Städte eine Priorität sein, nicht nur zur Verringerung der negativen Auswirkungen des Klimawandels, sondern auch für die Gesundheit der Bürger."
      }
    }
  }
}
</i18n>

<!-- global rules -->
<style lang="stylus">
.v-dialog--fullscreen {
  background-color: #2f3a58;
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

  .stack-grid-item {
    transition: all 300ms;

    .card {
      cursor: pointer;
    }
  }

  .submitArea {
    h2 {
      margin-bottom: 32px;
    }

    .submitText {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }

    .submitDeadline {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: normal;
      text-transform: uppercase;
      text-align: center;
      color: #dd543b;
    }

    .submitInfo {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: normal;
      text-align: center;
      color: #dd543b;
    }
  }

  .submitInfo {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: normal;
    text-transform: uppercase;
    text-align: center;
    color: #FFC533;
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

.challenge, .v-expansion-panel.challenge {
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

  h5 {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }

  .count {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    // TODO: replace with constants
    color: rgba(255, 255, 255, 0.38);
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

  p {
    font-family: Roboto Condensed, sans-serif;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);

    &.author {
      font-weight: 600;
    }

    &.author.city {
      color: #DD543B;
    }

    &.author.community {
      color: #A8E5A3;
    }

    &.author.sponsor {
      color: #70B4DF;
    }
  }
}

/* OLD CATEGORIES
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

  .count {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.4;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    // TODO: replace with constants
    color: rgba(255, 255, 255, 0.38);
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

  .challenge {
    .batch:before {
      content: '';
      height: 1px;
      width: calc(50% - 100px);
      position: absolute;
      top: 30px;
      left: 0;
    }

    .batch:after {
      content: '';
      height: 1px;
      width: calc(50% - 100px);
      position: absolute;
      top: 30px;
      right: 0;
    }

    .batch.city {
      &:before, &:after {
        background: #DD543B;
      }
    }

    .batch.community {
      &:before, &:after {
        background: #A8E5A3;
      }
    }

    .batch.sponsor {
      &:before, &:after {
        background: #70B4DF;
      }
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

    h5 {
      font-family: Roboto Condensed, sans-serif;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }

    p {
      font-family: Roboto Condensed, sans-serif;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);

      &.author {
        font-weight: 600;
      }

      &.author.city {
        color: #DD543B;
      }

      &.author.community {
        color: #A8E5A3;
      }

      &.author.sponsor {
        color: #70B4DF;
      }
    }
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

  &.active-challenges {
    div.count {
      // TODO: replace with constants
      color: #a8e5a3;
    }
  }
}
*/
</style>
