import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout';
import SEO from "../components/seo";
import unserialize from '../helpers/unserialize.js'

export const query = graphql`
  query ( $id: ID!) {

    
      site {
        siteMetadata {        
          siteUrl          
        }
      }    
    
    
    wpgraphql {
      post(id: $id) {
        slug
        title
        content
        acf_content {
          date
          link
          location
          status
          poster
        }
        acf_details {
          trailerLink
          simpleplot             
          plot
          movieTrivia      
          directors
          cast
        }
      }
    }
  }
`

const PostTemplate = ({ data, pageContext }) => {
  
  const { next, prev, nextTitle, prevTitle } = pageContext
  const post = data.wpgraphql.post


  let poster = post.acf_content.poster;
  let location = post.acf_content.location;
  let date = post.acf_content.date;
  let status = post.acf_content.status;


  let plot = post.acf_details.plot;
  let simpleplot = post.acf_details.simpleplot;
  let movieTrivias = unserialize(post.acf_details.movieTrivia);
  let cast = unserialize(post.acf_details.cast);
  let directors = unserialize(post.acf_details.directors);
  let trailerLink = post.acf_details.trailerLink;

  let slug = post.slug

  let url = `${data.site.siteMetadata.siteUrl}/${slug}`

  return (
    <Layout>
      

     <SEO
       title={post.title}
       description={simpleplot}
       image={`https://image.tmdb.org/t/p/w780${poster}`}          
       siteUrl={url}
      />
        
      
      <article className="post">
      
        <h1 dangerouslySetInnerHTML={{ __html: `${post.title}` }} />
        <p>{plot}</p>     
        

        <p>{simpleplot}</p>

          <div className="poster">
            <figure>
              <img src={`https://image.tmdb.org/t/p/w300${poster}`} className="imgborder centerimg" alt={ `${post.title} poster` }/>
            </figure>          
          </div>
          
          <div className="alert alert-success" role="alert">
            <ul className="list-group">
              <li className="list-group-item"><strong>Date:</strong> {date}</li>
              <li className="list-group-item"><strong>Location:</strong> {location}</li>          
              <li className="list-group-item"><strong>Status:</strong> <span className="status">{status}</span></li>
              {
                directors.map(director => (
                  <li key={director.id} className="list-group-item"><strong>directors:</strong>{director.name}</li>
                  ))
              }
            </ul>
          </div>

      <section>
        <h2 dangerouslySetInnerHTML={{ __html: `${post.title} Trailer` }} />
        <iframe src={`https://www.youtube.com/embed/${trailerLink}`} frameBorder="0" width="100%" height="400px" title="trailer" ></iframe>
      </section>
      
    
      {movieTrivias.length !== 0 && 
      <section>
        <h2>Did you know ... ?</h2>

          <ol className="list">
          {
            movieTrivias.map( (movieTrivia,i) => (
              
              <li key={i} className="list__item">{movieTrivia}</li>
              )
              )
          }
          </ol>
      </section>
      }
      
      <section>
        <h2>Cast</h2>

          <div className="row cast">
          {
              cast.map(el => (
                el.profile_path &&
                  <div className="cast__card" key={el.id}>
                    <figure>
                      <img className="cast__image" src={`https://image.tmdb.org/t/p/w154/${el.profile_path}`} alt={`${el.name} profile`} />
                      <figcaption className="cast__name">{el.name}</figcaption>
                      <figcaption className="cast__character">{el.character}</figcaption>
                    </figure>
                </div>
                )            
              )
          }
        </div>
      </section>

      <nav className="footerNav">
        {prev && 
          <div className="nav-prev">
            &#8592;
            <Link to={prev} rel="prev">
              <span className="meta-nav" dangerouslySetInnerHTML={{ __html: prevTitle}}></span>
            </Link>
          </div>
        }

        {next &&          
          <div className="nav-next">
            <Link to={next} rel="next">
              <span dangerouslySetInnerHTML={{ __html: nextTitle}}></span>
            </Link>
            &#8594;
          </div>
        }
      </nav>
      </article>
    </Layout>
  )
}

export default PostTemplate