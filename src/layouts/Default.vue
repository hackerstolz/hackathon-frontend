<template>
  <div id="default-layout">
    <v-app :dark.sync="darkMode">
      <v-navigation-drawer class="navigation" app v-model="drawer">
        <v-toolbar class="ma-0 pa-0" color="transparent" flat>
          <v-menu bottom>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">{{ $t(`button.${$i18n.locale}`) }}</v-btn>
            </template>

            <v-list class="language-list">
              <v-list-item v-for="(lang, i) in langs" :key="i" @click="setNewLocale(lang)">
                <v-list-item-title>{{ $t(`label.${lang}`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer />
          <v-btn text @click.stop="drawer = !drawer" icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-layout row>
          <v-btn
            color="info"
            href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
            text
          >{{ $t('button.contactus') }}</v-btn>
        </v-layout>
        <v-list v-if="$route.path !== '/event'">
          <template v-for="(item, i) in menu">
            <v-list-item v-scroll-to="`#${item}`" :key="item" ripple @click="() => {}">
              <v-list-item-title class="menu-item">
                {{
                $t(`label.${item}`)
                }}
              </v-list-item-title>
            </v-list-item>
            <v-divider v-if="i < menu.length - 1" :key="i" inset />
          </template>
        </v-list>
        <v-list v-if="$route.path === '/event'">
          <template v-for="(item, i) in menuEvent">
            <v-list-item v-scroll-to="`#${item}`" :key="item" ripple @click="() => {}">
              <v-list-item-title class="menu-item">
                {{
                $t(`label.eventMenu.${item}`)
                }}
              </v-list-item-title>
            </v-list-item>
            <v-divider v-if="i < menu.length - 1" :key="i" inset />
          </template>
        </v-list>
        <g-link :to="$route.path !== '/event' ? '/event' : '/'">
          <v-btn color="success" width="100%" raised @click="() => {}">
            {{
            $route.path !== '/event'
            ? $t('button.toEvent')
            : $t('button.toOverview')
            }}
            <v-icon right>
              {{
              $route.path !== '/event' ? 'room' : 'public'
              }}
            </v-icon>
          </v-btn>
        </g-link>
      </v-navigation-drawer>

      <v-app-bar class="toolbar" app color="transparent" flat :hide-on-scroll="isMobile">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn
          class="hashtag"
          text
          outlined
          ripple
          small
          v-clipboard:copy="'#climathonMA'"
          v-clipboard:success="
            () => copySuccess($t('label.hashtagCopySuccess'))
          "
          @click="() => {}"
        >#climathonMA</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :class="{ 'app-btn-register': true, large: !isMobile }"
          color="info"
          href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
          text
          :icon="isMobile"
        >
          {{ isMobile ? null : $t('button.contactus') }}
          <v-icon v-if="isMobile">email</v-icon>
        </v-btn>
        <v-btn
          v-if="$route.path !== '/event' && !postEvent"
          :class="{ 'app-btn-register': true, large: !isMobile }"
          color="success"
          :small="isMobile"
          v-scroll-to="'#registration'"
        >{{ isMobile ? $t('button.registerShort') : $t('button.register') }}</v-btn>
      </v-app-bar>

      <v-content class="pa-0">
        <slot />
      </v-content>

      <v-snackbar
        class="snackbar"
        top
        v-model="notification.show"
        :color="notification.color"
        :multi-line="isMobile"
        :vertical="isMobile"
        :timeout="notification.timeout"
      >
        {{ notification.text }}
        <v-btn
          class="app-btn-snackbar"
          color="primary"
          dark
          text
          @click="notification.show = false"
        >{{ $t('label.snackbarClose') }}</v-btn>
      </v-snackbar>
      <v-snackbar
        class="snackbar"
        v-model="snackbar.show"
        :color="snackbar.color"
        :multi-line="isMobile"
        :vertical="isMobile"
        :timeout="snackbar.timeout"
      >
        {{ `${$t('label.snackbarText')}&nbsp;✌️` }}
        <v-btn
          class="app-btn-snackbar"
          color="primary"
          dark
          text
          @click="snackbar.show = false"
        >{{ $t('label.snackbarConfirm') }}</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { getUrlHashQuery as getQuery } from "../i18n";
import { setTimeout } from "timers";

export default {
  name: "DefaultLayout",
  props: {
    isMobile: Boolean
  },
  metaInfo() {
    htmlAttrs: {
      lang: this.$root.$i18n.locale;
    }
  },
  data() {
    return {
      postEvent: true,
      langs: ["en", "de"],
      darkMode: true,
      drawer: false,
      snackbar: {
        show: false,
        color: "success",
        timeout: 10000
      },
      notification: {
        show: false,
        color: "success",
        timeout: 3000,
        text: ""
      },
      menu: [
        "intro",
        "about",
        "challenges",
        "awards",
        "teams",
        "location",
        "schedule",
        "registration",
        "staff",
        "faq",
        "parties",
        "team",
        "footer"
      ],
      menuEvent: ["info", "location", "bag", "footer"]
    };
  },
  mounted() {
    setTimeout(() => {
      // show snackbar with delay
      this.snackbar.show = true;
    }, 500);

    setTimeout(() => {
      // nav to section initially
      if (this.$route) {
        this.routeUpdate();
      }
    }, 1500);
  },
  methods: {
    copySuccess(text) {
      this.notification.text = text;
      this.notification.show = true;
    },
    setNewLocale(lang) {
      // switch locale
      this.$root.$i18n.locale = lang;

      // switch vuetify locale
      this.$vuetify.lang.current = lang;

      // a11y: ensures the lang attribute of the <html> element has a valid value
      document.querySelector("html").setAttribute("lang", lang);
    },
    routeUpdate() {
      const query = getQuery() || {};

      // scroll to section if defined
      if (query.section && document.getElementById(query.section)) {
        this.$scrollTo(`#${query.section}`);
      }

      // switch language
      if (query.lang && query.lang !== this.$root.$i18n.locale) {
        this.setNewLocale(query.lang);
      }
    }
  },
  watch: {
    $route() {
      this.routeUpdate();
    }
  }
};
</script>

<i18n>
{
  "en": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "snackbarClose": "Close",
      "hashtagCopySuccess": "You just copied '#climathonMA'.",
      "en": "English",
      "de": "German",
      "intro": "Intro",
      "about": "About Climathon",
      "challenges": "Challenges",
      "awards": "Awards",
      "teams": "Teams",
      "location": "Event Location",
      "schedule": "Event Schedule",
      "registration": "Registration",
      "staff": "Speakers, Jury & Mentors",
      "faq": "FAQ",
      "parties": "Sponsors & Partners",
      "team": "Orga Team",
      "footer": "Credits",
      "eventMenu": {
        "info": "Infos at a glance",
        "location": "Room plan",
        "bag": "Event-Bag",
        "footer": "Credits"
      }
    },
    "button": {
      "en": "Language • EN",
      "de": "Language • DE",
      "register": "Register Here",
      "registerShort": "Register",
      "contactus": "Contact us",
      "donate": "Donate",
      "toEvent": "On-Event App",
      "toOverview": "Climathon Overview"
    }
  },
  "de": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "snackbarClose": "Schließen",
      "hashtagCopySuccess": "Du hast \"#climathonMA\" kopiert.",
      "en": "Englisch",
      "de": "Deutsch",
      "intro": "Intro",
      "about": "Über den Climathon",
      "challenges": "Herausforderungen",
      "awards": "Auszeichnungen",
      "teams": "Teams",
      "location": "Austragungsort",
      "schedule": "Eventablauf",
      "registration": "Registrierung",
      "staff": "Referenten, Jury & Mentoren",
      "faq": "FAQ",
      "parties": "Sponsoren & Partner",
      "team": "Orga-Team",
      "footer": "Credits",
      "eventMenu": {
        "info": "Infos auf einem Blick",
        "location": "Raumplan",
        "bag": "Veranstaltungstasche",
        "footer": "Credits"
      }
    },
    "button": {
      "en": "Sprache • EN",
      "de": "Sprache • DE",
      "register": "Hier Registrieren",
      "registerShort": "Registrieren",
      "contactus": "Kontaktiere uns",
      "donate": "Spenden",
      "toEvent": "On-Event App",
      "toOverview": "Climathon Übersicht"
    }
  }
}
</i18n>

<style lang="stylus">
#default-layout {
  .toolbar {
    z-index: 5;

    .hashtag {
      font-family: Roboto Condensed, sans-serif;
      font-weight: 600;
      text-transform: none;
    }

    .app-btn-contact {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 1.5px;

      &.large {
        font-size: 22px;
      }
    }

    .app-btn-register {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 1.5px;

      &.large {
        font-size: 22px;
      }
    }
  }

  .navigation {
    z-index: 10;
    background-color: #10182F;

    .menu-item {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 1.5px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .language-list {
    background-color: #182445;
  }

  .snackbar {
    font-family: Roboto Condensed, sans-serif;
    font-weight: 600;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.8);

    .app-btn-snackbar {
      font-family: Gagalin, sans-serif;
      font-weight: 400;
      font-style: normal;
      letter-spacing: 1.5px;
    }
  }

  /*
   * Styles fo v-html content elements.
   */
  a {
    text-decoration: none;
    color: #70B4DF;
  }

  a:-webkit-any-link {
    text-decoration: none;
    color: #70B4DF;
  }

  a.link {
    text-decoration: none;
    color: #70B4DF !important;
  }

  ul.list {
    li {
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

  // override max width of other media queries
  .container {
    max-width: 1000px;
  }
}
</style>
