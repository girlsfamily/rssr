import * as React from 'react'
import Helmet from 'react-helmet'
// import { renderRoutes } from 'react-router-config'

class App extends React.Component {

  public render() {
    return (
      <div className="home-page">
        <Helmet>
          <title>LF-home</title>
          <meta name="keywords" content="React SSR" />
        </Helmet>
        home
      </div>
    );
  }
}

export default App;