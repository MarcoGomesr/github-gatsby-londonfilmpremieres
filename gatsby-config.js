/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */

  siteMetadata: {
    title: `London Film Premieres `,
    description: `With The latest upcoming film premieres in london. Exclusive celebrities photos and videos on the red carpet, interviews trailers and more!`,
    author: `@ukfilmpremiere`,
    twitterUsername: '@ukfilmpremiere',
    siteUrl: 'https://londonfilmpremieres.com',
    image:'icon.png'
  },

  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-M5XM9M",
        includeInDevelopment: false,
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'http://wp.londonfilmpremieres.com/graphql'     
        // url: 'http://52.56.82.92/graphql'     
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `London Film Premieres`,
        short_name: `London Film Premieres`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `static/icon.png`, // This path is relative to the root of the site.
      }
    },       
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, wpgraphql } }) => {
              return wpgraphql.posts.edges.map(edge => {
                return Object.assign(
                  {},
                  {
                    title: edge.node.title,
                    description: edge.node.acf_details.simpleplot,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + "/" + edge.node.slug,
                  }
                )
              })
            },
            query: `
              {
                wpgraphql {
                  posts {
                    edges {
                      node {
                        title
                        slug
                        acf_details {
                          simpleplot
                        }
                        date
                      }
                    }
                  }
                }
                site {
                  siteMetadata {
                    title
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "London film premieres - RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-zopfli`
  ]
}