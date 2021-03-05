import Room from "../models/room.model.js";

const combine = async () => {
  return await Room.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "usersCombine",
      },
    },
  ]);
};
const roomCombine = combine();
export const addRoom = async (_room) => {
  if (!_room) return { error: "room name can't empty" };
  const existing = await Room.findOne({ name: _room });
  if (existing) return { error: "room already exists" };
  const newRoom = new Room({ name: _room });
  const room = await newRoom.save();
  return room;
};
export const getRoom = async (_room) => {
  if (!_room) {
    const rooms = await Room.find();
    return rooms;
  }
  const roomCombine = await Room.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "usersCombine",
      },
    },
  ]);
  console.log(roomCombine);
  const room = roomCombine.find((room) => room.name === _room);
  return room;
};
export const addUser = async (_room, _user) => {
  try {
    if (!_user || !_room) return { error: "room and user cannot empty" };
    const room = await Room.findOne({ name: _room });
    const existing = await room.users.find((u) => u._id === _user._id);
    if (existing) return existing;
    const id = _user._id.toString();
    const user = await Room.findByIdAndUpdate(
      room._id,
      { users: [...room.users, { _id: id }], counter: ++room.counter },
      { new: true }
    );
    return { user };
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (_room, id) => {
  if (!_user || !_room) return { error: "room and user cannot empty" };
  const roomCombine = await Room.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "usersCombine",
      },
    },
  ]);
  const user = roomCombine.find((room) => room.name === _room).usersCombine.find((user) => user.id === id);
  return user;
};
export const removeUser = async (_room, id) => {
  const room = await Room.findOne({ name: _room });
  await Room.findByIdAndUpdate(room.id, { users: room.users.filter((u) => u._id !== id) });
};
export const addMessage = async (_room, _message) => {
  if (!_message.message || !_room) return { error: "message or room cannot empty" };
  const room = await Room.findOne({ name: _room });
  const message = await Room.findByIdAndUpdate(room._id, { messages: [...room.messages, _message] }, { new: true });
  return message;
};
export const getMessage = async (_room) => {
  if (!_room) return { error: "room nto empty" };
  const room = await Room.findOne({ name: _room });
  const messages = room.messages;
  return messages;
};
