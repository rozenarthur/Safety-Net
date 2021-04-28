export const FETCH_SECURITY_QUESTIONS = 'FETCH_SECURITY_QUESTIONS';
export const FETCH_SECURITY_QUESTIONS_SUCCESS = 'FETCH_SECURITY_QUESTIONS_SUCCESS';
export const FETCH_SECURITY_QUESTIONS_FAILURE = 'FETCH_SECURITY_QUESTIONS_FAILURE';

export function fetchSecurityQuestions() {
  return {
    type: FETCH_SECURITY_QUESTIONS
  }
}

export function fetchSecurityQuestionsSuccess(data) {
  return {
    type: FETCH_SECURITY_QUESTIONS_SUCCESS,
    payload: data
  }
}

export function fetchSecurityQuestionsFailure(data) {
  return {
    type: FETCH_SECURITY_QUESTIONS_FAILURE,
    payload: data
  }
}