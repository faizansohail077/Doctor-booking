import { Router } from 'express';
import { doctorController } from '../../controller';

const router = Router();
// address
router.get('/get_doctor_profile', doctorController.get_doctor_profile);
router.post('/create_doctor_address', doctorController.create_doctor_address);
router.put('/:id/update_doctor_address', doctorController.update_doctor_address);
router.delete('/:id/delete_doctor_address', doctorController.delete_doctor_address);

// profile

router.post('/create_doctor_profile', doctorController.create_doctor_profile);
router.put('/:id/update_doctor_profile', doctorController.update_doctor_profile);
router.delete('/:id/delete_doctor_profile', doctorController.delete_doctor_profile);

export { router as doctorRouter };