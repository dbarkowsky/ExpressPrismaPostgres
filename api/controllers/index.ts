import { healthCheck } from './healthController';
import {
  getCharacter,
  getAllCharacters,
  updateCharacter,
  addCharacter,
  deleteCharacter,
} from './characterController';

const characterControllers = {
  getCharacter,
  getAllCharacters,
  updateCharacter,
  addCharacter,
  deleteCharacter,
};

export default {
  healthCheck,
  ...characterControllers,
};
