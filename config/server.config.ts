import {envVarToNumber} from './convert';

export default {
  PORT: envVarToNumber(process.env.PORT),
};
