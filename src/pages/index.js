import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
export const query = graphql`
  query {
    wpgraphql {
      posts(first: 6) {
        nodes {
          id
          title
          uri
          acf_content {
            poster
          }
        }
      }
    }
  }
`

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes

  return (
    <Layout>
         <SEO 
            title="Discover Film premieres Around London"
            description="Attend the London Film Premieres, UK Exclusive celebrities on the red carpet movie premieres london at leicester square Movie"
          />
        <div className="row cast">
        {
            posts.map(post => (
                <div className="cast__card" key={post.id}>
                    <figure>
                    <Link to={`${post.uri}`}>
                      <img className="cast__image" src={`https://image.tmdb.org/t/p/w154/${post.acf_content.poster}`} alt={`${post.title}`} />
                    </Link>
                    </figure>
                </div>
              )
            )
        }
        </div>

    </Layout>
  )
}

export default Blog