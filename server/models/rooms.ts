import mongoose from "mongoose";

const { Schema } = mongoose;

const reservationsSchema = new Schema({
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  note: {
    type: String,
  },
  reservedBy: {
    type: String,
  },
  roomId: {
    type: Number,
  },
});

const roomsSchema = new Schema({
  reservations: [reservationsSchema],
});

export default mongoose.model("Room", roomsSchema);
