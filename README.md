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

### Open Bugs

[ ] Initial html lang is set to "en"  
[X] Replace challenge categories by challenges directly  
[ ] auto extend challenge if called via URL param  
[ ] Fix image fallback sizes and placeholder  
[ ] fix scroll to initial section

### TODO

[ ] Replace static json data with queryies  
[ ] Replace navigation (`g-link`) with hackathon specific IDs
[ ] add aftermovie to intro section
