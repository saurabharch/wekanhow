module.exports = {
  siteMetadata: {
    title: `Wekan Kanban Biblograpgy!`,
    siteUrl: `https://www.wekan.team`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              maxWidth: 840,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-jsx`,
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    `gatsby-plugin-typescript`,
    `styled-jsx-plugin`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: 'UA-74131346-111',
    //   },
    // },
    // `gatsby-plugin-offline`
  ],
}
