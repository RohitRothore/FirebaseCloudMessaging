
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// FCM PUSH NOTIFICATION....
export const pushNotificationEndpoints = {
    GET_FCM_TOKEN: BASE_URL + "/notification/get-fcm-token"
}