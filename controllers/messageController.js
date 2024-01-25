const queries=require('../models/queries/queries');
const utils=require('../utils/commonUtils');
const env=require('dotenv').config();
const baseURL=process.env.BASEURL;
const notificationController=require('./notificationController');

async function sendMessage(user_id,receiver_id,room,room_type,message,message_type,optional_text,duration,thumbnail,message_id=0,file_size){
    var current_datetime=utils.current_datetime();
    var user_blocked_status=false;
    var delivered_status=0;
    var read_status=0;
    var message_data=[];
    //check receiver blocked this user
    var check_receiver_blocked=await queries.checkUserBlocked(receiver_id,user_id,room);
    console.log('block status data',check_receiver_blocked)
    if(check_receiver_blocked.length>0){
        user_blocked_status=true;
        message_data=[{
            user_id: user_id,
            datetime: current_datetime,
            delivered_status: 1,
            delivered_datetime: current_datetime,
            read_status: 1,
            read_datetime: current_datetime,
            status: 1
        }];
    }else{
        message_data=[{
            user_id: user_id,
            datetime: current_datetime,
            delivered_status: 1,
            delivered_datetime: current_datetime,
            read_status: 1,
            read_datetime: current_datetime,
            status: 1
        },
        {
            user_id: receiver_id,
            datetime: current_datetime,
            delivered_status: 0,
            delivered_datetime: '',
            read_status: 0,
            read_datetime: '',
            status: 1 
        }]; 
    }

    console.log('data after loop', user_blocked_status,message_data)
    
    // var message_data=[{
    //     user_id: user_id,
    //     datetime: current_datetime,
    //     delivered_status: 1,
    //     delivered_datetime: current_datetime,
    //     read_status: 1,
    //     read_datetime: current_datetime,
    //     status: 1
    // },
    // {
    //     user_id: receiver_id,
    //     datetime: current_datetime,
    //     delivered_status: 0,
    //     delivered_datetime: '',
    //     read_status: 0,
    //     read_datetime: '',
    //     status: 1 
    // }];
    //check same date room message already exist
    //  var current_date=utils.current_date();
    //  console.log('current date: ',current_date);
    // var check_date_message=await queries.check_date_message_exist(room,current_date);
    // console.log('date entry count ',check_date_message.length);
    // if(check_date_message.length==0){
    //     var save_date_message
    // }
    if(message_type=='text'){
        var save_message=await queries.saveTextMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,delivered_status,read_status,JSON.stringify(message_data),message_id);
    }else if(message_type=='image'){
        var save_message=await queries.saveImageMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,delivered_status,read_status,JSON.stringify(message_data),message_id,file_size);
    }else if(message_type=='doc'){
        var save_message=await queries.saveDocMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,delivered_status,read_status,JSON.stringify(message_data),message_id,file_size);
    }else if(message_type=='video'){
        var save_message=await queries.saveVideoMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,duration,delivered_status,read_status,JSON.stringify(message_data),message_id,file_size);
    }else if(message_type=='voice'){
        var save_message=await queries.saveVoiceMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,duration,delivered_status,read_status,JSON.stringify(message_data),message_id,file_size);
    }
    //send notification
    let send_notification=await notificationController.sendNotification(user_id,receiver_id,room,message,message_type);
    return [save_message,user_blocked_status];
}

async function roomChatMessage(user_id,receiver_id,room,limit=0,last_message_id){
    console.log(user_id,receiver_id,room)
    if(limit==0 && last_message_id==''){
        //show all message in the room
        console.log('all messages')
        var roomMessages=await queries.userRoomChatAllMessage(user_id,room);
    }else if(limit==1 && last_message_id==''){
        //show only last single message
        console.log('only last message')
        var roomMessages=await queries.userRoomChatLastMessage(user_id,room,limit);
    }else if(limit>=1 && last_message_id==0){
        //pagination starting message
        console.log('pagination starting message');
        var roomMessages=await queries.userRoomChatLastMessage(user_id,room,limit);
        roomMessages.reverse();
    }else if(limit>=1 && last_message_id!=0){
        //show messages based on page number and limit
        console.log('pagination')
        // let pagenumber=(page_number-1)*limit;
        // console.log(page_number)
        var roomMessages=await queries.userRoomChatMessageUsingPagination(user_id,room,limit,last_message_id);
        roomMessages.reverse();
    }
    console.log(roomMessages);
    //exit ()
    //get opponent user data
    var user_name='';
    var profile_pic=baseURL+'uploads/default/profile.png';
    var get_user_profile=await queries.UserProfile(receiver_id);
    var unique_id='';
    if(get_user_profile.length>0){
        user_name=get_user_profile[0].username.trim();
        unique_id=get_user_profile[0].unique_id;
        if(get_user_profile[0].profile_pic!=''){
            profile_pic=baseURL+get_user_profile[0].profile_pic;
        }
    }
    var user_block_status=0;
    var check_user_block=await queries.checkUserBlocked(user_id,receiver_id,room);
    if(check_user_block.length>0){
        user_block_status=1;
    }
    //console.log(get_user_profile);
    var response_data=[];
    var message_list=[];
    if(roomMessages!=undefined){
        for(var i=0; i<roomMessages.length; i++){
            //check replay message
            var replay_message='';
            var replay_message_type='';
            var replay_senter='';
            var replay_duration=0;
            var replay_thumbnail='';
            var forwarded_count=0;
            var message_status=0;
            var replay_file_size='';
            if(roomMessages[i].replay_id!=0){
                var replay_message_details=await queries.getReplayMessageDetails(roomMessages[i].replay_id);
                console.log(replay_message_details)
                if(replay_message_details.length>0){
                    replay_message=replay_message_details[0].message;
                    replay_message_type=replay_message_details[0].message_type;
                    replay_senter=replay_message_details[0].senter_id;
                    replay_duration=replay_message_details[0].duration;
                    replay_thumbnail=replay_message_details[0].replay_thumbnail;
                    replay_file_size=replay_message_details[0].file_size;
                    if(replay_message_type=='image' || replay_message_type=='voice' || replay_message_type=='doc'){
                        if(replay_message!=''){
                            console.log(baseURL);
                            replay_message=baseURL+replay_message;
                        }
                    }
                    if(replay_message_type=='video'){
                        if(replay_thumbnail!=''){
                            replay_message=baseURL+replay_thumbnail;
                            console.log('replay ',replay_message);
                        }
                    }
                    if(replay_senter==user_id){
                        replay_senter='You';
                    }else{
                        replay_senter=user_name;
                    }
                }
            }
            //check forward message
            if(roomMessages[i].forward_id!=0){
                //get forward message count
                var forward_message_count=await queries.forwardMessageCount(roomMessages[i].forward_id);
                console.log('forward message count',forward_message_count);
                if(forward_message_count.length>0){
                    forwarded_count=forward_message_count[0].forwarded_count;
                }
            }
            if(roomMessages[i].delivered_status==0){
                //not delivered
                message_status=0;
            }else{
                if(roomMessages[i].read_status==0){
                    //delivered
                    message_status=1;
                }else{
                    //read
                    message_status=2;
                }
            }
            console.log('message status ',message_status)
            if(roomMessages[i].message_type=='voice' || roomMessages[i].message_type=='video' || roomMessages[i].message_type=='image' || roomMessages[i].message_type=='doc'){
                if(roomMessages[i].message!=''){
                    roomMessages[i].message=baseURL+roomMessages[i].message;
                }
            }else if(roomMessages[i].message_type=='notification'){
                //console.log('yes',roomMessages[i].message)
                if(roomMessages[i].message=='block'){
                    roomMessages[i].message='You bloked this user.';
                }else if(roomMessages[i].message=='unblock'){
                    roomMessages[i].message='You unblocked this user.'
                }
            }

            message_list.push({
                id: roomMessages[i].id.toString(),
                created_datetime: roomMessages[i].created_datetime,
                senter_id: roomMessages[i].senter_id.toString(),
                receiver_id: roomMessages[i].receiver_id.toString(),
                type: roomMessages[i].type,
                message: roomMessages[i].message,
                message_type: roomMessages[i].message_type,
                duration: roomMessages[i].duration.toString(),
                message_status: message_status.toString(),
                room: roomMessages[i].room.toString(),
                replay_id: roomMessages[i].replay_id.toString(),
                replay_message: replay_message,
                replay_message_type: replay_message_type,
                replay_senter: replay_senter,
                replay_duration: replay_duration.toString(),
                replay_file_size: replay_file_size,
                forward_id: roomMessages[i].forward_id.toString(),
                forwarded_count: forwarded_count.toString(),
                optional_text: roomMessages[i].optional_text,
                thumbnail: roomMessages[i].thumbnail,
                file_size: roomMessages[i].file_size
            });
        }
        //console.log(roomMessages)
    }
    response_data={
        status: true,
        statuscode: 200,
        message: 'success',
        data: {
           username: user_name,
           profile_pic: profile_pic,
           user_block_status: user_block_status.toString(),
           unique_id: unique_id,
           list: message_list
        }
    }

    return response_data;
}

async function chatListResponse(user_id,access_token){
    var response={};
    var check_user_data=await queries.checkUserData(user_id,access_token);
    if(check_user_data.length>0){
        var chat_list=[];
        var recent_chat_list=await queries.recentChatList(user_id);
        console.log(recent_chat_list);
        for(var i=0; i<recent_chat_list.length; i++){
            var profile_pic=baseURL+'uploads/default/profile.png';
            if(recent_chat_list[i].profile_pic!=''){
                profile_pic=baseURL+recent_chat_list[i].profile_pic;
            }
            if(recent_chat_list[i].message_type=='notification'){
                if(recent_chat_list[i].message=='block'){
                    recent_chat_list[i].message='You blocked this user';
                }else if(recent_chat_list[i].message=='unblock'){
                    recent_chat_list[i].message='You unblocked this user';
                }
            }
            chat_list.push({
                id: recent_chat_list[i].id.toString(),
                datetime: recent_chat_list[i].created_datetime,
                user_id: recent_chat_list[i].user_id.toString(),
                username: recent_chat_list[i].username.trim(),
                unique_id: recent_chat_list[i].unique_id,
                profile_pic: profile_pic,
                room: recent_chat_list[i].room.toString(),
                message: recent_chat_list[i].message,
                message_type: recent_chat_list[i].message_type,
                unread_message: recent_chat_list[i].unread_message.toString()
            });
        }
        //console.log(chat_list)
        response={
            status: true,
            statuscode: 200,
            message: 'success',
            data: chat_list
        }
    }else{
        response={
            status: false,
            statuscode: 200,
            message: 'No user data found',
            data: []
        }
    }
    return response;
}

async function chatListResponseWithoutToken(user_id){
    var response={};
    var chat_list=[];
    var recent_chat_list=await queries.recentChatList(user_id);
    //console.log(recent_chat_list);
    for(var i=0; i<recent_chat_list.length; i++){
        var profile_pic=baseURL+'uploads/default/profile.png';
        if(recent_chat_list[i].profile_pic!=''){
            profile_pic=baseURL+recent_chat_list[i].profile_pic;
        }
        if(recent_chat_list[i].message_type=='notification'){
            if(recent_chat_list[i].message=='block'){
                recent_chat_list[i].message='You blocked this user';
            }else if(recent_chat_list[i].message=='unblock'){
                recent_chat_list[i].message='You unblocked this user';
            }
        }
        chat_list.push({
            id: recent_chat_list[i].id.toString(),
            datetime: recent_chat_list[i].created_datetime,
            user_id: recent_chat_list[i].user_id.toString(),
            username: recent_chat_list[i].username.trim(),
            unique_id: recent_chat_list[i].unique_id,
            profile_pic: profile_pic,
            room: recent_chat_list[i].room.toString(),
            message: recent_chat_list[i].message,
            message_type: recent_chat_list[i].message_type,
            unread_message: recent_chat_list[i].unread_message.toString()
        });
    }
    //console.log(chat_list)
    response={
        status: true,
        statuscode: 200,
        message: 'success',
        data: chat_list
    }
    return response;
}

async function messageDelivered(user_id,access_token){
    var response={};
    var emit_data=[];
    var response_data=[];
    var check_user_data=await queries.checkUserData(user_id,access_token);
    var current_datetime= utils.current_datetime();
    //console.log('current datetime',current_datetime)
    if(check_user_data.length>0){
        var not_delivered_messages=await queries.notDeliveredMessages(user_id);
        console.log(not_delivered_messages);
        if(not_delivered_messages.length>0){
            var ids='';
            var delivered_status_case='';
            var message_data_case='';
            for(var i=0; i<not_delivered_messages.length; i++){
                var message_data=JSON.parse(not_delivered_messages[i].message_data);
                var id=not_delivered_messages[i].id;
                //console.log(not_delivered_messages[i].id,message_data);
                var update_message_delivered=false;
                for(var j=0;j<message_data.length;j++){
                    //console.log(message_data[j])
                    if(message_data[j].user_id==user_id && message_data[j].delivered_status==0){
                        //console.log('not delivered');
                        message_data[j].delivered_status=1;
                        message_data[j].delivered_datetime=current_datetime;
                        update_message_delivered=true;
                    }
                }
                //console.log(update_message_delivered)
                //UPDATE chat_list SET status = (case when id = '1' then '622057' when id = '2' then '2913659' when id = '3' then '6160230' end) WHERE id in ('1', '2', '3');
                if(update_message_delivered){
                    ids=ids+"'"+id+"',";
                    delivered_status_case=delivered_status_case+" when id='"+id+"' then '1'";
                    message_data_case=message_data_case+" when id='"+id+"' then '"+JSON.stringify(message_data)+"'";
                    //check same user and room already exist
                    var check_same_user_and_room_exist=await utils.check_same_user_and_room_exist(not_delivered_messages[i].senter_id,not_delivered_messages[i].room,emit_data);
                    console.log(check_same_user_and_room_exist)
                    if(check_same_user_and_room_exist==false){
                        emit_data.push({
                            user_id: not_delivered_messages[i].senter_id,
                            room: not_delivered_messages[i].room 
                        })
                    }
                }
            }
            //console.log(ids,delivered_status_case);
            ids=ids.replace(/(^,)|(,$)/g, "");
            //console.log(ids)
            if(ids!=''){
                //set query
                var query="update `chat_list` set delivered_status=(case "+delivered_status_case+" end), message_data=(case "+message_data_case+" end) where id in ("+ids+")";
                var executeUpdateQuery=await queries.executeUpdateQuery(query);
                console.log(executeUpdateQuery);
                if(executeUpdateQuery.affectedRows>0){
                    console.log('success');
                    response={
                        status: true,
                        statuscode: 200,
                        message: 'Success'
                    }
                }else{
                    response={
                        status: false,
                        statuscode: 200,
                        message: 'Not updated to db'
                    }
                }
            }
        }else{
            response={
                status: false,
                statuscode: 200,
                message: 'No message to deliver'
            }
        }
    }else{
        response={
            status: false,
            statuscode: 200,
            message: 'No user data found'
        }
    }
    //console.log(response)
    response_data.push(response);
    response_data.push(emit_data);
    return response_data;
}

async function messageRead(user_id,room){
    var response={};
    var notReadMessage=await queries.notReadMessage(user_id,room);
    var current_datetime= utils.current_datetime();
    console.log(notReadMessage);
    if(notReadMessage.length>0){
        var ids='';
        var read_status_case='';
        var message_data_case='';
        var read_datetime_case='';
        for(var i=0; i<notReadMessage.length; i++){
            var message_data=JSON.parse(notReadMessage[i].message_data);
            var id=notReadMessage[i].id;
            var update_read_status=false;
            for(var j=0; j<message_data.length; j++){
                if(message_data[j].user_id==user_id && message_data[j].read_status==0){
                    message_data[j].read_status=1;
                    message_data[j].read_datetime=current_datetime;
                    update_read_status=true;
                }
            }
            if(update_read_status){
                  ids=ids+"'"+id+"',";  
                  read_status_case=read_status_case+" when id='"+id+"' then '1'";
                  read_datetime_case=read_datetime_case+" when id='"+id+"' then '"+current_datetime+"'";
                  message_data_case=message_data_case+" when id='"+id+"' then '"+JSON.stringify(message_data)+"'";
            }
        }
        ids=ids.replace(/(^,)|(,$)/g, "");
        // console.log('id',ids)
        // console.log('read_status',read_status_case);
        // console.log('read datetime',read_datetime_case);
        // console.log('message data',message_data_case);
        if(ids!=''){
            var query="update `chat_list` set read_status=(case "+read_status_case+" end), read_datetime=(case "+read_datetime_case+" end), message_data=(case "+message_data_case+" end) where id in ("+ids+")";
            //console.log(query)
            var executeUpdateQuery=await queries.executeUpdateQuery(query);
            if(executeUpdateQuery.affectedRows>0){
                response={
                    status: true,
                    statuscode: 200,
                    message: 'Success'
                } 
            }else{
                response={
                    status: false,
                    statuscode: 200,
                    message: 'No message to read'
                } 
            }
        }else{
            response={
                status: false,
                statuscode: 200,
                message: 'No message to read'
            }   
        }
    }else{
        response={
            status: false,
            statuscode: 200,
            message: 'No message to read'
        }  
    }
    return response;
}

async function searchRoomMessage(user_id,receiver_id,room,search){
    var roomMessages=await queries.searchRoomMessage(user_id,room,search);
    var user_name='';
    var unique_id='';
    var profile_pic=baseURL+'uploads/default/profile.png';
    var get_user_profile=await queries.UserProfile(receiver_id);
    if(get_user_profile.length>0){
        user_name=get_user_profile[0].username.trim();
        unique_id=get_user_profile[0].unique_id;
        if(get_user_profile[0].profile_pic!=''){
            profile_pic=baseURL+get_user_profile[0].profile_pic;
        }
    }
    var user_block_status=0;
    var check_user_block=await queries.checkUserBlocked(user_id,receiver_id,room);
    if(check_user_block.length>0){
        user_block_status=1;
    }
    console.log(get_user_profile);
    var response_data=[];
    var message_list=[];
    for(var i=0; i<roomMessages.length; i++){
        //check replay message
        var replay_message='';
        var replay_message_type='';
        var replay_senter='';
        var replay_duration=0;
        var replay_thumbnail='';
        var forwarded_count=0;
        var message_status=0;
        var replay_file_size='';
        if(roomMessages[i].replay_id!=0){
            var replay_message_details=await queries.getReplayMessageDetails(roomMessages[i].replay_id);
            console.log(replay_message_details)
            if(replay_message_details.length>0){
                replay_message=replay_message_details[0].message;
                replay_message_type=replay_message_details[0].message_type;
                replay_senter=replay_message_details[0].senter_id;
                replay_duration=replay_message_details[0].duration;
                replay_thumbnail=replay_message_details[0].replay_thumbnail;
                replay_file_size=replay_message_details[0].file_size;
                if(replay_message_type=='image' || replay_message_type=='voice' || replay_message_type=='doc'){
                    if(replay_message!=''){
                        replay_message=baseURL+replay_message;
                    }
                }
                if(replay_message_type=='video'){
                    if(replay_thumbnail!=''){
                        replay_message=baseURL+replay_thumbnail;
                    }
                }
                if(replay_senter==user_id){
                    replay_senter='You';
                }else{
                    replay_senter=user_name;
                }
            }
        }
        //check forward message
        if(roomMessages[i].forward_id!=0){
            //get forward message count
            var forward_message_count=await queries.forwardMessageCount(roomMessages[i].forward_id);
            console.log('forward message count',forward_message_count);
            if(forward_message_count.length>0){
                forwarded_count=forward_message_count[0].forwarded_count;
            }
        }
        if(roomMessages[i].delivered_status==0){
            //not delivered
            message_status=0;
        }else{
            if(roomMessages[i].read_status==0){
                //delivered
                message_status=1;
            }else{
                //read
                message_status=2;
            }
        }
        console.log('message status ',message_status)
        if(roomMessages[i].message_type=='voice' || roomMessages[i].message_type=='video' || roomMessages[i].message_type=='image' || roomMessages[i].message_type=='doc'){
            if(roomMessages[i].message!=''){
                roomMessages[i].message=baseURL+roomMessages[i].message;
            }
        }

        message_list.push({
            id: roomMessages[i].id.toString(),
            created_datetime: roomMessages[i].created_datetime,
            senter_id: roomMessages[i].senter_id.toString(),
            receiver_id: roomMessages[i].receiver_id.toString(),
            type: roomMessages[i].type,
            message: roomMessages[i].message,
            message_type: roomMessages[i].message_type,
            duration: roomMessages[i].duration.toString(),
            message_status: message_status.toString(),
            room: roomMessages[i].room.toString(),
            replay_id: roomMessages[i].replay_id.toString(),
            replay_message: replay_message,
            replay_message_type: replay_message_type,
            replay_senter: replay_senter,
            replay_duration: replay_duration.toString(),
            replay_file_size: replay_file_size,
            forward_id: roomMessages[i].forward_id.toString(),
            forwarded_count: forwarded_count.toString(),
            optional_text: roomMessages[i].optional_text,
            thumbnail: roomMessages[i].thumbnail,
            file_size: roomMessages[i].file_size 
        });
    }
    console.log(roomMessages)
    
    response_data={
        status: true,
        statuscode: 200,
        message: 'success',
        data: {
           username: user_name,
           profile_pic: profile_pic,
           user_block_status: user_block_status.toString(),
           unique_id: unique_id,
           list: message_list
        }
    }
    
    return response_data;
}

async function searchChatList(user_id,access_token,search){
    //console.log(user_id,access_token,search)
    var response={};
    var check_user_data=await queries.checkUserData(user_id,access_token);
    if(check_user_data.length>0){
        var search_chat_list=await queries.searchRecentChatList(user_id,search);
        var chat_list=[];
        var message_list=[];
        console.log(search_chat_list,search_chat_list.length)
        for(var i=0; i<search_chat_list.length; i++){
            console.log(search_chat_list[i].id)
            var profile_pic=baseURL+'uploads/default/profile.png';
            if(search_chat_list[i].profile_pic!=''){
                profile_pic=baseURL+search_chat_list[i].profile_pic;
            }
            chat_list.push({
                id: search_chat_list[i].id.toString(),
                datetime: search_chat_list[i].created_datetime,
                user_id: search_chat_list[i].user_id.toString(),
                username: search_chat_list[i].username.trim(),
                unique_id: search_chat_list[i].unique_id,
                profile_pic: profile_pic,
                room: search_chat_list[i].room.toString(),
                message: search_chat_list[i].message,
                message_type: search_chat_list[i].message_type,
                unread_message: search_chat_list[i].unread_message.toString()
            });
        }
        //get message
        var search_message=[];
        if(search!=''){
            search_message=await queries.searchMessage(user_id,search);
        }
        console.log('search message',search_message.length);
        for(var j=0; j<search_message.length; j++){
            var user_profile_pic=baseURL+'uploads/default/profile.png';
            if(search_message[j].profile_pic!=''){
                user_profile_pic=baseURL+search_message[j].profile_pic;
            }
            message_list.push({
                id: search_message[j].id.toString(),
                created_datetime: search_message[j].created_datetime,
                user_id: search_message[j].user_id.toString(),
                room: search_message[j].room.toString(),
                username: search_message[j].username,
                unique_id: search_message[j].unique_id,
                profile_pic: user_profile_pic,
                message: search_message[j].message,
                type: baseURL+search_message[j].type
            })
        }
        console.log(message_list.length)
        response={
            status: true,
            statuscode: 200,
            message: 'Success',
            data: {
                chat_list: chat_list,
                message_list: message_list
            }
        }
    }else{
        response={
            status: false,
            statuscode: 200,
            message: 'No user data found',
            data: {}
        }
    }
    return response;
}

async function forwardMessages(user_id,to_users,message_ids){
    var response={};
    var split_message_ids=message_ids.split(',');
    var split_to_users=to_users.split(',');
    var current_datetime=utils.current_datetime();
    //console.log(split_message_ids,split_to_users);
    var query='';
    var query_values='';
    var emit_user_data=[];
    for(var i=0;i<split_message_ids.length;i++){
        console.log('first ',split_message_ids[i])
        var forward_message='';
        var forward_message_type='';
        var forward_optional_text='';
        var forward_thumbnail='';
        var forward_duration='';
        //check forward message data
        var check_forward_message=await queries.checkForwardMessage(split_message_ids[i]);
        if(check_forward_message.length>0){
            forward_message=check_forward_message[0].message;
            forward_message_type=check_forward_message[0].message_type;
            forward_optional_text=check_forward_message[0].optional_text;
            forward_thumbnail=check_forward_message[0].thumbnail;
            forward_duration=check_forward_message[0].duration;
        }
        for(var j=0;j<split_to_users.length;j++){
            console.log('second ',split_to_users[j])
            var room=await utils.createRoom(user_id,split_to_users[j]);
            console.log('room data ',room)
            console.log(split_to_users[j],emit_user_data)
            //check user already exit in array
            var check_same_user_exist=await utils.check_same_user_exist(split_to_users[j],emit_user_data);
            //console.log(check_same_user_exist)
            if(check_same_user_exist==false){
                emit_user_data.push({
                    user_id: split_to_users[j],
                    room: room,
                    message_count: split_message_ids.length
                });
            }
            
            var message_data=[
                {
                    user_id: user_id,
                    datetime: current_datetime,
                    delivered_status: 1,
                    delivered_datetime: current_datetime,
                    read_status: 1,
                    read_datetime: current_datetime,
                    status: 1
                },{
                    user_id: split_to_users[j],
                    datetime: current_datetime,
                    delivered_status: 0,
                    delivered_datetime: '',
                    read_status: 0,
                    read_datetime: '',
                    status: 1
                }
            ];
            //console.log(message_data)
            console.log('message id ',split_message_ids[i],message_data)
            //set case update query
            //query=query+"INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `forward_id`, `message`, `message_type`, `optional_text`, `thumbnail`, `duration`, `delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+split_to_users[j]+"','"+room+"','0','0','"+split_message_ids[i]+"','"+forward_message+"','"+forward_message_type+"','"+forward_optional_text+"','"+forward_thumbnail+"','"+forward_duration+"','1','1','"+JSON.stringify(message_data)+"');";
            query_values=query_values+"('"+current_datetime+"','"+user_id+"','"+split_to_users[j]+"','"+room+"','0','0','"+split_message_ids[i]+"','"+forward_message+"','"+forward_message_type+"','"+forward_optional_text+"','"+forward_thumbnail+"','"+forward_duration+"','0','0','"+JSON.stringify(message_data)+"'),";
            //send notification
            let send_notification=await notificationController.sendNotification(user_id,split_to_users[j],room,forward_message,forward_message_type);

        }
    }
    //trim data
    query_values=query_values.replace(/(^,)|(,$)/g, "");
    //console.log('query data ',query_values);
    if(query_values!=''){
        query="INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `forward_id`, `message`, `message_type`, `optional_text`, `thumbnail`, `duration`, `delivered_status`, `read_status`, `message_data`) VALUES "+query_values;
        //console.log(query);
        var save_forward_messages=await queries.saveForwardMessages(query);
        console.log(save_forward_messages);
        console.log(emit_user_data)
        if(save_forward_messages>0){
            //let send_notification=await notificationController.sendNotification(user_id,receiver_id,room,message,message_type);
            response={
                status: 200,
                statuscode: true,
                message: 'Success',
                emit_users: emit_user_data
            }
        }else{
            response={
                status: 400,
                statuscode: false,
                message: 'Not saved to db'
            }
        }
    }else{
        response={
            status: 200,
            statuscode: false,
            message: 'No message to forward'
        }
    }
    return response;
}


module.exports={
    sendMessage,
    roomChatMessage,
    chatListResponse,
    messageDelivered,
    chatListResponseWithoutToken,
    messageRead,
    searchRoomMessage,
    searchChatList,
    forwardMessages
}