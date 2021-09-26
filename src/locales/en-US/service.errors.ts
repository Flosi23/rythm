import serviceErrors from '../interfaces/service.errors';

/**
 * Errors caused by the services
 */
const serviceErrors: serviceErrors = {
  youtubeDefaultError: ':x: An error occured while fetching results',
  youtubeStatus400: ':x: The youtube server declined the request',
  youtubeStatus403: ':x: Something went wrong when authenticating',
  youtubeStatus404: ':x: No results found',
  youtubeStatus500: ':x: It seems like the youtube server has issues',
};

export default serviceErrors;
