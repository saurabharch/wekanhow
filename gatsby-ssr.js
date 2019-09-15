const React = require('react')
const { Provider } = require('react-redux')
const { renderToString } = require("react-dom/server")


const createStore = require('./src/createStore').default()

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {

  const store = createStore()

  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  )
  replaceBodyHTMLString(renderToString(<ConnectedBody/>))
}