// import React from 'react';
// import TextFieldGroup from './TextFieldGroup'
// import AlertContainer from 'react-alert';
//
// class RegisterForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       first_name: '',
//       last_name: '',
//       username: '',
//       email: '',
//       password: '',
//       password_confirmation: '',
//       userType: '',
//       types: [
//         {
//           id: 1,
//           slug: 'Admin'
//         },
//         {
//           id: 2,
//           slug: 'User'
//         }
//       ],
//       errors: {},
//       success: {}
//     };
//     // this.alertOptions = {
//     //   offset: 14,
//     //   position: 'bottom left',
//     //   theme: 'dark',
//     //   time: 5000,
//     //   transition: 'scale'
//     // };
//     this.onChange = this.onChange.bind(this);
//     // this.onSubmit = this.onSubmit.bind(this);
//   }
//
//   onChange(e) {
//     this.setState({[e.target.name]: e.target.value});
//   }
//
//   // isValid() {
//   //   const {errors, isValid } = validateInput(this.state);
//   //
//   //   if (!isValid) {
//   //     this.setState({errors});
//   //   }
//   //
//   //   return isValid;
//   // }
//
//   //TODO: Move to Actions
//   // onSubmit(e) {
//   //   e.preventDefault();
//   //
//   //   this.setState({errors: {}});
//   //   this.props.registerRequest(this.state, this.state.userType);
//   //
//   // }
//
//   registerRequest() {
//     this.props.registerRequest();
//   }
//
//   render() {
//     const options = this.state.types.map((type) => {
//       return <option key={type.id} value={type.slug.toLowerCase()}>{type.slug}</option>
//     });
//     //<form onSubmit={this.onSubmit}>
//     return (
//       <form>
//         <h1 className="text-center">Register a new user</h1>
//         <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
//         <TextFieldGroup
//           error={this.state.errors.first_name}
//           value={this.state.first_name}
//           label="Please enter the user's first name."
//           onChange={this.onChange}
//           placeholder="First Name"
//           field='first_name'
//         />
//         <TextFieldGroup
//           error={this.state.errors.last_name}
//           value={this.state.last_name}
//           label="Please enter the user's last name."
//           onChange={this.onChange}
//           placeholder="Last Name"
//           field='last_name'
//         />
//         <TextFieldGroup
//           error={this.state.errors.username}
//           value={this.state.username}
//           label="Please enter a username for the new user."
//           onChange={this.onChange}
//           placeholder="Username"
//           field='username'
//         />
//         <TextFieldGroup
//           error={this.state.errors.email}
//           value={this.state.email}
//           label="Please enter a valid email for the user. Their activation code will be sent to this email."
//           onChange={this.onChange}
//           placeholder="Email"
//           type='email'
//           field='email'
//         />
//         <TextFieldGroup
//           error={this.state.errors.password}
//           value={this.state.password}
//           label="Please enter a password for the user."
//           onChange={this.onChange}
//           placeholder="Password"
//           type='password'
//           field='password'
//         />
//         <TextFieldGroup
//           error={this.state.errors.password_confirmation}
//           value={this.state.password_confirmation}
//           label="Please re-enter the user's password."
//           onChange={this.onChange}
//           placeholder="Confirm Password"
//           field='confirm_password'
//         />
//         <div className="form-group">
//           <label className="control-label">Choose the type of account this user will be.</label>
//           <select
//             value={this.state.userType}
//             onChange={this.onChange}
//             name="userType"
//             className="form-control"
//           >
//             <option value="" disabled>Choose Account Type</option>
//             {options}
//           </select>
//         </div>
//         <div className="form-group">
//           <button className="btn btn-primary pull-right" onClick={this.registerRequest.bind(this)}>Register User</button>
//         </div>
//       </form>
//     );
//   }
// }
//
// RegisterForm.propTypes = {
//   registerRequest: React.PropTypes.func.isRequired
// };
//
//
// export default RegisterForm;
