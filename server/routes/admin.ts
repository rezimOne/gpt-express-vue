import { Router } from 'express';
import { getMode } from '../controllers/admin'

const router = Router();

router.get('/mode', getMode)

export default router;