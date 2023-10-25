import controllers from '../controllers';
import express from 'express';

const router = express.Router();

// Character endpoints
router.route('/characters').get(controllers.getAllCharacters);
router.route('/character').get(controllers.getCharacter).patch(controllers.updateCharacter);

export default router;
