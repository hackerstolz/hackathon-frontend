<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t('title') }}</h2>
    </v-container>
    <ClientOnly>
      <!--
      <video-bg
        ref="videobg"
        class="video-container"
        :sources="[
          require('!file-loader!../../assets/video/mafinex-footage.webm'),
          require('!file-loader!../../assets/video/mafinex-footage.ogv'),
          require('!file-loader!../../assets/video/mafinex-footage.mp4'),
        ]"
        :img="require('../../assets/video/mafinex-footage.jpg')"
      >
      -->
        <div
          class="shade-top"
          :style="{
            'background-image': `linear-gradient(to top, rgba(16, 24, 47, 0), ${sectionColor})`,
          }"
        ></div>
        <v-layout          
          class="virtual video-content flex align-center py-5"
          fill-height
          column
        >
          <h3 class="align-left">{{ $t('locationSlogan') }}</h3>
          <!-- <v-flex xs12 align-end> -->
          <v-spacer />
          
          <h3 class="align-left">{{ $t('locationDescription') }}</h3>
          <!--
          <v-icon class="pa-1" color="rgba(255, 255, 255, 0.38)" x-large
            >place</v-icon
          >
          <p class="location-text pa-1">
            ONLINE only
            
            <br />&
            <br />MAFINEX-Technologiezentrum
            <br />Julius-Hatry-Str. 1 <br />68163 Mannheim 
          </p>
          <v-btn
            class="my-2"
            width="auto"
            href="https://www.google.com/maps/place/mg:+mannheimer+gr%C3%BCndungszentren+gmbh/@49.4732698,8.4747424,15z/data=!4m5!3m4!1s0x0:0x9a435721e6fc738d!8m2!3d49.4732698!4d8.4747424"
            target="_blank"
            color="rgba(255, 255, 255, 0.8)"
            outlined
            text
          >         
            {{ $t('button.link2Maps') }}
            <v-icon dark right>open_in_new</v-icon>
          </v-btn>
          -->  
          <!-- </v-flex> -->
        </v-layout>
        <div
          class="shade-bottom"
          :style="{
            'background-image': `linear-gradient(to bottom, rgba(24, 36, 69, 0), ${sectionColor})`,
          }"
        ></div>
      <!--</video-bg> -->
    </ClientOnly>
  </section>
</template>

<script>
export default {
  name: 'Location',
  components: {
    VideoBg: () =>
      import('vue-videobg')
        .then((m) => m)
        .catch(),
  },
  props: {
    themeColor: {
      type: String,
      default: 'primary',
    },
  },
  mounted() {
    // set video to play in slow motion
    //this.$refs.videobg.$refs.video.playbackRate = 1 // 0.5;
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme.themes.dark).indexOf(
        this.themeColor
      ) !== -1
        ? this.$vuetify.theme.themes.dark[this.themeColor]
        : this.$vuetify.theme.themes.dark.primary
    },
  },
}
</script>

<i18n>
{
  "en": {
    "title": "Location",
    "locationSlogan": "This year due to the current situation unfortunately only virtual!",
    "locationDescription": "We will use Google Meets, provide a Slack Workspace and will be able to use some Mural licenses.",
    "button": {
      "link2Maps": "Open in maps"
    }
  },
  "de": {
    "title": "Standort",
    "locationSlogan": "Dieses Jahr aufgrund der aktuellen Situation leider nur virtuell!",
    "locationDescription": "Wir werden Google Meets nutzen, einen Slack Workspace bereitstellen sowie ein paar Mural Lizenzen nutzen können.",
    "button": {
      "link2Maps": "In Karten öffnen"
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
  
  .virtual{
   color: #ffc533;
  }

  .video-container {
    .shade-top {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      content: '';
      width: 100%;
      height: 30%;
    }

    .shade-bottom {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      width: 100%;
      height: 30%;
    }

    .video-content {
      position: relative;
      z-index: 2;

      h3 {
        max-width: 640px;
        margin: 0 auto;
        font-family: Gagalin, sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 70px;
        line-height: 1;
        letter-spacing: 3.5px;
        text-align: center;
        color: rgba(255, 255, 255, 1);

        @media screen and (max-width: 600px) {
          font-size: 32px;
        }
      }

      .location-text {
        // TODO: font seems not to be available on mobile
        font-family: Roboto;
        font-weight: 900;
        font-size: 28px;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: 6px;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);

        @media screen and (max-width: 600px) {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
