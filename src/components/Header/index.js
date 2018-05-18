import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

import logo from '../../images/logo.svg';

const HeaderWrapper = styled.div`
  background: #524763;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({ isHome }) => (isHome ? '70vh' : '20vh')};
  h1 {
    img {
      height: 80px;
    }
  }
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const MainNav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 10px;
      font-family: sans-serif;
    }
    a {
      color: white;
      &:hover {
        border-bottom: 3px solid green;
      }
    }
  }
`;

export default class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    // Prevents jank when clicking the logo on the homepage itself
    // If we are going from an old path to a new path:
    // In other words, if our new location is not the same as the old location
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === '/') {
        // console.log(this.wrapper);
        // homepage
        this.wrapper.animate([{ height: '20vh' }, { height: '70vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.87, 0, 0.07, 1)',
          iterations: 1
        });
      } else {
        // not the homepage
        this.wrapper.animate([{ height: '70vh' }, { height: '20vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.87, 0, 0.07, 1)',
          iterations: 1
        });
      }
      console.log(this.props.location.pathname);
    }
  };

  render() {
    const { data, location } = this.props;
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={wrapper => {
          // We need this DOM element available via the .findDOMNode() method
          // bacuse we are going to animate it via the web annimations api
          this.wrapper = ReactDOM.findDOMNode(wrapper);
        }}
      >
        the ishome vaule is: {location.pathname === '/' ? 'true' : 'false'}
        <HeaderContainer>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <img src={logo} alt="Level Up Logo" />
            </Link>
          </h1>
          {/* <p>{data.site.siteMetadata.title}</p>
          <p>{data.site.siteMetadata.desc}</p> */}
          <MainNav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </MainNav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.3
          }}
          sizes={data.background.sizes}
        />
      </HeaderWrapper>
    );
  }
}
