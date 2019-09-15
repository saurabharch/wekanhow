const { request } = require("graphql-request");
const algoliasearch = require("algoliasearch");
//
// const query = `{
// 	allMarkdownRemark {
//     edges {
//       node {
//         frontmatter {
//           title
//         }
//         fields {
//           slug
//         }
//         excerpt(pruneLength: 1000)
//       }
//     }
//   }
// }`
//
// request('http://localhost:8000/___graphql', query)
//   .then(data => {
//   })

module.exports = {
  syncToAlgolia: function syncToAlgolia(data) {
    const client = algoliasearch(
      "IY3ZFDIVWH",
      "1fa689b14c46101df00641af78a8e1d6"
    );
    const index = client.initIndex("wekan");

    const objects = data.allMarkdownRemark.edges
      .map(edge => edge.node)
      .map(node => ({
        title: node.frontmatter.title,
        objectID: node.fields.slug,
        body: node.excerpt
      }));

    index.clearIndex((clearErr, clearContent) => {
      index.saveObjects(objects, (err, content) => {
        if (!err) {
          console.log(`Successfully synced ${objects.length} items to Algolia`);
        } else {
          console.error(`Error while syncing to Algolia`, err);
        }
      });
    });
  }
};
