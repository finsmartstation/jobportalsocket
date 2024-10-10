const adminJobseeker=require('firebase-admin');

const serviceAccountJobSeeker=require('../firebase_service_key/jobseeker.json');

const jobSeekerConfig=adminJobseeker.initializeApp({
    credential: adminJobseeker.credential.cert(serviceAccountJobSeeker),
    //name: "jobseeker-mob-app"
    projectId: "jobseeker-mob-app",
},"jobseeker-mob-app");


function sendJobSeekerNotification(user_id, device_token, title, body, profile_pic,message_type,room){
    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccountJobSeeker),
    //     name: 'jobseeker-mob-app'
    // });
    const message={
        tokens: device_token,
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
      console.log(message)
    const messaging=jobSeekerConfig.messaging();
    messaging.sendEachForMulticast(message)
    .then((response) => {
        console.log(response,response.successCount + ' messages were sent successfully');
        response.responses.forEach(element => {
            //console.log(element.error?element.error: '')
        });
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
}

//sendJobSeekerNotification('1',['c9_sfvFNRxC3dOoWUY1KMC:APA91bEATxttpqMzspkf3w3hdAiNLagNYVDjfDQG0sYX6GuyBK9qeJPWyJ7jdoy-5VrAVDDKuv-4dccvOyuY5rbkxbir02uEj-SoKQmczjptYm1Bh7jYd3_JulMa12vWtWq1uDlvREEH',],'test job seeker','test','q','q','q')

module.exports={
    sendJobSeekerNotification
}