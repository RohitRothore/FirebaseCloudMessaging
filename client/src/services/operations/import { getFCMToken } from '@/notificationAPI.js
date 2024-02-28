import { apiConnector } from "@/services/apiConnector";
import { pushNotificationEndpoints } from "@/services/apiEndpoints";


const {GET_FCM_TOKEN} = pushNotificationEndpoints

export async function getFCMToken(token, userToken){
console.log("fcm token", token)
        try{
            const response = await apiConnector("POST", GET_FCM_TOKEN, {token}, { Authorization: `Bearer ${userToken}`,}
            )
            if(!response.data.success){ 
                throw new Error(response.data.message)
            }
            console.log("fcm-token.......",response.data)
        }catch(error){
            console.log("SEND FCM TOKEN ERROR....", error)
        }
}