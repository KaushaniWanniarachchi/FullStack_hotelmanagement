const Room = require("../models/roomDetails.model");

async function getAllRoom() {
    return await Room.find({});
}

async function updateRoomCount(req, res) {
    const category = req.body.roomCategory
    const room = await Room.findOneAndUpdate({roomCategory:category}, {$inc:{availableCount : -1 }})
    return res.json({success: true, count:room.availableCount})
}

module.exports = {
    getAllRoom,
    updateRoomCount
};
