import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

interface IProps {
  from: any,
  to: any,
  status: any
}

class RedirectStatus extends React.Component<IProps> {
  public render() {
    const { from, to, status } = this.props
    return (
      <Route render={({ staticContext }) => {
          if (staticContext) (staticContext as any).status = status
          return <Redirect from={from} to={to} />
        }}
      />
    );
  }
}

export default RedirectStatus