import React from 'react';
import LoginContainer from '../containers/LoginContainer';
import {Link} from 'react-router';

class LoginPage extends React.Component {

  render() {
    const style = {
      paddingTop:60
    };

    const activateBtnStyle = {
      marginRight:50
    };

    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4" style={style}>
          <LoginContainer/>
        </div>
      </div>
    );
  }
}


export default LoginPage;
