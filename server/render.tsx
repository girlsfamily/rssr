import * as React from 'react'
import * as path from 'path'
import * as ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import { Helmet } from 'react-helmet'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { createMuiTheme } from '@material-ui/core/styles'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import routes from '../src/routes'
import createStore from '../src/redux/store'

const serverStats = path.resolve(process.cwd(), './dist/server/loadable-stats.json')
const clientStats = path.resolve(process.cwd(), './dist/client/loadable-stats.json')
const serverExtractor = new ChunkExtractor({ statsFile: serverStats })
const clientExtractor = new ChunkExtractor({ statsFile: clientStats })
const { default: App } = serverExtractor.requireEntrypoint()

const loadData = (url: any) => {
  const branch = matchRoutes(routes, url)
  const promises = branch.map(({ route, match }) => {
    return (route as any).loadData ? (route as any).loadData(store, match) : Promise.resolve(null)
  })
  return Promise.all(promises)
}

const store = createStore({})

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  }
})

export default async (url:string, context: object) => {
  const sheets = new ServerStyleSheets()
  // const context = {}
  let preloadedState:any
  await loadData(url).then((data) => {
    preloadedState = data
  })
  const html = ReactDOMServer.renderToString(
    (sheets as any).collect(
      <ThemeProvider theme={theme}>
        <ChunkExtractorManager extractor={clientExtractor}>
          <Provider store={store}>
            <StaticRouter context={context} location={url}>
              <App />
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>
      </ThemeProvider>
    )
  )
  const css = sheets.toString()
  const helmet = Helmet.renderStatic()
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${clientExtractor.getLinkTags()}
      ${clientExtractor.getStyleTags()}
      <link rel="manifest" href="manifest.json">
      <link rel="shortcut icon" href="favicon.ico">
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript">
        window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
      </script>
    </head>
    <body>
      <div id="lf">${html}</div>
      ${clientExtractor.getScriptTags()}
    </body>
  </html>`
}

