import { healthCheck } from './healthController';
import { getCharacter, getAllCharacters, updateCharacter } from './characterController';

const characterControllers = {
  getCharacter,
  getAllCharacters,
  updateCharacter,
};

export default {
  healthCheck,
  ...characterControllers,
};
