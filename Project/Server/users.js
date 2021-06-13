const users = [];
const roomTimes = [];
const userTimes=[];



const addUserTimes = ({ name , miniute}) => {
 
  const existingUser = roomTimes.find((user) => user.name === name);

  if(existingUser) return { error: 'Username is taken.' };

  const user = { name,miniute };

  userTimes.push(user);

  return  user ;
}

const removeUserTime = (name) => {
  const index = userTimes.findIndex((user) => user.name === name);

  if(index !== -1) return userTimes.splice(index, 1)[0];
}

const getUserTime = (name) => userTimes.find((data) => data.name === name);


const addRoomTime = ({ miniute, room }) => {
  

  const existingUser = roomTimes.find((user) => user.room === room);

  if(existingUser) return { error: 'Username is taken.' };

  const user = { miniute, room };

  roomTimes.push(user);

  return  user ;
}

const getRoomTime = (room) => roomTimes.find((data) => data.room === room);



const addUser = ({ type ,socket, id, name, room , time}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { type,socket, id, name, room, time };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);


const checkRoom = (room) => {
 const allUsers =  users.filter((user) => user.room === room)
 const admin = allUsers.find((user) => user.type === "admin");
 
 return admin
}

module.exports = { checkRoom,addUser, removeUser, getUser, getUsersInRoom,addRoomTime,getRoomTime,addUserTimes,getUserTime,removeUserTime };