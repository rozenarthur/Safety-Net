import React from 'react';
import ActivationContainer from '../containers/ActivationContainer';

class ActivationPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <ActivationContainer/>
          </div>
        </div>
      </div>
    );
  }
}


export default ActivationPage;