// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Hackathon',
  plugins: [
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin/',
        modulePath: 'src/admin/index.js',
        configPath: 'src/admin/config.yml',
        htmlPath: 'src/admin/index.html',
      },
    },
  ],
  templates: {
    hackathon: [
      {
        name: 'hackathon',
        path: '/:urlName_raw',
        //path: '/:id',
        component: './src/templates/Index.vue',
      },
      {
        name: 'event',
        path: '/event/:urlName_raw',
        //path: '/event/:id',
        component: './src/templates/Event.vue',
      },
    ],
  },
  configureWebpack: {
    // merged with the internal config
  },
}
