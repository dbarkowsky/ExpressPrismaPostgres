import controllers from '../controllers';
import express from 'express';

const router = express.Router();

// series endpoints
router.route('/allSeries').get(controllers.getAllSeries);
  router
    .route('/series')
    .get(controllers.getSeries)
    .patch(controllers.updateSeries)
    .post(controllers.addSeries)
    .delete(controllers.deleteSeries);

export default router;