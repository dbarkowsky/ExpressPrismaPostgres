import controllers from '../controllers';
import express from 'express';

const router = express.Router();

// character endpoints
router.route('/characters').get(controllers.getAllCharacters);
 router
   .route('/character')
   .get(controllers.getCharacter)
   .patch(controllers.updateCharacter)
   .post(controllers.addCharacter)
   .delete(controllers.deleteCharacter);

export default router;