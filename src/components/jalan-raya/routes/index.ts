import { Router } from 'express';
import middlewares from '../middlewares';

const router = Router();

// GET /jalan-rayas
router.get(
  '/',
  middlewares.read.getJalanRayasMw,
  middlewares.response.returnJalanRayasMw
);

// GET /jalan-rayas/:id
router.get(
  '/:id',
  middlewares.read.getJalanRayaMw,
  middlewares.response.returnJalanRayaMw
);

export default router;
