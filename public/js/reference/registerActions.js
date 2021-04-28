// import axios from 'axios';
// //TODO: MOVE THIS TO REDUCER!!
// export function registerRequest(data, userType) {
//   return dispatch => {
//     if(userType === '') {
//       return (
//         msg.show('Please select user type.', {
//           time: 8000,
//           type: 'error',
//           icon: null
//         })
//       );
//     } else {
//       return axios.post('http://localhost:8000/register/' + userType, data)
//         .then(function (response) {
//
//           if (response.data.result == "success") {
//             msg.show(response.data.message, {
//               time: 8000,
//               type: 'success',
//               icon: null
//             });
//           } else {
//             msg.show(response.data.message, {
//               time: 8000,
//               type: 'error',
//               icon: null
//             })
//           }
//         })
//         .catch(function (err) {
//           const error = Object.keys(err.response.data)[0];
//           msg.show(err.response.data[error], {
//             time: 8000,
//             type: 'error',
//             icon: null
//           });
//         });
//     }
//   }
// }