const queries=require('../models/queries/queries');
const utils=require('../utils/commonUtils');
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
    console.log(check_user_data)
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
        //get last message in the room
        var get_last_message=await queries.getLastMessage(user_id,room);
        var message_id=0;
        if(get_last_message.length>0){
            message_id=get_last_message[0].id;
        }
        var report_chat=await queries.reportChat(user_id,message_id,receiver_id,room);
        if(report_chat>0){
            response={
                status: true,
                statuscode: 200,
                message: "Reported successfully"
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

async function checkUserData(user_id,access_token){
    var check_user_data=await queries.checkUserData(user_id,access_token);
    if(check_user_data.length>0){
        return true;
    }else{
        return false;
    }
}

async function check_user_already_blocked(user_id,receiver_id){
    var check_user_data=await queries.check_user_already_blocked(user_id,receiver_id);
    // console.log('hi',check_user_data.length);
    // if(check_user_data.length>0){
    //     return true;
    // }else{
    //     return false;
    // }
    return check_user_data;
}

async function block_user_chat(user_id,receiver_id,room,datetime){
    console.log(user_id,receiver_id,room,datetime)
    var check_user_data=await queries.block_user_chat(user_id,receiver_id,room,datetime);
    return check_user_data;
}

async function save_block_message(message,message_type,room,room_type,senter_id,receiver_id,created_datetime,group_status){
    var check_user_data=await queries.save_block_message(message,message_type,room,room_type,senter_id,receiver_id,created_datetime,group_status);
    return check_user_data;
}

async function unblockUserChat(user_id,access_token,receiver_id,room){
    var response={};
    var current_datetime=utils.current_datetime();
    //check user data
    var check_user_data=await queries.checkUserData(user_id,access_token);
    console.log(check_user_data)
    if(check_user_data.length>0){
        //check user already block
        var check_user_already_blocked=await queries.check_user_already_blocked(user_id,receiver_id);
        console.log(check_user_already_blocked)
        if(check_user_already_blocked.length>0){
            //remove from blocked chat list
            var unblock=await queries.unblockChat(check_user_already_blocked[0].id,user_id,receiver_id,room);
            console.log('block response',unblock)
            if(unblock.affectedRows>0){
                //save message
                var message_data=[
                    {
                        user_id: user_id,
                        datetime: current_datetime,
                        delivered_status: 1,
                        delivered_datetime: current_datetime,
                        read_status: 1,
                        read_datetime: current_datetime,
                        status: 1
                    }
                ];
                var save_block_message=await queries.saveUnblockMessage('unblock','notification',room,0,user_id,receiver_id,current_datetime,JSON.stringify(message_data));
                console.log('saved message res ',save_block_message)
                if(save_block_message>0){
                    response={
                        status: true,
                        statuscode: 200,
                        message: "Unblocked successfully",
                        room: room
                    }
                }else{
                    response={
                        status: false,
                        statuscode: 400,
                        message: "Unblock message not saved",
                        room: room
                    }
                }
            }else{
                response={
                    status: false,
                    statuscode: 400,
                    message: "Not updated in db",
                    room: room
                }
            }
        }else{
            response={
                status: false,
                statuscode: 200,
                message: "User not blocked",
                room: room
            }
        }
    }else{
      response={
        status: false,
        statuscode: 200,
        message: "No user data found",
        room: room
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
    reportChat,
    check_user_already_blocked,
    block_user_chat,
    save_block_message,
    unblockUserChat
}
