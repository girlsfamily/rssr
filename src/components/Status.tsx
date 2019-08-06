import * as React from 'react'
import { Route } from 'react-router-dom'

interface IProps {
  code: any, 
  children: any
}

class Status extends React.Component<IProps> {
  public render() {
    const { code, children } = this.props
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) (staticContext as any).status = code
          return children;
        }}
      />
    );
  }
}

export default Status