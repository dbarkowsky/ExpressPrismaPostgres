import { healthCheck } from './healthController';
import { getCharacter, getAllCharacters } from './characterController';

const characterControllers = {
  getCharacter,
  getAllCharacters,
};

export default {
  healthCheck,
  ...characterControllers,
};
