const FCM = require('fcm-node');
const baseURL=process.env.BASEURL;
const serverKeRecuriter = process.env.RECURITERFCMTOKEN; //put your server key here
const serverKeyJobSeeker=process.env.JOBSEEKERFCMTOKEN;
const fcmRecuriter = new FCM(serverKeRecuriter);
const fcmJobSeeker= new FCM(serverKeyJobSeeker);
const queries= require('../models/queries/queries');

async function sendNotification(user_id,receiver_id,room,message,message_type){
    //get receiver data
    var get_receiver_data=await queries.userDeviceToken(receiver_id);
    console.log('receiver data ',get_receiver_data);
    if(get_receiver_data.length>0){
        var UserProfile=await queries.UserProfile(user_id);
        console.log(UserProfile);
        if(message_type=='text'){
            message=message;
        }else if(message_type=='image'){
            message='Photo';
        }else if(message_type=='voice'){
            message='Audio';
        }else if(message_type=='video'){
            message='File';
        }else if(message_type=='doc'){
            message='File';
        }
        var access_id=get_receiver_data[0].access_id;
        var profile_pic=baseURL+'uploads/default/profile.png';
        var name='';
        if(UserProfile.length>0){
            if(UserProfile[0].profile_pic!=''){
                profile_pic=baseURL+UserProfile[0].profile_pic;
            }
            name=UserProfile[0].username.replace(/\s+$/, '');
        }
        //console.log(name)
        if(access_id==1){
            //job seeker
            
            //name=get_receiver_data[0].first_name+' '+get_receiver_data[0].middle_name+' '+get_receiver_data[0].last_name;
            for(var i=0; i<get_receiver_data.length; i++){
                var send_notification=sendJobSeekerNotification(receiver_id,get_receiver_data[i].user_fcm_token,name,message,profile_pic,message_type,room);
            }
        }else if(access_id==2){
            //receuriter
            // if(get_receiver_data[0].logo!=''){
            //     profile_pic=baseURL+get_receiver_data[0].logo;
            // }
           // name=get_receiver_data[0].first_name;
            for(var i=0; i<get_receiver_data.length; i++){
                console.log(get_receiver_data[i].user_fcm_token);
                var send_notification=sendRecuriterNotification(receiver_id,get_receiver_data[i].user_fcm_token,name,message,profile_pic,message_type,room);
            }
        }
    }
}

async function sendRecuriterNotification(user_id ,device_token, title, body, profile_pic,message_type,room){
    //console.log(device_token, title, body, type,profile_pic,message_type)
    const message={
      to: device_token,
      //collapse_key: 'Testing',
      notification: {
        title: title,
        body: body
      },
      data: { 
         user_id: user_id,
         title: title,
         message: body,
         profile_pic: profile_pic,
         message_format: message_type,
         room: room
        }
    }
    //console.log(message)
    try{
        fcmRecuriter.send(message,function(err, response){
            console.log(err)
          if (err) {
              console.log("Something has gone wrong!");
          } else {
              console.log("Successfully sent with response: ", response);
          }
        })
    }catch(fc){
        console.log(fc)
    }
}

async function sendJobSeekerNotification(user_id ,device_token, title, body, profile_pic,message_type,room){
    const message={
        to: device_token,
        //collapse_key: 'Testing',
        notification: {
            title: title,
            body: body,
        },
        data: { 
            user_id: user_id,
            title: title,
            message: body,
            profile_pic: profile_pic,
            message_format: message_type,
            room: room
            }
    }
    //console.log(message)
    try{
        fcmJobSeeker.send(message,function(err, response){
            console.log(err)
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
        })
    }catch(fc){
        console.log(fc)
    }
}

module.exports={
    sendNotification,
    sendRecuriterNotification,
    sendJobSeekerNotification
}