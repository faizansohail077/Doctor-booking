import { Router } from 'express';
import { doctorController } from '../../controller';

const router = Router();

router.get('/doctor_profile', doctorController.get_doctor_profile);
router.post('/doctor_profile', doctorController.create_doctor_address);

export { router as doctorRouter };