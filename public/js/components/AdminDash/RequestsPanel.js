import React from 'react';
import {browserHistory} from 'react-router';

//numSQRequests, numPassResetRequests
const RequestsPanel = ({numForgotRequests, numSQRequests}) => {
  const sqRequests = [];
  numSQRequests.map((sq) => {
    if (!sq.is_approved) {
      sqRequests.push(sq);
    }
  });

  const left = {
    left: '40%'
  };

  const redirect = (e) => {
    e.preventDefault();
    browserHistory.push('register');
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <i className="fa fa-inbox"></i> Requests
      </div>
      <div className="dashpanel" onClick={redirect}>
        <h3 className="center-block hovertext" style={left}>View Requests</h3>
        <div className="panel-body hover">
          <table className="table">
            <thead>
            <tr>
              <th>Request Type</th>
              <th>New Requests</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Security Questions</td>
              <td>{sqRequests.length}</td>
            </tr>
            <tr>
              <td>Password Reset</td>
              <td>{(typeof numForgotRequests.length) === 'array' ? numForgotRequests.length : 0}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

RequestsPanel.PropTypes = {
  numForgotRequests: React.PropTypes.array.isRequired
};

export default RequestsPanel;