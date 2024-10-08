import { Router } from 'express';
import { doctorController } from '../../controller';

const router = Router();

router.get('/get_doctor_profile', doctorController.get_doctor_profile);
router.post('/create_doctor_address', doctorController.create_doctor_address);

export { router as doctorRouter };