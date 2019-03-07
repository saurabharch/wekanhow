import * as React from 'react'
import WekanConf from '../assets/icons/WekanConf'
import LinkArrow from '../assets/icons/LinkArrow'

export const Banner = () =>
  <a className="banner" href="https://demo.sandstorm.io/appdemo/m86q05rdvj14yvn78ghaxynqz7u2svw6rnttptxx49g1785cdv1h" target="_blank">

    <style jsx={true}>
      {`
        .banner {
          transform: translateX(-50%);
          background: rgb(244, 244, 244);
          border-radius: 20px;
          padding: 8px 15px;
          display: flex;
          align-items: center;
          position: absolute;
          top: 105px;
          left: 50%;
          color: black;
        }
        .title {
          font-size: 16px;
          margin-left: 8px;
        }
        .bold {
          font-weight: 600;
        }
        .link-arrow-wrapper {
          margin-left: 12px;
        }
      `}
    </style>
    <WekanConf />
    <span className="title">
      Try Wekan in Action with Sandstorm <span className="bold">Here!</span>
    </span>
    <span className="link-arrow-wrapper">
      <LinkArrow />
    </span>
  </a>
