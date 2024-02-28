import express from "express"
import { getFCMToken,  sendNotificationForAll, sendNotificationForOne } from "../controllers/pushNotificationController.js";
const router = express.Router()

router.post("/get-fcm-token",  getFCMToken);
router.post("/send-notification-all", sendNotificationForAll)
router.post("/send-notification-one", sendNotificationForOne)

export default router