import { healthCheck } from './healthController';
import { 
  getAllCharacters,
  getCharacter,
  updateCharacter,
  addCharacter,
  deleteCharacter
} from './characterController';
import { 
  getAllSeries,
  getSeries,
  updateSeries,
  addSeries,
  deleteSeries
 } from './seriesController';

const characterControllers = {
  getAllCharacters,
  getCharacter,
  updateCharacter,
  addCharacter,
  deleteCharacter
}

const seriesControllers = {
  getAllSeries,
  getSeries,
  updateSeries,
  addSeries,
  deleteSeries
}

export default {
  healthCheck,
  ...characterControllers,
  ...seriesControllers,
};
