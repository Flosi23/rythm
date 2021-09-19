import {checkStringIsNotUndefined} from './convert';

interface youtubeConfig{
  API_KEY: string,
  BASE_URL: string,
  SID: string,
  SSID: string,
  HSID: string,
};

const youtubeConfig: youtubeConfig = {
  API_KEY: checkStringIsNotUndefined(process.env.YOUTUBE_API_KEY),
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  SID: checkStringIsNotUndefined(process.env.YT_SID),
  SSID: checkStringIsNotUndefined(process.env.YT_SSID),
  HSID: checkStringIsNotUndefined(process.env.YT_HSID),
};

export default youtubeConfig;
