
import express from 'express';
import cardCtrl from '../controllers/card.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/cards')
    .post(authCtrl.requireSignin, cardCtrl.create);

router.route('/api/cards/:cardId/userId/:userId')
    .put(authCtrl.requireSignin, cardCtrl.update);

router.route('/api/userId/:userId/cards/:cardId')
    .delete(authCtrl.requireSignin, cardCtrl.remove);

router.route('/api/cards/by/:userId')
    .get(authCtrl.requireSignin, cardCtrl.listByUserId);

export default router;
