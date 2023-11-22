const queries=require('../models/queries/queries');
var onlineUsers=[];
var onlineRooms=[];

async function joinRoom(user_id,receiver_id,socket_id){
    let response={};
    try{
        var room=createRoom(user_id,receiver_id)
        await makeOnlineUser(user_id,socket_id);
        await makeOnlineRoom(user_id,receiver_id,room);
        console.log('updated')
        //console.log('online users ',onlineUsers)
        response={
            status: true,
            statuscode: 200,
            message: 'success'
        }
        return room;
    }catch(err){
        console.error(`Room joining error ${err}`);
    }
}

function createRoom(user_id,receiver_id){
    var user_id=Number(user_id);
    var receiver_id=Number(receiver_id);
    var room='';
    if(user_id<receiver_id){
        room=user_id.toString()+receiver_id.toString();
    }else{
        room=receiver_id.toString()+user_id.toString();
    }
    return room;
}

async function makeOnlineUser(user_id,socket_id){
    if(!onlineUsers.includes(user_id)){
        onlineUsers[user_id]=socket_id;
        console.log('online users',onlineUsers)
        //update to db
        let update=await queries.updateUserIsOnline(user_id);
        console.log(update);
    }
}

async function makeOnlineRoom(user_id,receiver_id,room){
    //check online room data
    var check_room_data=await checkOnlineRoom(user_id,receiver_id,room);
    if(check_room_data==false){
        onlineRooms.push({
            user_id: user_id,
            receiver_id: receiver_id,
            room: room
        });
    }
}

async function userRoomData(user_id){
    console.log('active rooms',onlineRooms,user_id)
    var roomUsers=onlineRooms.filter(function(roomData){
        return roomData.user_id==user_id || roomData.receiver_id==user_id;
    });
    console.log(roomUsers)
    var roomData=[];
    var rooms=[];
    for(var i=0; i<roomUsers.length; i++){
        var opponent_id='';
        if(!rooms.includes(roomUsers[i].room)){
            console.log('new room')
            rooms.push(roomUsers[i].room);
            if(roomUsers[i].user_id==user_id){
                opponent_id=roomUsers[i].receiver_id;
            }else if(roomUsers[i].receiver_id==user_id){
                opponent_id=roomUsers[i].user_id;
            }
            roomData.push({
                user_id: opponent_id,
                room: roomUsers[i].room
            })
        }
    }
    return roomData;
}

async function checkOnlineRoom(user_id,receiver_id,room){
    return onlineRooms.some(function (roomData){
        return roomData.user_id==user_id && roomData.receiver_id==receiver_id && roomData.room==room;
    });
}

async function userOnlineStatusResponse(user_id){
    var response={};
    //get user last seen data
    var user_last_seen=await queries.userLastSeen(user_id);
    var last_seen='';
    if(user_last_seen.length>0){
        last_seen=user_last_seen[0].last_seen;
    }
    console.log('online users ',onlineUsers)
    if(onlineUsers[user_id]!=undefined){
        //user is online
        response={status: true, statuscode: 200, message: "success", online_status: "1", last_seen: last_seen};
    }else{
        //user is offline
        response={status: true, statusbar: 200, message: "success", online_status: "0", last_seen: last_seen};
    }
    return response;
}

async function checkUserData(user_id,access_token){
    var check_user_data=await queries.checkUserData(user_id,access_token);
    if(check_user_data.length>0){
        return true;
    }else{
        return false;
    }
}

async function disconnectUser(user_id){
    //console.log(user_id,onlineUsers);
    onlineUsers.splice(user_id,1);
    //update to db
    let update=await queries.updateUserIsOffline(user_id);
    //console.log(onlineUsers);
    onlineUsers[user_id]=undefined;
    //console.log('after making undefined index',onlineUsers);
    //console.log('zero',onlineUsers[0]);
    //console.log('removed user ',onlineUsers[user_id])
    var roomUsers=onlineRooms.filter(function(roomData){
        return roomData.user_id==user_id || roomData.receiver_id==user_id;
    });
    var roomData=[];
    var rooms=[];
    for(var i=0; i<roomUsers.length; i++){
        var opponent_id='';
        if(!rooms.includes(roomUsers[i].room)){
            console.log('new room')
            rooms.push(roomUsers[i].room);
            if(roomUsers[i].user_id==user_id){
                opponent_id=roomUsers[i].receiver_id;
            }else if(roomUsers[i].receiver_id==user_id){
                opponent_id=roomUsers[i].user_id;
            }
            roomData.push({
                user_id: opponent_id,
                room: roomUsers[i].room
            })
        }
    }
    console.log('filtered room data ',roomData);
    return roomData;
}

async function typingResponse(user_id,status){
    var userData=await queries.UserProfile(user_id);
    var username='';
    if(userData.length>0){
        username=userData[0].username.trim();
    }
    var response=[
        {
            status: true,
            statuscode: 200,
            message: 'success',
            user_id: user_id,
            typing: status
        },
        {
            status: true,
            statuscode: 200,
            message: 'success',
            user_id: user_id,
            typing: status,
            username: username
        }
    ];
    return response;
}

async function reportChat(user_id,access_token,receiver_id,room){
    var response={};
    var check_user=await queries.checkUserData(user_id,access_token);
    if(check_user.length){
        var report_chat=await queries.reportChat(user_id,receiver_id,room);
        if(report_chat>0){
            response={
                status: true,
                statuscode: 200,
                message: "success"
            }
        }else{
            response={
                status: false,
                statuscode: 400,
                message: "Not saved to db"
            }
        }
    }else{
        response={
            status: false,
            statuscode: 200,
            message: "No user data found"
        }
    }
    return response;
}


module.exports={
    joinRoom,
    createRoom,
    makeOnlineUser,
    userOnlineStatusResponse,
    checkUserData,
    makeOnlineRoom,
    userRoomData,
    disconnectUser,
    typingResponse,
    reportChat
}
