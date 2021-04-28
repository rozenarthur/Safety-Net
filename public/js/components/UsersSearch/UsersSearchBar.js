import React from 'react';
//firstName, username, lastPassUpdate, passExp
const UsersSearchBar = ({updateUsersList, toggleSearchFilter, userSearchFormUpdate, users, search}) => {

    const checkboxes = {
      padding: '12px 20px 12px 40px',
      fontSize: '18px'
    };

    const padding = {
      marginRight: '15px',
    };

    const label = {
      marginRight: '25px',
      fontSize: '22px'
    };

    const handleUpdateUsersList = (e) => {
        toggleSearchFilter(e.target.name);
        const {locked, admins, pending} = search.filters;
        let updatedList;
        if (e.target.name !== 'search') {
          updatedList = users.filter((user) => {
            if (!locked) {
              return user.locked === 0;
            } else {
              return user;
            }
          });
          updatedList = updatedList.filter((user) => {
            if (!admins) {
              return user.role[0].slug !== 'admin';
            } else {
              return user;
            }
          });
          updatedList = updatedList.filter((user) => {
            if (!pending) {
              return user.completed === 1;
            } else {
              return user;
            }
          });
          updatedList = updatedList.filter((user) => {
            const name = user.first_name + ' ' + user.last_name;
            if(name.toLowerCase().search(search.search.toLowerCase()) !== -1) {
              return user;
            } else if (user.username.toLowerCase().search(search.search.toLowerCase()) !== -1) {
              return user;
            } else if (user.email.toLowerCase().search(search.search.toLowerCase()) !== -1) {
              return user;
            }
          });

        } else {
          userSearchFormUpdate(e.target.value);
          updatedList = users.filter((user) => {
            const name = user.first_name + ' ' + user.last_name;
            if (name.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
              return user;
            } else if (user.username.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
              return user;
            } else if (user.email.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
              return user;
            }
          });

          updatedList = updatedList.filter((user) => {
            if (!locked) {
              return user.locked === 0;
            } else {
              return user;
            }
          });
          updatedList = updatedList.filter((user) => {
            if (!admins) {
              return user.role[0].slug !== 'admin';
            } else {
              return user;
            }
          });
          updatedList = updatedList.filter((user) => {
            if (!pending) {
              return user.completed === 1;
            } else {
              return user;
            }
          });
        }
        updateUsersList(updatedList);
      };


    return (
      <div className="well searchdiv">
        <div className="row">
          <div className="col-md-6">
            <input type="text" name="search" placeholder="Search.." value={search.search} className="searchbar"
                   onChange={handleUpdateUsersList}/>
          </div>
          <div className="col-md-6 text-center" style={checkboxes}>
            <span style={label}>Show: </span>
            <label className="checkbox-inline" style={padding}><input type="checkbox" name="locked"
                                                                      onChange={handleUpdateUsersList}
                                                                      defaultChecked={search.filters.locked} value=""/>Locked</label>
            <label className="checkbox-inline" style={padding}><input type="checkbox" name="admins"
                                                                      onChange={handleUpdateUsersList}
                                                                      defaultChecked={search.filters.admins} value=""/>Admins</label>
            <label className="checkbox-inline" style={padding}><input type="checkbox" name="pending"
                                                                      onChange={handleUpdateUsersList}
                                                                      defaultChecked={search.filters.pending} value=""/>Pending</label>
          </div>
        </div>
      </div>
    );
  }
;

UsersSearchBar.Proptypes = {
  updateUsers: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired
};

export default UsersSearchBar;