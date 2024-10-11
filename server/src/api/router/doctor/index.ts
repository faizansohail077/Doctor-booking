import { Router } from 'express';
import { doctorController } from '../../controller';
import multer from 'multer'
const storage = multer.memoryStorage();

const upload = multer({
    storage, limits: {
        fileSize: 2 * 1024 * 1024
    }
})

const router = Router();
// address
router.get('/get_doctor_profile', doctorController.get_doctor_profile);
router.post('/create_doctor_address', doctorController.create_doctor_address);
router.put('/:id/update_doctor_address', doctorController.update_doctor_address);
router.delete('/:id/delete_doctor_address', doctorController.delete_doctor_address);

// profile

router.post('/create_doctor_profile', upload.single('profile_image'), doctorController.create_doctor_profile);
router.put('/:id/update_doctor_profile', doctorController.update_doctor_profile);
router.delete('/:id/delete_doctor_profile', doctorController.delete_doctor_profile);

export { router as doctorRouter };