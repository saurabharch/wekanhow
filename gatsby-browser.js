// import React from 'react'
// import {Provider} from 'react-redux'
// import createStore from './src/createStore'
//
// const store = createStore()
//
// exports.wrapRootComponent = function wrapRootComponent({Root}) {
//   return function wrapRootComponentComponent(props) {
//     return (
//       <Provider store={store}>
//         <Root />
//       </Provider>
//     )
//   }
// }
//
//
//
//
//
//
//
//

const React = require("react");
const { BrowserRouter } = require("react-router-dom");
const { Provider } = require("react-redux");
const Promise = require("promise-polyfill");

const createStore = require("./src/createStore").default();

exports.replaceComponentRenderer = ({ history }) => {
  const store = createStore();

  if (typeof Raven !== "undefined") {
    Raven.config(
      "https://844ee16b8acb45e0a4bba7022e80e547@sentry.io/1407848"
    ).install();
  }

  // for our IE11 users
  if (!window.Promise) {
    window.Promise = Promise;
  }

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter history={history}>{children}</BrowserRouter>
    </Provider>
  );

  return ConnectedRouterWrapper;
};

exports.onRouteUpdate = function({ location }) {
  // Don't track while developing.
  if (process.env.NODE_ENV === `production` && typeof ga === `function`) {
    ga(`set`, `page`, (location || {}).pathname);
    ga(`send`, `pageview`);
  }
};
