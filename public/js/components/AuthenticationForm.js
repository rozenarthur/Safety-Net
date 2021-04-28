import React from 'react';
import TextFieldGroup from './shared/TextFieldGroup';

const AuthenticationForm = ({authentication, updateAuthenticationForm, authenticating, authenticateRequest, securityQuestions}) => {

  const sq1 = securityQuestions[0];
  const sq2 = securityQuestions[1];
  const sq3 = securityQuestions[2];
  return (
    <div>
      <form onSubmit={authenticateRequest}>
        <img className="logo center-block" src="../../img/safetynetlogo2.png"/>
        <div className="panel panel-default">
          <div className="panel-body">
            <p>Please answer your set security questions to access the network.</p>
            < TextFieldGroup
              value={authentication.answer1}
              label={sq1['security_question']}
              onChange={updateAuthenticationForm}
              placeholder="Answer"
              field='answer1'
            />
            < TextFieldGroup
              value={authentication.answer2}
              label={sq2['security_question']}
              onChange={updateAuthenticationForm}
              placeholder="Answer"
              field='answer2'
            />
            < TextFieldGroup
              value={authentication.answer3}
              label={sq3['security_question']}
              onChange={updateAuthenticationForm}
              placeholder="Answer"
              field='answer3'
            />
            <br/>
            <div className="form-group">
              <button className="btn btn-default center-block" type="submit">
                {authenticating ? <span>Submitting <i className="fa fa-spinner fa-spin"></i></span> : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationForm;