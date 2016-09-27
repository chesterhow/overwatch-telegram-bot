import fetch from 'node-fetch';
import { API_URL, HTTP_HEADERS } from '../constants';

const headers = HTTP_HEADERS;

export const fetchStats = (battletag) => {
  const url = `${API_URL}/${battletag}/stats`;

  return fetch(url, { headers })
    .then(response => response.json())
    .catch(error => console.log(error));
};
