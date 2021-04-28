import React from 'react';
import TextFieldGroup from './shared/TextFieldGroup';
import Dropdown from './shared/Dropdown';

const AccountSetUpForm = ({error, security_questions, updateSetUpForm, updateSQSetUp,
                          setting_up, setUpRequest, premade_security_questions, password_set_up}) => {

  const style = {marginTop: -70};

  return (
    <div style={style}>
      <img className="logo center-block" src="../../img/safetynetlogo2.png"/>
      <form onSubmit={setUpRequest}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="text-center">Set Up Your Account</h4>
          </div>
          <div className="panel-body">
            {error && <span className="help-block err-message text-center">{error.message}</span>}
            <Dropdown
              field='security_question0'
              label='Choose a security question'
              onChange={updateSQSetUp}
              selections={premade_security_questions}
              placeholder='Choose security question'
              lowercase={false}
            />
            < TextFieldGroup
              value={security_questions[0].security_answer}
              label="Enter answer:"
              onChange={updateSQSetUp}
              placeholder="Security Answer"
              field='security_answer0'
            />
            <Dropdown
              field='security_question1'
              label='Choose a security question'
              onChange={updateSQSetUp}
              selections={premade_security_questions}
              placeholder='Choose security question'
              lowercase={false}
            />
            < TextFieldGroup
              value={security_questions[1].security_answer}
              label="Enter answer:"
              onChange={updateSQSetUp}
              placeholder="Security Answer"
              field='security_answer1'
            />
            <Dropdown
              field='security_question2'
              label='Choose a security question'
              onChange={updateSQSetUp}
              selections={premade_security_questions}
              placeholder='Choose security question'
              lowercase={false}
            />
            < TextFieldGroup
              value={security_questions[2].security_answer}
              label="Enter answer:"
              onChange={updateSQSetUp}
              placeholder="Security Answer"
              field='security_answer2'
            />
            <br/>
            <hr/>
            < TextFieldGroup
              value={password_set_up.old_password}
              label="Enter your current password:"
              onChange={updateSetUpForm}
              type='password'
              error={error.message}
              placeholder="Current Password"
              field='old_password'
            />
            < TextFieldGroup
              value={password_set_up.password}
              label="Enter new password:"
              onChange={updateSetUpForm}
              type='password'
              error={error.message}
              placeholder="New Password"
              field='password'
            />
            < TextFieldGroup
              value={password_set_up.password_confirmation}
              label="Re-enter new password:"
              onChange={updateSetUpForm}
              type='password'
              error={error.message}
              placeholder="Confirm New Password"
              field='password_confirmation'
            />
            <br/>
            <div className="form-group">
              <button className="btn btn-default center-block" type="submit" >
                {setting_up ? <span>Submitting <i className="fa fa-spinner fa-spin"></i></span> : 'Submit' }
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSetUpForm;