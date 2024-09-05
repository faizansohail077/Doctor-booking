import { Router } from 'express';
import { publicController } from '../../controller';

const router = Router();

router.post('/create_user', publicController.create_user);
router.post('/login_user', publicController.login_user);


export { router as publicRouter };