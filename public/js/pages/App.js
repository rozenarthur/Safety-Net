import React from 'react';
import axios from 'axios';
import {ROOT_URL} from '../utils/Utils';
import {browserHistory} from 'react-router';

class  App extends React.Component {
  // componentWillMount() {
  //   axios.get(ROOT_URL + 'check')
  //     .then((response) => {
  //       if(response.data.message !== null) {
  //         browserHistory.push('admin');
  //         const security_questions = {
  //           security_questions: response.data.message.security_questions,
  //           count: response.data.message.count
  //         };
  //         loginUserSuccess(security_questions);
  //         authenticateUserSuccess();
  //       }
  //     });
  // }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
//
// function mapStateToProps() {
//
//   return {
//     logged_in: state.login.login,
//
//   }
//
// }
//
// function mapDispatchToProps() {
//
// }

export default App;