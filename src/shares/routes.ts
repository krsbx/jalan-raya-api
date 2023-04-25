import { Router } from 'express';
import jalanRayaRoutes from '../components/jalan-raya/routes';

const router = Router();

router.use('/jalan-rayas', jalanRayaRoutes);

export default router;
