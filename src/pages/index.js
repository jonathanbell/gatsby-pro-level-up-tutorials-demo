import React from 'react';
import Link from 'gatsby-link';
import PostListing from '../components/Posts/PostListing';

const IndexPage = ({ data }) => (
  <div>
    <h1>Hello World</h1>
    <p>{data.site.siteMetadata.title}</p>
    <p>{data.site.siteMetadata.desc}</p>
    {data.allMarkdownRemark.edges.map(({ node }) => {
      return <PostListing key={node.id} post={node} />;
    })}
  </div>
);

export default IndexPage;

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          html
          # excerpt(pruneLength: 200)
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD YY")
          }
        }
      }
    }
  }
`;
