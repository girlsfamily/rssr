import * as React from 'react'

interface IProps {
  location?: any,
  route?: any
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="main-container">
        {this.props.location.pathname}
      </div>
    );
  }
}

export default App;