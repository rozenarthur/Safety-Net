import React from 'react';
//firstName, username, lastPassUpdate, passExp
const AdminPanel = ({firstName, username, accountType, lastPassUpdate, passExp}) => {
  const style = {
    fontSize: '175px',
    paddingTop: '15px'
  };

  const black = {
    color: 'black',
    borderRadius: '3px',
    padding: '10px'
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-1 col-md-2  text-center">
          <i className="fa fa-user-circle" style={style}></i>
        </div>
        <div className="col-md-offset-1 col-md-8" >
          <div className="panel panel-default" style={black}>
            <div className="panel-heading">
              <i className="fa fa-smile-o"></i> Welcome, {firstName}
            </div>
            <div className="panel-body">

              <table className="table">
                <tbody>
                <tr>
                  <td>Logged In As:</td>
                  <td>{username}</td>
                </tr>
                <tr>
                  <td>Account Type:</td>
                  <td>{accountType}</td>
                </tr>
                <tr>
                  <td>Last Password Update:</td>
                  <td>{lastPassUpdate}</td>
                </tr>
                <tr>
                  <td>Password Expiration:</td>
                  <td>{passExp}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;