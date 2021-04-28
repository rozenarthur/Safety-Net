import React from 'react';
import BarChart from 'react-bar-chart';
import {browserHistory} from 'react-router';

//Parameters will be: numRegUsers, numActivatedUsers, numLockedUsers, numAdmins, numPendingUsers, redirectToUsers
const UsersPanel = ({registered, activated, locked, admins, pending}) => {

  const data = [
    {text: 'Registered', value: registered},
    {text: 'Activated', value: activated},
    {text: 'Locked', value: locked},
    {text: 'Admins', value: admins},
    {text: 'Pending', value: pending},
  ];

  const margin = {top: 25, right: 30, bottom: 25, left: 30};

  const left = {
    left: '40%'
  };

  const redirect = (e) => {
    e.preventDefault();
    browserHistory.push('users');
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <i className="fa fa-users"></i> Users
      </div>
      <div className="dashpanel" onClick={redirect}>
        <h3 className="center-block hovertext" style={left}>View Users</h3>
        <div className="panel-body hover">
          <div style={{width: '50%'}}>
            <BarChart
              ylabel=''
              width={600}
              height={250}
              margin={margin}
              data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

UsersPanel.PropTypes = {
  registered: React.PropTypes.number.isRequired,
  activated: React.PropTypes.number.isRequired,
  locked: React.PropTypes.number.isRequired,
  admins: React.PropTypes.number.isRequired,
  pending: React.PropTypes.number.isRequired,
};

export default UsersPanel;