# Hackathon Frontend

This project is the frontend for our Hackerstolz Hackathon CMS. It will be piloted using the example of the Climathon, where only content and not the design changes. In the future, the theme should also be configurable.

### Compiles and hot-reloads for development and explore GraphQL data

```
yarn develop
```

### Compiles and minifies for production

```
yarn build
```

### Explore GraphQL data only

```
yarn explore
```

### Explore routes

- `/`: Hackathon landing page
- `/event`: Hackathon on-event site
- `/${hackathon-id}`: Hackathon landing page (with hackathon specific ID)
- `/event/${hackathon-id}`: Hackathon on-event site (with hackathon specific ID)

- `___explore`: Graph QL explorer
- `/admin/`: Admin route

### URL hash query parameters

Use parameter `lang` to force the display of either `de` or `en`. The final URL then looks like:

```
https://climathon.hackerstolz.de/#?lang=en
```

Use parameter `section` to auto scroll to a specific page section:

```
https://climathon.hackerstolz.de/#?section=faq
```

Use parameter `challenge` to auto scroll and display to a specific challenge:

```
https://climathon.hackerstolz.de/#?challenge=aft3-jehg-28hb-nnmj7
```

### TODO

[ ] Replace static json data with queryies  
[ ] Add aftermovie to intro section (and other missing attributes in schema)
[ ] Update route when navigating to challenge from sponsor or price section
[ ] Replace URL IDs with URL names
[ ] Auto-formatted markdown misses `target="_blank"` attribute for links (e.g. in challenge description or award text)
