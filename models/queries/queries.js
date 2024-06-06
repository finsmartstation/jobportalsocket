const db=require('../config/db_connection');
const utils=require('../../utils/commonUtils');

async function updateUserIsOnline(user_id){
    var datetime=utils.current_datetime();
    const result=await db.sequelize.query("update `user` set online_status='1', last_seen='"+datetime+"' where id='"+user_id+"'");
    return result[0];
}

async function updateUserIsOffline(user_id){
    var datetime=utils.current_datetime();
    const result=await db.sequelize.query("update `user` set online_status='0', last_seen='"+datetime+"' where id='"+user_id+"'");
    return result[0];
}

async function saveTextMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,delivered_status,read_status,message_data,message_id){
    const result=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `message`, `message_type`, `delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+receiver_id+"','"+room+"','"+room_type+"','"+message_id+"','"+message+"','"+message_type+"','"+delivered_status+"','"+read_status+"','"+message_data+"')");
    return result[0];
}

async function saveImageMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,delivered_status,read_status,message_data,message_id,file_size){
    const result=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `message`, `message_type`, `optional_text`, `file_size`, `delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+receiver_id+"','"+room+"','"+room_type+"','"+message_id+"','"+message+"','"+message_type+"','"+optional_text+"','"+file_size+"','"+delivered_status+"','"+read_status+"','"+message_data+"')");
    return result[0];
}

async function saveDocMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,delivered_status,read_status,message_data,message_id,file_size){
    const result=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `message`, `message_type`, `optional_text`, `thumbnail`, `file_size`, `delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+receiver_id+"','"+room+"','"+room_type+"','"+message_id+"','"+message+"','"+message_type+"','"+optional_text+"','"+thumbnail+"','"+file_size+"','"+delivered_status+"','"+read_status+"','"+message_data+"')");
    return result[0];
}

async function saveVideoMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,duration,delivered_status,read_status,message_data,message_id,file_size){
    const result=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `message`, `message_type`, `optional_text`, `thumbnail`, `file_size`, `duration`,`delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+receiver_id+"','"+room+"','"+room_type+"','"+message_id+"','"+message+"','"+message_type+"','"+optional_text+"','"+thumbnail+"','"+file_size+"','"+duration+"','"+delivered_status+"','"+read_status+"','"+message_data+"')");
    return result[0];
}

async function saveVoiceMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type,optional_text,thumbnail,duration,delivered_status,read_status,message_data,message_id,file_size){
    const result=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `room`, `room_type`, `replay_id`, `message`, `message_type`, `optional_text`, `thumbnail`, `file_size`, `duration`,`delivered_status`, `read_status`, `message_data`) VALUES ('"+current_datetime+"','"+user_id+"','"+receiver_id+"','"+room+"','"+room_type+"','"+message_id+"','"+message+"','"+message_type+"','"+optional_text+"','"+thumbnail+"','"+file_size+"','"+duration+"','"+delivered_status+"','"+read_status+"','"+message_data+"')");
    return result[0];
}

async function check_date_message_exist(room,date){
    const result=await db.sequelize.query("select * from `chat_list` where room='"+room+"' and date(created_datetime)='"+date+"' and message_type='date'");
    return result[0];
}

async function saveDateMessage(current_datetime,user_id,receiver_id,room,room_type,message,message_type){

}

async function checkUserBlocked(user_id,receiver_id,room){
    const result=await db.sequelize.query("select * from `block_chat` where user_id='"+user_id+"' and receiver_id='"+receiver_id+"' and room='"+room+"'");
    return result[0];
}

async function userRoomChatAllMessage(user_id,room){
    let json_object='{"user_id":"'+user_id+'","status":1}';
    const result=await db.sequelize.query("SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` where room='"+room+"' and JSON_CONTAINS(message_data,'"+json_object+"') order by id asc");
    return result[0];
}

async function searchRoomMessage(user_id,room,search){
    let json_object='{"user_id":"'+user_id+'","status":1}';
    //SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='1','sent','receive') as type FROM `chat_list` where room='12' and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') and message LIKE '%hello%';
    const result=await db.sequelize.query("SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` where room='"+room+"' and JSON_CONTAINS(message_data,'"+json_object+"') and message LIKE '%"+search+"%'");
    return result[0];
}

async function userRoomChatLastMessage(user_id,room,limit){
    let json_object='{"user_id":"'+user_id+'","status":1}';
    const result=await db.sequelize.query("SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` where room='"+room+"' and JSON_CONTAINS(message_data,'"+json_object+"') order by id desc limit "+limit+"");
    return result[0];
}

async function userRoomChatMessageUsingPagination(user_id,room,limit,last_message_id){
    //SELECT *,if(senter_id=2,'sent','receive') as type FROM `chat_list` where room='12' and JSON_CONTAINS(message_data,'{"user_id":"2","status":1}');
    //SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='1','sent','receive') as type FROM `chat_list` where room='12' and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') order by id desc limit 30 , 10;
    let json_object='{"user_id":"'+user_id+'","status":1}';
    //const result=await db.sequelize.query("SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` where room='"+room+"' and JSON_CONTAINS(message_data,'"+json_object+"') order by id desc limit "+page_number+","+limit+"");
    const result=await db.sequelize.query("SELECT *,date_format(created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,if(senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` where id<'"+last_message_id+"' and room='"+room+"' and JSON_CONTAINS(message_data,'"+json_object+"') order by id desc limit "+limit+"");
    return result[0];
}

async function getReplayMessageDetails(id){
    const result=await db.sequelize.query("select * from `chat_list` where id='"+id+"'");
    return result[0];
}

async function UserProfile(user_id){
    //const result=await db.sequelize.query("select concat(first_name,' ',middle_name,' ',last_name) as username,profile_pic from `user` where id='"+user_id+"'");
    const result=await db.sequelize.query("select concat(user.first_name,' ',user.middle_name,' ',last_name) as username, if(user.access_id=1,user.profile_pic,organization_basic_details.logo) as profile_pic, user.unique_id from `user` left join `organization_basic_details` on user.id=organization_basic_details.user_id where user.id='"+user_id+"'");
    return result[0];
}

async function forwardMessageCount(id){
    const result=await db.sequelize.query("select count(*) as forwarded_count from `chat_list` where forward_id='"+id+"'");
    return result[0];
}

async function userLastSeen(user_id){
    const result=await db.sequelize.query("select date_format(last_seen,'%Y-%m-%d %H:%i:%s') as last_seen from `user` where id='"+user_id+"'");
    return result[0];
}

async function checkUserData(user_id,access_token){
    const result=await db.sequelize.query("select * from `user` where id='"+user_id+"' and access_token='"+access_token+"'");
    return result[0];
}

async function recentChatList(user_id){
    //SELECT chat_list.created_datetime,max(chat_list.id) as id, case when senter_id=1 then receiverdata.id else senterdata.id end as user_id, case when senter_id=1 then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 group by room) unread_messages on chat_list.room = unread_messages.room GROUP by chat_list.room;
    //SELECT chat_list.created_datetime,max(chat_list.id) as id, case when senter_id=1 then receiverdata.id else senterdata.id end as user_id, case when senter_id=1 then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room;
    //SELECT chat_list.created_datetime,max(chat_list.id) as id, case when senter_id=1 then receiverdata.id else senterdata.id end as user_id, case when senter_id=1 then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room;
    //SELECT chat_list.created_datetime,max(chat_list.id) as id, case when senter_id=1 then receiverdata.id else senterdata.id end as user_id, case when senter_id=1 then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room ORDER BY id DESC;
    //SELECT date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,max(chat_list.id) as id, case when senter_id=1 then receiverdata.id else senterdata.id end as user_id, case when senter_id=1 then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id=1 then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room ORDER BY id DESC;
    //SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room ORDER BY id DESC;
    //SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,COALESCE(unread_messages.unread_message, 0) as unread_message FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!=1 and read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room ORDER BY id DESC;
    //SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then receiverdata.unique_id else senterdata.unique_id end as unique_id,case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,COALESCE(unread_messages.unread_message, 0) as unread_message FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!=1 and read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') GROUP by chat_list.room ORDER BY id DESC;
    let json_object='{"user_id":"'+user_id+'","status":1}';
    const result=await db.sequelize.query("SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='"+user_id+"' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then receiverdata.unique_id else senterdata.unique_id end as unique_id, case when senter_id='"+user_id+"' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='"+user_id+"' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,COALESCE(unread_messages.unread_message, 0) as unread_message, if(chat_list.senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'"+json_object+"') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!='"+user_id+"' and read_status=0 and JSON_CONTAINS(message_data,'"+json_object+"') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'"+json_object+"') GROUP by chat_list.room ORDER BY id DESC");
    return result[0];
}

async function searchRecentChatList(user_id,search){
    //SELECT date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,max(chat_list.id) as id, case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') AND ((senter_id = '1' AND IF(receiverdata.access_id = 1, CONCAT(receiverdata.first_name, ' ', receiverdata.middle_name, ' ', receiverdata.last_name), receiverdata.first_name) LIKE '%GOOGLE%') OR (senter_id <> '1' AND IF(senterdata.access_id = 1, CONCAT(senterdata.first_name, ' ', senterdata.middle_name, ' ', senterdata.last_name), senterdata.first_name) LIKE '%GOOGLE%')) GROUP by chat_list.room ORDER BY id DESC;
    //SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!=1 and read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') AND ((senter_id = '1' AND IF(receiverdata.access_id = 1, CONCAT(receiverdata.first_name, ' ', receiverdata.middle_name, ' ', receiverdata.last_name), receiverdata.first_name) LIKE '%GOOGLE%') OR (senter_id <> '1' AND IF(senterdata.access_id = 1, CONCAT(senterdata.first_name, ' ', senterdata.middle_name, ' ', senterdata.last_name), senterdata.first_name) LIKE '%GOOGLE%')) GROUP by chat_list.room ORDER BY id DESC;
    //SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='1' then receiverdata.id else senterdata.id end as user_id, case when senter_id='1' then receiverdata.unique_id else senterdata.unique_id end as unique_id, case when senter_id='1' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='1' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,unread_messages.unread_message FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!=1 and read_status=0 and JSON_CONTAINS(message_data,'{"user_id":"1","status":1}') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'{"user_id":"1","status":1}') AND ((senter_id = '1' AND IF(receiverdata.access_id = 1, CONCAT(receiverdata.first_name, ' ', receiverdata.middle_name, ' ', receiverdata.last_name), receiverdata.first_name) LIKE '%GOOGLE%') OR (senter_id <> '1' AND IF(senterdata.access_id = 1, CONCAT(senterdata.first_name, ' ', senterdata.middle_name, ' ', senterdata.last_name), senterdata.first_name) LIKE '%GOOGLE%')) GROUP by chat_list.room ORDER BY id DESC;
    let json_object='{"user_id":"'+user_id+'","status":1}';
    const result=await db.sequelize.query("SELECT room_max_id_data.max_id as id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime, case when senter_id='"+user_id+"' then receiverdata.id else senterdata.id end as user_id, case when senter_id='"+user_id+"' then receiverdata.unique_id else senterdata.unique_id end as unique_id, case when senter_id='"+user_id+"' then if(receiverdata.access_id=1,receiverdata.profile_pic,organization_receiver.logo) else if(senterdata.access_id=1,senterdata.profile_pic,organization_senter.logo) end as profile_pic, case when senter_id='"+user_id+"' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, chat_list.message,chat_list.message_type,chat_list.room,chat_list.room_type,chat_list.delivered_status,chat_list.read_status,chat_list.message_data,COALESCE(unread_messages.unread_message, 0) as unread_message, if(chat_list.senter_id='"+user_id+"','sent','receive') as type FROM `chat_list` JOIN (select max(id) as max_id from `chat_list` where JSON_CONTAINS(message_data,'"+json_object+"') GROUP BY room) room_max_id_data on chat_list.id=room_max_id_data.max_id left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN organization_basic_details as organization_senter on chat_list.senter_id=organization_senter.user_id left JOIN organization_basic_details as organization_receiver on chat_list.receiver_id=organization_receiver.user_id left join (select room,count(*) as unread_message from chat_list where senter_id!='"+user_id+"' and read_status=0 and JSON_CONTAINS(message_data,'"+json_object+"') group by room) unread_messages on chat_list.room = unread_messages.room  where JSON_CONTAINS(chat_list.message_data,'"+json_object+"') AND ((senter_id = '"+user_id+"' AND IF(receiverdata.access_id = 1, CONCAT(receiverdata.first_name, ' ', receiverdata.middle_name, ' ', receiverdata.last_name), receiverdata.first_name) LIKE '%"+search+"%') OR (senter_id <> '"+user_id+"' AND IF(senterdata.access_id = 1, CONCAT(senterdata.first_name, ' ', senterdata.middle_name, ' ', senterdata.last_name), senterdata.first_name) LIKE '%"+search+"%')) GROUP by chat_list.room ORDER BY id DESC");
    return result[0];
}

async function notDeliveredMessages(user_id){
    let json_object='{"user_id":"'+user_id+'","delivered_status":0}';
    const result=await db.sequelize.query("SELECT * FROM `chat_list` where json_contains(message_data,'"+json_object+"') and delivered_status='0'");
    return result[0];
}

async function executeUpdateQuery(query){
    const result=await db.sequelize.query(query);
    return result[0];
}

async function notReadMessage(user_id,room){
    let json_object='{"user_id":"'+user_id+'","read_status":0}';
    const result=await db.sequelize.query("SELECT * FROM `chat_list` where json_contains(message_data,'"+json_object+"') and room='"+room+"' and read_status='0'");
    return result[0];
}

async function searchMessage(user_id,search){
    let json_object='{"user_id":"'+user_id+'","status":1}';
    //SELECT chat_list.id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,chat_list.created_datetime,chat_list.room,chat_list.message,if(chat_list.senter_id=2,chat_list.receiver_id,chat_list.senter_id) as user_id,if(chat_list.senter_id=2,'sent','receive') as type, case WHEN chat_list.senter_id=2 then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, case when chat_list.senter_id=2 then if(receiverdata.access_id=1,receiverdata.profile_pic,receiver_organization.logo) else if(senterdata.access_id=1,senterdata.profile_pic,senter_organization.logo) end as profile_pic FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN `organization_basic_details` as senter_organization on chat_list.senter_id=senter_organization.user_id left JOIN `organization_basic_details` as receiver_organization on chat_list.receiver_id=receiver_organization.user_id  where chat_list.message like '%hello%' and json_contains(chat_list.message_data,'{"user_id":"2","status":1}') and chat_list.message_type='text' GROUP by chat_list.id order by chat_list.id DESC;
    //SELECT chat_list.id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,chat_list.created_datetime,chat_list.room,chat_list.message,if(chat_list.senter_id=2,chat_list.receiver_id,chat_list.senter_id) as user_id,if(chat_list.senter_id=2,'sent','receive') as type,case WHEN chat_list.senter_id=2 then receiverdata.unique_id else senterdata.unique_id end as unique_id, case WHEN chat_list.senter_id=2 then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, case when chat_list.senter_id=2 then if(receiverdata.access_id=1,receiverdata.profile_pic,receiver_organization.logo) else if(senterdata.access_id=1,senterdata.profile_pic,senter_organization.logo) end as profile_pic FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN `organization_basic_details` as senter_organization on chat_list.senter_id=senter_organization.user_id left JOIN `organization_basic_details` as receiver_organization on chat_list.receiver_id=receiver_organization.user_id  where chat_list.message like '%hello%' and json_contains(chat_list.message_data,'{"user_id":"2","status":1}') and chat_list.message_type='text' GROUP by chat_list.id order by chat_list.id DESC;
    const result=await db.sequelize.query("SELECT chat_list.id,date_format(chat_list.created_datetime,'%Y-%m-%d %H:%i:%s') as created_datetime,chat_list.room,chat_list.message,if(chat_list.senter_id='"+user_id+"',chat_list.receiver_id,chat_list.senter_id) as user_id,if(chat_list.senter_id='"+user_id+"','sent','receive') as type,case WHEN chat_list.senter_id='"+user_id+"' then receiverdata.unique_id else senterdata.unique_id end as unique_id, case WHEN chat_list.senter_id='"+user_id+"' then if(receiverdata.access_id=1,concat(receiverdata.first_name,' ',receiverdata.middle_name,' ',receiverdata.last_name),receiverdata.first_name) else if(senterdata.access_id=1,concat(senterdata.first_name,' ',senterdata.middle_name,' ',senterdata.last_name),senterdata.first_name) end as username, case when chat_list.senter_id='"+user_id+"' then if(receiverdata.access_id=1,receiverdata.profile_pic,receiver_organization.logo) else if(senterdata.access_id=1,senterdata.profile_pic,senter_organization.logo) end as profile_pic FROM `chat_list` left JOIN `user` as senterdata on chat_list.senter_id=senterdata.id left JOIN `user` as receiverdata on chat_list.receiver_id=receiverdata.id left JOIN `organization_basic_details` as senter_organization on chat_list.senter_id=senter_organization.user_id left JOIN `organization_basic_details` as receiver_organization on chat_list.receiver_id=receiver_organization.user_id  where chat_list.message like '%"+search+"%' and json_contains(chat_list.message_data,'"+json_object+"') and chat_list.message_type='text' GROUP by chat_list.id order by chat_list.id DESC");
    return result[0];
}

async function reportChat(user_id,message_id,receiver_id,room){
    var datetime=utils.current_datetime();
    const result=await db.sequelize.query("INSERT INTO `report_chat`(`created_datetime`, `user_id`, `message_id`, `receiver_id`, `room`) VALUES ('"+datetime+"','"+user_id+"','"+message_id+"','"+receiver_id+"','"+room+"')");
    return result[0];
}

async function check_user_already_blocked(user_id,receiver_id){
    const results=await db.sequelize.query("select * from block_chat where user_id='"+user_id+"' and receiver_id='"+receiver_id+"'");
    return results[0];
}

async function save_block_message(message,message_type,room,room_type,senter_id,receiver_id,created_datetime,group_status){
    const results=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `message`, `message_type`, `room`, `room_type`, `message_data`,`delivered_status`,`read_status`,`read_datetime`) VALUES ('"+created_datetime+"','"+senter_id+"','"+receiver_id+"','"+message+"','"+message_type+"','"+room+"','"+room_type+"','"+group_status+"',1,1,'"+created_datetime+"')");
    return results[1];
}

async function block_user_chat(user_id,receive_id,room,datetime){
    const results=await db.sequelize.query("INSERT INTO `block_chat`(`user_id`, `created_datetime`, `room`, `receiver_id`) VALUES ('"+user_id+"','"+datetime+"','"+room+"','"+receive_id+"')");
    // console.log('test',results)
    return results[1];
}

async function unblockChat(id,user_id,receiver_id,room){
    const results=await db.sequelize.query("delete from `block_chat` where id='"+id+"' and user_id='"+user_id+"' and receiver_id='"+receiver_id+"'");
    return results[0];
}

async function saveUnblockMessage(message,message_type,room,room_type,senter_id,receiver_id,created_datetime,message_data){
    //console.log('query data',message,message_type,room,room_type,senter_id,receiver_id,created_datetime,message_data);
    const results=await db.sequelize.query("INSERT INTO `chat_list`(`created_datetime`, `senter_id`, `receiver_id`, `message`, `message_type`, `room`, `room_type`, `message_data`,`delivered_status`,`read_status`,`read_datetime`) VALUES ('"+created_datetime+"','"+senter_id+"','"+receiver_id+"','"+message+"','"+message_type+"','"+room+"','"+room_type+"','"+message_data+"',1,1,'"+created_datetime+"')");
    return results[0];
}

async function checkForwardMessage(message_id){
    const results=await db.sequelize.query("select message,message_type,optional_text,thumbnail,duration from `chat_list` where id='"+message_id+"'");
    return results[0];
}

async function saveForwardMessages(query){
    const results=await db.sequelize.query(query);
    return results[0];
}

async function userDeviceToken(user_id){
    //SELECT  user.id, user.unique_id, user.first_name, user.middle_name, user.last_name, user.access_id, user.country_code, user.phone,user.email, user_login.user_fcm_token,organization_basic_details.logo FROM `user` JOIN `user_login` on user.id=user_login.user_id and user_login.status=1 LEFT JOIN `organization_basic_details` on user.id=organization_basic_details.user_id where user.id=3 and user.status=1;
    const results=await db.sequelize.query("SELECT  user.id, user.unique_id, user.first_name, user.middle_name, user.last_name, user.access_id, user.country_code, user.phone,user.email, user_login.user_fcm_token,organization_basic_details.logo FROM `user` JOIN `user_login` on user.id=user_login.user_id and user_login.status='1' LEFT JOIN `organization_basic_details` on user.id=organization_basic_details.user_id where user.id='"+user_id+"' and user.status='1'");
    return results[0];
}

async function getLastMessage(user_id,room){
    let json_object='{"user_id":"'+user_id+'"}';
    const results=await db.sequelize.query("SELECT * from `chat_list` where room='"+room+"' and json_contains(chat_list.message_data,'"+json_object+"') order by id desc");
    return results[0];
}

async function getUserPhoneNumber(user_id){
    const results=await db.sequelize.query("SELECT * from `user` where id='"+user_id+"'");
    return results[0];
}

async function saveCvData(datetime,user_id,file_name,resume,preview_image_path,json_data){
    const results=await db.sequelize.query("INSERT INTO `user_resume`(`datetime`, `user_id`, `file_name`, `resume`, `preview_image_path`, `json_data`) VALUES ('"+datetime+"','"+user_id+"','"+file_name+"','"+resume+"','"+preview_image_path+"','"+json_data+"')");
    return results[0];
}

async function updateCvData(id,datetime,user_id,file_name,resume,preview_image_path,json_data){
    //const results=await db.sequelize.query("UPDATE `user_resume` SET `datetime`='"+datetime+"',`file_name`='"+file_name+"', `resume`='"+resume+"', `preview_image_path`='"+preview_image_path+"', `json_data`='"+json_data+"' where `user_id`='"+user_id+"' and `id`='"+id+"' ");
    const results=await db.sequelize.query("UPDATE `user_resume` SET `datetime`='"+datetime+"', `resume`='"+resume+"', `preview_image_path`='"+preview_image_path+"', `json_data`='"+json_data+"' where `user_id`='"+user_id+"' and `id`='"+id+"' ");
    return results[0];
}

async function savePreviewData(created_datetime,user_id,path){
    const results=await db.sequelize.query("INSERT INTO `temporary_preview_cv`(`created_datetime`, `user_id`, `path`) VALUES ('"+created_datetime+"','"+user_id+"','"+path+"')");
    return results[0];
}

async function executePreviewQuery(query){
    const results=await db.sequelize.query(query);
    return results[0];
}

async function getTemporaryData(user_id){
    const results=await db.sequelize.query("select * from `temporary_preview_cv` where user_id='"+user_id+"'");
    return results[0];
}

async function deleteTemporaryFiles(user_id){
    const results=await db.sequelize.query("delete from `temporary_preview_cv` where user_id='"+user_id+"'");
    return results[0];
}

async function saveDownloadedCV(created_datetime,user_id,template_id){
    const results=await db.sequelize.query("INSERT INTO `user_downloaded_cvs`(`created_datetime`, `user_id`, `default_cvs_id`) VALUES ('"+created_datetime+"','"+user_id+"','"+template_id+"')");
    return results[0];
}

async function updateDownloadedCVCount(id){
    const results=await db.sequelize.query("UPDATE `default_cvs` SET download_count=download_count+1 where id='"+id+"'");
    return results[0]
}

module.exports={
    updateUserIsOnline,
    updateUserIsOffline,
    saveTextMessage,
    saveImageMessage,
    saveDocMessage,
    saveVideoMessage,
    check_date_message_exist,
    checkUserBlocked,
    saveVoiceMessage,
    userRoomChatAllMessage,
    userRoomChatLastMessage,
    userRoomChatMessageUsingPagination,
    getReplayMessageDetails,
    UserProfile,
    forwardMessageCount,
    userLastSeen,
    checkUserData,
    recentChatList,
    notDeliveredMessages,
    executeUpdateQuery,
    notReadMessage,
    searchRoomMessage,
    searchRecentChatList,
    searchMessage,
    reportChat,
    check_user_already_blocked,
    save_block_message,
    block_user_chat,
    unblockChat,
    saveUnblockMessage,
    checkForwardMessage,
    saveForwardMessages,
    userDeviceToken,
    getLastMessage,
    getUserPhoneNumber,
    saveCvData,
    updateCvData,
    savePreviewData,
    executePreviewQuery,
    getTemporaryData,
    deleteTemporaryFiles,
    saveDownloadedCV,
    updateDownloadedCVCount
}