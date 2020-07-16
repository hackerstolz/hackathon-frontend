<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
      <p class="intro my-5" v-html="$t('intro')"></p>

      <v-row justify="center">
        <v-expansion-panels popout :value="challengeOpen">
          <v-expansion-panel
            :id="`challenge-${challenge.id}`"
            class="challenge"
            v-for="({ node: challenge }, i) in $props.challenges"
            :key="i"
          >
            <v-expansion-panel-header
              class="challenge-head"
              color="rgba(255,255,255,0.1)"
              ripple
            >
              <v-layout column>
                <h3 class="mb-3">
                  {{
                    $t(
                      `getI18nNode(challenge.category.titles, $i18n.locale).title`
                    )
                  }}
                </h3>
                <v-img
                  :src="challenge.category.image || require('../../../static/placeholder.svg')"
                  max-height="128px"
                  contain
                ></v-img>
                <p
                  :class="{
                    author: true,
                    [challenge.type.title.toLowerCase()]: true,
                    'my-4': true
                  }"
                  v-html="getI18nNode(challenge.author, $i18n.locale).author"
                ></p>
                <h4
                  class="mb-4"
                  v-html="getI18nNode(challenge.titles, $i18n.locale).title"
                ></h4>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="challenge-content"
              color="rgba(255,255,255,0.1)"
            >
              <v-layout column>
                <v-img
                  :class="{
                    batch: true,
                    [challenge.type.title.toLowerCase()]: true,
                    'my-5': true
                  }"
                  :src="
                    require(`../../assets/challenge-${challenge.type.title.toLowerCase()}.svg`)
                  "
                  max-height="84px"
                  contain
                ></v-img>
                <div
                  class="markdown my-4"
                  v-html="
                    formatMarkdown(
                      getI18nNode(challenge.descriptions, $i18n.locale)
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

const CHALLENGE_TYPE = {
  CITY: 'CITY',
  COMMUNITY: 'COMMUNITY',
  SPONSOR: 'SPONSOR'
}

export default {
  name: 'Challenges',
  props: {
    themeColor: {
      type: String,
      default: 'primary'
    },
    isMobile: Boolean,
    challenges: Array
  },
  mounted() {
    this.routeUpdate(this.$route)
  },
  computed: {
    categoriesSorted() {
      return clone(this.categories).sort(
        (a, b) => b.challenges.length - a.challenges.length
      )
    },
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
    getCategoryImg(categoryName) {
      const { img } = this.getCategory(categoryName)
      return img
    },
    getCategoryKey(categoryName) {
      return categoryName
        .split(' ')
        .join('-')
        .toLowerCase()
    },
    getCategory(categoryName) {
      return (
        find(this.categories, {
          key: this.getCategoryKey(categoryName)
        }) || {}
      )
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
      const validChallenge =
        query.challenge &&
        document.getElementById(`challenge-${query.challenge}`)

      // scroll to and display challenge if defined
      if (validChallenge) {
        this.$scrollTo(`#challenge-${query.challenge}`)
        this.expandChallenge(query.challenge)
      }
    },
    expandChallenge(challengeID) {
      this.challenges.forEach((c, i) =>
        c.ID.toString() === challengeID.toString()
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
      categories: [
        {
          key: 'smart-city',
          img: require('../../assets/icons/flat-icon-smartCity.svg')
        },
        {
          key: 'mobility',
          img: require('../../assets/icons/flat-icon-mobility.svg')
        },
        {
          key: 'retrofitting',
          img: require('../../assets/icons/flat-icon-retrofitting.svg')
        },
        {
          key: 'circular-economy',
          img: require('../../assets/icons/flat-icon-circularEconomy.svg')
        },
        {
          key: 'food',
          img: require('../../assets/icons/flat-icon-food.svg')
        },
        {
          key: 'finance',
          img: require('../../assets/icons/flat-icon-finance.svg')
        },
        {
          key: 'behaviour',
          img: require('../../assets/icons/flat-icon-behaviour.svg')
        },
        {
          key: 'water',
          img: require('../../assets/icons/flat-icon-water.svg')
        },
        {
          key: 'energy',
          img: require('../../assets/icons/flat-icon-energy.svg')
        },
        {
          key: 'extreme-weather',
          img: require('../../assets/icons/flat-icon-extremeWeather.svg')
        },
        {
          key: 'waste',
          img: require('../../assets/icons/flat-icon-waste.svg')
        },
        {
          key: 'pollution',
          img: require('../../assets/icons/flat-icon-pollution.svg')
        }
      ]
    }
  }
}
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
      "smart-city": {
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
      "circular-economy": {
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
      "extreme-weather": {
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
      "smart-city": {
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
      "circular-economy": {
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
      "extreme-weather": {
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

    p {
      font-family: Roboto Condensed, sans-serif;
      font-size: 20px;
      line-height: 1.4;
      letter-spacing: 1px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);

      &.author {
        font-weight: 600;
        &.city-challenge {
          color: #DD543B;
        }
        &.technology {
          color: #70B4DF;
        }
      }
    }

    .batch {
      position: relative;
      :before {
        content: " ";
        width: calc(50% - 100px);
        height: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        top: 50%;
        left: 0px;
        position: absolute;
        display: block;
      }
      :after {
        content: " ";
        width: calc(50% - 100px);
        height: 1px;
        background-color: rgba(255, 255, 255, 0.8);
        top: 50%;
        right: 0px;
        position: absolute;
        display: block;
      }
      &.city-challenge {
        :before {
          background-color: #DD543B;
        }
        :after {
          background-color: #DD543B;
        }
      }
      &.technology {
        :before {
          background-color: #70B4DF;
        }
        :after {
          background-color: #70B4DF;
        }
      }
    }
  }
}
</style>
