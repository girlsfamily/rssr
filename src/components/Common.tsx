import * as React from 'react'
import { renderRoutes } from 'react-router-config'
// import { Switch, Redirect } from 'react-router-dom'
import TopBar from './TopBar'

interface IProps {
  route?: any
}

class Common extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  public render() {
    const { route } = this.props
    return (
      <div id="main-container">
        <TopBar></TopBar>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default Common
