import React from 'react';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';

class ChangePasswordPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <ChangePasswordContainer/>
          </div>
        </div>
      </div>
    );
  }
}


export default ChangePasswordPage;
