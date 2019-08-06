import * as React from 'react'

// class loading extends React.Component {
//   public render() {
//     return (
//       <div>loading...</div>
//     );
//   }
// }

export default function Loading(props: { error: any; retry: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined; timedOut: any; pastDelay: any; }) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
};