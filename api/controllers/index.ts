import { healthCheck } from './healthController';
import { getAllCharacters, getCharacter } from './characterController';

const characterControllers = {
  getAllCharacters,
  getCharacter,
}

export default {
  healthCheck,
  ...characterControllers,
};
