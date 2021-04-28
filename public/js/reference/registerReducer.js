// export default function reducer(state = {
//   user: {
//     first_name: '',
//     last_name: '',
//     username: '',
//     email: '',
//     password: '',
//     password_confirm: ''
//   },
//   registering: false,
//   registered: false,
//   errors: {},
//   types: [
//     {
//       id: 1,
//       slug: 'Admin'
//     },
//     {
//       id: 2,
//       slug: 'User'
//     }
//   ],
// }, action) {
//   switch (action.type) {
//     case "REGISTER_USER": {
//       return { ...state, registering: true}
//     }
//     case "REGISTER_USER_REJECTED": {
//       return {...state, registering: false, errors: action.payload}
//     }
//     case "REGISTER_USER_FULFILLED": {
//       return{ ...state, user: action.payload }
//     }
//   }
//
//   return state;
// }