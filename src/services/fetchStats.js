import fetch from 'node-fetch';
import { hashToHypen } from './formatText';
import { API_URL, HTTP_HEADERS } from '../constants';

const headers = HTTP_HEADERS;

const fetchStats = (battletag,platform) => {
  const url = `${API_URL}/${hashToHypen(battletag)}/blob?platform=${platform}`;

  return fetch(encodeURI(url), { headers })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default fetchStats;
