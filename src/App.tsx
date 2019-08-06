import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import CssBaseline from '@material-ui/core/CssBaseline'
import routes from './routes'
// import RedirectWithStatus from './components/RedirectStatus'

// interface IProps {
//   route: any
// }


function App () {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, [])

  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      {renderRoutes(routes)}
    </React.Fragment>
  );

}

export default App