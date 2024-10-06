import { Router } from 'express';
import { publicController } from '../../controller';

const router = Router();

router.post('/create_user', publicController.create_user);
router.post('/login_user', publicController.login_user);
router.post('/create_doctor', publicController.create_doctor);


export { router as publicRouter };