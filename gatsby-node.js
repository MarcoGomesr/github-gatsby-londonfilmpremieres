exports.createPages = async ( {actions, graphql }) => {
  const result = await graphql(
  `{
    wpgraphql {
      pages {
        nodes {
          id
          uri
        }
      }
      posts {
        nodes {
          title
          id
          uri
        }
      }
    }
  }`
  );

const pages = result.data.wpgraphql.pages.nodes


pages.forEach(page => {
  actions.createPage({
    path: page.uri,
    component: require.resolve('./src/templates/page-template.js'),    
    context: {
      id: page.id
    }
  })
});

const posts = result.data.wpgraphql.posts.nodes


posts.forEach( (post, index) => {
  actions.createPage({
    path: post.uri,
    component: require.resolve('./src/templates/post-template.js'),    
    context: {
      id: post.id,
      prevTitle: index === 0 ? null: posts[index - 1].title,
      prev: index === 0 ? null: posts[index - 1].uri,
      nextTitle:index === (posts.length - 1 ) ? null : posts[index + 1].title,
      next: index === (posts.length - 1 ) ? null : posts[index + 1].uri
    }
  })
});

}
