import { healthCheck } from './healthController';
import { 
  getAllCharacters,
  getCharacter,
  updateCharacter,
  addCharacter,
  deleteCharacter
} from './characterController';

const characterControllers = {
  getAllCharacters,
  getCharacter,
  updateCharacter,
  addCharacter,
  deleteCharacter
}

export default {
  healthCheck,
  ...characterControllers,
};
