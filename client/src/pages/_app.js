import "@/styles/globals.css";
import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebase';
import { useEffect } from "react";
import { getFCMToken } from "@/services/operations/import { getFCMToken } from '@/notificationAPI";

export default function App({ Component, pageProps }) {

  async function requestPermission(){
    
    try{
     const permission = await Notification.requestPermission()
     if(permission === "granted"){
       //Generate Token
      const token = await getToken(messaging, {vapidKey:process.env.NEXT_PUBLIC_VAPID_KEY})
     await getFCMToken(token)
      console.log("Token Gen", token)
     } else if(permission === "denied"){
       alert("You denied permission for notification")
     }
    }catch(err){
     
    }
   }
   useEffect(() =>{
     requestPermission()
   }, [])

  return <Component {...pageProps} />;
}
