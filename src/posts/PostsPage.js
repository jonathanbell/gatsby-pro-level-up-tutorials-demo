import React, { Component } from 'react';

export default class PostPage extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <span>{data.markdownRemark.frontmatter.date}</span>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        {/* <p>{data.markdownRemark.excerpt}</p> */}
      </div>
    );
  }
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD YYYY")
        title
      }
    }
  }
`;
