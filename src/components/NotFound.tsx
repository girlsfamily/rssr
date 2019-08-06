import * as React from 'react'
import Status from './Status'

class NotFound extends React.Component {
  public render() {
    return (
      <Status code={404}>
        <div>
          <h1>Sorry, can’t find that.</h1>
        </div>
      </Status>
    );
  }
}

export default NotFound