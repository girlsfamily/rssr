import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import createStore from './redux/store'
import App from './App'
const initialState = (window as any).__INITIAL_STATE__
const store = createStore(initialState)
const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue
  }
})

loadableReady(() => {
  ReactDOM.hydrate(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>,
    document.getElementById('lf') as HTMLElement
  )
})
