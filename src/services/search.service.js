import Swal from 'sweetalert2';

import config from 'config';
import httpService from './http.service';

const { apiVersion } = config;

const searchResult = (searchquerry, from, size) => httpService
// .get(`https://refactored.curriki.org/api/api/v1/search/advanced?from=${from}&size=${size}&query=${searchquerry}`)
  .get(`/${apiVersion}/search/advanced?from=${from}&size=${size}&query=${searchquerry}`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const cloneProject = (projectId) => httpService
  .post(`/${apiVersion}/projects/${projectId}/clone`)
  .then(({ data }) => Swal.fire("Project Clone is in progress. It will be available soon."))
  .catch((err) => Swal.fire(err.response.data.errors[0]));

const clonePlaylist = (projectId, playlistId) => httpService
  .post(`/${apiVersion}/projects/${projectId}/playlists/${playlistId}/clone`)
  .then(({ data }) => Swal.fire("Playlist Clone is in progress. It will be available soon."))
  .catch((err) => Swal.fire(err.response.data.errors[0]));

const cloneActivity = (playlistId, ActivityId) => httpService
  .post(`/${apiVersion}/playlists/${playlistId}/activities/${ActivityId}/clone`)
  .then(({ data }) => Swal.fire("Activity Clone is in progress. It will be available soon."))
  .catch((err) => Swal.fire(err.response.data.errors[0]));

const googleclassShare = (projectId) => httpService
  .post(`/${apiVersion}/google-classroom/projects/${projectId}/copy`)
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

const googleShareToken = (accessToken) => httpService
  .post(`/${apiVersion}/google-classroom/access-token`, {
    access_token: accessToken,
  })
  .then(({ data }) => data)
  .catch((err) => Promise.reject(err.response.data));

export default {
  searchResult,
  cloneProject,
  clonePlaylist,
  cloneActivity,
  googleclassShare,
  cloneActivity,
  googleShareToken,
  //searchResults
};