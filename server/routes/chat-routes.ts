import { Router } from 'express';
import { getChatSessionStatus, postChatCompletion } from '../controllers/chat'

const router = Router();

router.get('/chat/session-status', getChatSessionStatus)
router.post('/chat/chat-completion', postChatCompletion)

export default router;