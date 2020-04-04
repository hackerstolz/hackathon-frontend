<template>
  <Layout>
    <Intro v-if="$page && $page.hackathon" id="intro" :hackathon="$page.hackathon" />
    <About id="about" themeColor="primary" :isMobile="isMobile" />
    <Challenges
      v-if="$page && $page.allChallenge"
      id="challenges"
      themeColor="secondary"
      :isMobile="isMobile"
      :challenges="$page.allChallenge.edges"
    />
    <Awards
      v-if="$page && $page.hackathon && $page.hackathon.awards.length > 0"
      id="awards"
      themeColor="primary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
      :challenges="$page.allChallenge.edges"
    />
    <!-- TODO: complete team overview -->
    <TeamOverview v-if="isEventOver" id="teams" themeColor="primary" :isMobile="isMobile" />
    <Location id="location" themeColor="secondary" />
    <Schedule
      v-if="$page && $page.allTimetable"
      id="schedule"
      themeColor="secondary"
      :isMobile="isMobile"
      :timetable="$page.allTimetable.edges"
    />
    <Registration
      v-if="!isEventOver && $page && $page.hackathon"
      id="registration"
      themeColor="primary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
    />
    <Staff
      v-if="$page && $page.allPerson && $page.hackathon"
      id="staff"
      themeColor="secondary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
      :speakers="allSpeakers"
      :mentors="allMentors"
      :judges="allJudges"
    />
    <FAQ
      v-if="$page && $page.hackathon"
      id="faq"
      themeColor="primary"
      :faqs="$page.hackathon.faqs || []"
    />
    <Parties
      v-if="$page && $page.allPartner && $page.hackathon"
      id="parties"
      themeColor="secondary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
      :sponsors="allSponsors"
      :partners="allPartners"
    />
    <Organizer
      v-if="$page && $page.allPartner && $page.hackathon"
      id="team"
      themeColor="primary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
      :organizers="allOrganizers"
    />
    <Footer
      v-if="$page && $page.hackathon"
      id="footer"
      themeColor="primary"
      :isMobile="isMobile"
      :hackathon="$page.hackathon"
    />
  </Layout>
</template>

<script>
const sectionsContext = require.context(
  "../components/sections/",
  false,
  /.*\.vue$/
);

export default {
  name: "Overview",
  metaInfo() {
    return {
      title: this.$page.hackathon.title,
      meta: [
        // OPEN GRAPH (e.g. Facebook)
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: `https://climathon.hackerstolz.de/${this.$page.hackathon.id}`
        },
        { property: "og:site_name", content: this.$page.hackathon.title },
        { property: "og:title", content: this.$page.hackathon.title },
        {
          property: "og:description",
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          property: "og:image",
          content: this.$page.hackathon.thumbnail
        },

        // TWITTER
        { name: "twitter:title", content: this.$page.hackathon.title },
        {
          name: "twitter:description",
          content: this.getI18nNode(
            this.$page.hackathon.descriptions,
            this.$i18n.locale
          ).description
        },
        {
          name: "twitter:image",
          content: this.$page.hackathon.thumbnail
        },
        { name: "twitter:image:alt", content: this.$page.hackathon.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: this.$page.hackathon.twitter }
      ]
    };
  },
  components: {
    ...sectionsContext.keys().reduce(
      (map, key) => ({
        ...map,
        [sectionsContext(key).default.name]: sectionsContext(key).default
      }),
      {}
    )
  },
  props: {
    isMobile: Boolean
  },
  methods: {
    getI18nNode(i18nNodes = [], lang) {
      const locale = lang.toUpperCase();
      const [i18nNode = {}] = i18nNodes.filter(
        n => n.language === locale || n.language === locale.split("-"[0])
      ) || [{}];

      return i18nNode;
    }
  },
  computed: {
    defaultHackathon() {
      const defaultHackathons = this.$static.allHackathon.edges || [
        { node: {} }
      ];
      const [{ node: defaultHackathon }] = defaultHackathons;

      return defaultHackathon || {};
    },
    isEventOver() {
      const endTime = this.$page
        ? new Date(parseInt(this.$page.hackathon.to, 10) * 1000).getTime()
        : 0;
      const isTimeInPast = new Date().getTime() - endTime >= 0;

      return isTimeInPast;
    },
    allSpeakers() {
      return this.$page && this.$page.allPerson
        ? this.$page.allPerson.edges
            .filter(({ node }) =>
              node.roles.some(({ role }) => role.title === "Speaker")
            )
            .map(({ node }) => node)
        : [];
    },
    allMentors() {
      const allMentors =
        this.$page && this.$page.allPerson
          ? this.$page.allPerson.edges
              .filter(({ node }) =>
                node.roles.some(({ role }) =>
                  [
                    "Technology Mentor",
                    "Challenge Mentor",
                    "Pitch Trainer"
                  ].includes(role.title)
                )
              )
              .map(({ node }) => node)
          : [];
      let allMentorRoles = [];

      for (const mentor of allMentors) {
        for (const role of mentor.roles) {
          if (
            ["Technology Mentor", "Challenge Mentor", "Pitch Trainer"].includes(
              role.role.title
            )
          ) {
            allMentorRoles.push({
              ...mentor,
              roles: [role]
            });
          }
        }
      }

      return allMentorRoles;
    },
    allJudges() {
      return this.$page && this.$page.allPerson
        ? this.$page.allPerson.edges
            .filter(({ node }) =>
              node.roles.some(({ role }) => role.title === "Judge")
            )
            .map(({ node }) => node)
        : [];
    },
    allOrganizers() {
      return this.$page && this.$page.allPerson
        ? this.$page.allPerson.edges
            .filter(({ node }) =>
              node.roles.some(({ role }) => role.title === "Organizer")
            )
            .map(({ node }) => node)
        : [];
    },
    allPartners() {
      const allPartners =
        this.$page && this.$page.allPartner
          ? this.$page.allPartner.edges
              .filter(({ node }) =>
                node.roles.some(role => role.isSponsor === false)
              )
              .map(({ node }) => node)
          : [];
      let allPartnerRoles = [];

      for (const partner of allPartners) {
        for (const role of partner.roles) {
          if (role.isSponsor === false) {
            allPartnerRoles.push({
              ...partner,
              role: role
            });
          }
        }
      }

      return allPartnerRoles;
    },
    allSponsors() {
      const allSponsors =
        this.$page && this.$page.allPartner
          ? this.$page.allPartner.edges
              .filter(({ node }) => node.roles.some(role => role.isSponsor))
              .map(({ node }) => node)
          : [];
      let allSponsorRoles = [];

      for (const sponsor of allSponsors) {
        for (const role of sponsor.roles) {
          if (role.isSponsor) {
            allSponsorRoles.push({
              ...sponsor,
              role: role
            });
          }
        }
      }

      return allSponsorRoles;
    }
  },
  mounted() {
    // forward to default hackathon if no ID was provided
    if (!this.$route.params.id && this.defaultHackathon.id) {
      // FIXME: check if we can prevent a browser refresh
      this.$router
        .replace(`/${this.defaultHackathon.id}`)
        .then(() => this.$router.go(0));
    }
  }
};
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>


<page-query>
query (this.$id: ID!) {
  hackathon(id: $id) {
    id # ID 
    urlName # URL Name 
    title # Title 
    default # Default 
    active # Active 
    from # From 
    to # To 
    duration # Duration 
    eventPageActive # Event Page active 
    contactEmail # Contact EMail 
    twitter # Twitter Handle 
    linkTicketshop { # Ticketshop Link 
      id # ID - further fields see Link  
			name # Name 
			url # URL 
    } 
    linkCommunity { # Community Link 
      id # ID - further fields see Link  
			name # Name 
			url # URL 
    } 
    linkImprint { # Imprint Link 
      id # ID - further fields see Link  
			name # Name 
			url # URL 
    } 
    thumbnail # Thumbnail 
    descriptions { # Meta Descriptions 
      language # Language 
      description # Description 
    } 
    awards { # Awards 
      id # ID 
      name # Name 
      image # Image 
      titles { # Titles 
        language # Language 
        title # Title 
        subtitle # Subtitle 
      } 
      prize { # Prize 
        language # Language 
        prize # Prize 
      } 
      descriptions { # Descriptions 
        language # Language 
        description # Description 
      } 
      criteria { # Criteria 
        language # Language 
        criteria # Criteria 
      }
    } 
    faqs { # FAQs 
      id # ID - further fields see FAQs 
      name # Name 
      question{ # Question 
        language # Language 
        question # Question 
      } 
      answer{ # Answer 
        language # Language 
        answer # Answer 
      } 
    } 
  }
  allChallenge(filter: { hackathon: { eq: $id } }) {
    edges {
      node {
        id # ID 
        name # Name 
        titles { # Titles 
          language # Language 
          title # Title 
        } 
        hackathon { # Hackathon 
          id # ID - further fields see Hackathon 
        } 
        image # Image 
        descriptions { # Descriptions 
          language # Language 
          description # Description 
        } 
        type { # Type 
          id # ID - further fields see Challenge Type  
          title # Title 
        }
        author { # Author 
          language # Language 
          author # author 
        } 
        category { # Category 
          id # ID 
          name # Name 
        }
        award { # Awards 
          id # ID 
          name # Name 
          image # Image 
          titles { # Titles 
            language # Language 
            title # Title 
            subtitle # Subtitle 
          } 
          prize { # Prize 
            language # Language 
            prize # Prize 
          } 
          descriptions { # Descriptions 
            language # Language 
            description # Description 
          } 
          criteria { # Criteria 
            language # Language 
            criteria # Criteria 
          } 
        }
      }
    }
  }
  allTimetable(filter: { hackathon: { eq: $id } }) {
    edges {
      node {
        id # ID 
        title # Title 
        date # Date 
        slots { # Slots 
          titles{ # Titles 
            language # Language 
            title # Title 
          }  
          descriptions { # Descriptions 
            language # Language 
            description # Description 
          } 
          from # From 
          image # Image 
          linkExternal { # External Link 
            id # ID 
            name # Name 
            url # URL 
            titles { # Titles 
              language # Language 
              title # Title 
            } 
          }
          speaker { # Speaker 
            id # ID 
            name # Name 
            salutation # Salutation 
            image # Image 
            roles { # Roles 
              title # Title 
              role { # Role 
                id # ID 
                title # Title 
              } 
              talkTitles { # Talk Titles 
                language # Language 
                talkTitle # Talk Title 
              }
            }
          }
        }
      }
    }
  }
  allPerson(filter: { roles: { hackathon: { eq: $id } } }) {
    edges {
      node {
        id # ID 
        name # Name 
        salutation # Salutation 
        image # Image 
        roles { # Roles 
          title # Title 
          challenge { # Challenge 
            id # ID 
            type { # Type 
              id # ID 
              title # Title 
              color # Color 
              descriptions{ # Descriptions 
                language # Language 
                description # Description 
              } 
            }
            author { # Author 
              language # Language 
              author # author 
            } 
          } 
          role { # Role 
            id # ID 
            title # Title 
          } 
          professions { # Professions 
            language # Language 
            profession # Profession 
          } 
          talkTitles { # Talk Titles 
            language # Language 
            talkTitle # Talk Title 
          } 
          timeslots { # Timeslots 
            from # From 
            to # To 
          } 
          descriptions { # Descriptions 
            language # Language 
            description # Description 
          } 
        } 
      }
    }
  }
  allPartner(filter: { roles: { hackathon: { eq: $id } } }) {
    edges {
      node {
      id # ID 
      nameInternal # (internal) Name 
      names{ # Names 
        language # Language 
        name # Name 
      } 
      logo # Logo 
      roles{ # Roles 
        challenge{ # Challenge 
          id # ID 
        } 
        isSponsor # Sponsor 
        subtitles{ # Subtitles 
          language # Language 
          subtitle # subtitle 
        } 
      } 
      }
    }
  }
}
</page-query>

<static-query>
query {
  allHackathon(filter: { default: { eq: true }, active: { eq: true } }) {
    edges {
      node {
        id
      }
    }
  }
}
</static-query>
