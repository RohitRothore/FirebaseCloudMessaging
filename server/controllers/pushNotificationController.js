import PushNotification from "../models/pushNotification.Model.js";
import FCM from "fcm-node";

export const getFCMToken = async (req, res) => {
    try {
        const {token} = req.body
        const alreadyExistToken = await PushNotification.findOne({ token })
        if(alreadyExistToken){
            return res.status(400).json({ success: false, message: "token already exist" })
        }
        const fcmToken =await PushNotification.create({ token:token, userId:req.id });
        console.log("fcm token", req.body.token);
        return res.status(201).json({ success: true, fcmToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const sendNotificationForAll = async (req, res) => {
    try {
        const fcm = new FCM(process.env.SERVER_KEY);
        const push_tokens = await PushNotification.find();
        const regIds = push_tokens.map((token) => token.token);
        console.log("regIds", regIds)
        if (regIds.length > 0) {
            const pushMessage = {
                registration_ids: regIds,
                notification: {
                    body: req.body.message,
                    icon: "myicon",
                    sound: "mySound",
                    // badge: badgeCount, example:1 or 2 or 3 or etc....
                },
                // data: {
                //   notification_type: 5,
                //   conversation_id:inputs.user_id,
                // }
            };
            
            fcm.send(pushMessage, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Push notification sent.", response);
                }
            });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

export const sendNotificationForOne = async (req, res) => {
    try {
        const fcm = new FCM(process.env.SERVER_KEY);
        const fcmToken = await PushNotification.find({ userId: req.body.userId });

        if (!fcmToken) {
            return res.status(400).json({ message: "Token Not Found", success: false });
        }
       const tokenArr = fcmToken.map((token) => token.token) 
        console.log("tokenArr", tokenArr)
        const pushMessage = {
            registration_ids: tokenArr,
            notification: {
                title: req.body.title,
                body: req.body.message,
                icon: "ptf-Favicon.png",
                sound: "mySound",
                // badge: badgeCount, example:1 or 2 or 3 or etc....
            },
            // data: {
            //   notification_type: 5,
            //   conversation_id: inputs.user_id,
            // }
        };

        fcm.send(pushMessage, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Push notification sent.", response);
            }
        });

        return res.status(200).json({ success: true, message: "Notification sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

