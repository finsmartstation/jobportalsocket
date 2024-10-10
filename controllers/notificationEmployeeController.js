const adminEmployee=require('firebase-admin');

const serviceAccountEmployee=require('../firebase_service_key/employee.json');
const employeeConfig=adminEmployee.initializeApp({
    credential: adminEmployee.credential.cert(serviceAccountEmployee),
    //name: 'employee-mob'
});

function sendEmployeeNotification(user_id ,device_token, title, body, profile_pic,message_type,room){
    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccountEmployee),
    //     //name: 'employee-mob'
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
    const messaging=employeeConfig.messaging();
    //const registrationToken = 'dV4v2X-UQQSA0zSqP4Naf9:APA91bFvLjARTVx4OW93HMpHveeuqBrNuBYqORK1cp6dsGClze7VFhW4fjpwJ9Vp58cectFIfvbG24q_dkX8uzMy7WG9YhG19S4nAmva1a0XBaPLcQlACH1k08llZGtI89O5mTOO617Z';

    // const message = {
    //     "notification": {
    //     "title": "Breaking News",
    //     "body": "New news story available."
    //     },
    // data: {
    //     score: '850',
    //     time: '2:45'
    // },
    // token: registrationToken
    // };

    // Send a message to the device corresponding to the provided
    // registration token.
    messaging.sendEachForMulticast(message)
    .then((response) => {
        console.log(response,response.successCount + ' messages were sent successfully');
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
}

//sendEmployeeNotification('1' ,['dV4v2X-UQQSA0zSqP4Naf9:APA91bFvLjARTVx4OW93HMpHveeuqBrNuBYqORK1cp6dsGClze7VFhW4fjpwJ9Vp58cectFIfvbG24q_dkX8uzMy7WG9YhG19S4nAmva1a0XBaPLcQlACH1k08llZGtI89O5mTOO617Z'], 'test-E', 'test', '','','');

module.exports={
    sendEmployeeNotification
}

