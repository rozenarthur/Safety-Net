// import React from 'react';
// import RegisterForm from './RegisterForm';
// import { connect } from 'react-redux';
// import { registerRequest } from './registerActions';
//
// class RegisterPage extends React.Component {
//   registerRequest() {
//     this.props.dispatch(registerRequest(this.state.user))
//   }
//
//   render() {
//     const {registerRequest} = this.props;
//
//     return (
//
//     <div className="row">
//       <div className="col-md-offset-4 col-md-4 ">
//         <RegisterForm registerRequest={this.registerRequest.bind(this)}/>
//       </div>
//     </div>
//     );
//   }
// }
//
// RegisterPage.propTypes = {
//   registerRequest: React.PropTypes.func.isRequired
// };
//
// export default connect((store) => {
//   return {
//     user: store.user.user,
//     userRegistered: store.user.registered,
//     types: store.user.types
//   }
// }, {registerRequest})(RegisterPage);