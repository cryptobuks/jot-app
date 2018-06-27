import axios from 'axios';
import {
  MAKE_SUBMISSION,
  MAKE_SUBMISSION_SUCCESS,
  FETCH_SUBMISSIONS,
  SELECT_SUBMISSION
} from "./types";

const ROOT_URL = 'https://shrouded-tundra-41496.herokuapp.com';

function makeSubmissionSuccess(dispatch) {
  dispatch({ type: MAKE_SUBMISSION_SUCCESS })
}

export function makeSubmission({ preface, body, token, user, prompt }) {
  return async (dispatch) => {
    try {
      dispatch({ type: MAKE_SUBMISSION });

      await axios({
        url: `${ROOT_URL}/prompts/${prompt.id}/submissions`,
        method: 'post',
        headers: { Authorization: token },
        data: {
          preface,
          body,
          user_id: user.id,
        }
      });

      makeSubmissionSuccess(dispatch);
    } catch (err) {
      console.log(err);
    }
  }
}

export function fetchSubmissions({ prompt, token }) {
  return async (dispatch) => {
    try {
      let { data } = await axios({
        url: `${ROOT_URL}/prompts/${prompt.id}/submissions`,
        method: 'get',
        headers: { Authorization: token }
      });

      dispatch({ type: FETCH_SUBMISSIONS, payload: data });
    } catch (err) {
      console.log(err);
    }
  }
}

export function selectSubmission(id) {
  return {
    type: SELECT_SUBMISSION,
    payload: id
  };
}