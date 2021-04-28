import React from 'react';
import {browserHistory} from 'react-router';

//numSites, redirectToNetwork
const NetworkPanel = ({sites}) => {

  const style = {
    fontSize: '125px',
    marginTop: '40px',
    marginBottom: '25px',
    backgroundColor: 'black'
  };

  const height = {
    height: '326px'
  };

  const left = {
    left: '35%'
  };

  const redirect = (e) => {
    e.preventDefault();
    browserHistory.push('register');
  };

  return (
    <div className="panel panel-default" style={height}>
      <div className="panel-heading">
        <i className="fa fa-server"></i> Network
      </div>
      <div className="dashpanel" onClick={redirect}>
        <h3 className="center-block hovertext" style={left}>View Network</h3>
        <div className="panel-body text-center hover">
          <span className="badge" style={style}> {sites.length} </span>
          <p>Number of sites currently on Safety Net's network</p>
        </div>
      </div>
    </div>
  );
};

NetworkPanel.Proptypes = {
  sites: React.PropTypes.object.isRequired
};

export default NetworkPanel;