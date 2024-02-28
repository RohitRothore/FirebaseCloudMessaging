import mongoose from "mongoose";

const PushNotificationSchema =new mongoose.Schema({
token:{
    type:String,
    trim:true
},
companyId:{ 
    type:String,
    trim:true
},
userId:{
    type:String,
    trim:true
}
});

const PushNotification=mongoose.model("PushNotification",PushNotificationSchema);

export default PushNotification;