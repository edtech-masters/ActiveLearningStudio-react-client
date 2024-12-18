import axios from 'axios';

const assignmentSubmit = (assignmentId, userId, ltiUserId, submissionId, ltiEndpoint, result) => {
  axios({
    method: 'get',
    url: ltiEndpoint,
  }).then((response) => {
    const { data: { routes } } = response;
    const assignmentSubmissionEndpoint = routes['/lms/v1/assignment/submission']._links.self[0].href;
    axios({
      method: 'post',
      url: assignmentSubmissionEndpoint,
      data: {
        assignmentId, userId, ltiUserId, submissionId, result,
      },
    }).then((submissionResponse) => {
      console.log('submissionResponse >>>>> ', submissionResponse);
    });
  });
};

const assignmentAttempted = (assignmentId, userId, ltiEndpoint) => {
  axios({
    method: 'get',
    url: ltiEndpoint,
  }).then((response) => {
    const { data: { routes } } = response;
    const assignmentAttemptedEndpoint = routes['/lms/v1/assignment/attempted']._links.self[0].href;
    axios({
      method: 'post',
      url: assignmentAttemptedEndpoint,
      data: {
        assignmentId, userId,
      },
    }).then((attemptedResponse) => {
      console.log('attemptedResponse >>>>> ', attemptedResponse);
    });
  });
};

const gradeAssignment = (ltiEndpoint, data) => {
  axios({
    method: 'get',
    url: ltiEndpoint,
  }).then((response) => {
    const { data: { routes } } = response;
    const gradeByStudentEndpoint = routes['/lms/v1/assignment/submission/gradeByStudent']._links.self[0].href;
    axios({
      method: 'post',
      url: gradeByStudentEndpoint,
      data,
    }).then((responseGradeByStudentEndpoint) => {
      console.log('gradeByStudentEndpoint >>>>> ', responseGradeByStudentEndpoint);
    });
  });
};

export default { assignmentSubmit, assignmentAttempted, gradeAssignment };
