import {envVarToNumber} from './convert';

interface serverConfig {
  PORT: number,
}

const serverConfig: serverConfig = {
  PORT: envVarToNumber(process.env.PORT),
};

export default serverConfig;
