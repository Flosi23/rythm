import {checkStringIsNotUndefined} from './convert';

interface youtubeConfig{
  API_KEY: string,
  API_BASE_URL: string,
  YT_VIDEO_BASE_URL: string,
};

const youtubeConfig: youtubeConfig = {
  API_KEY: checkStringIsNotUndefined(process.env.YOUTUBE_API_KEY),
  API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
  YT_VIDEO_BASE_URL: 'https://youtube.com/watch?v=',
};

export default youtubeConfig;
