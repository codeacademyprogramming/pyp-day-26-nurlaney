import { Room } from "./models";
const express = require("express");
const port = 8000;
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();

app.use("/", router);

mongoose.connect(
  "mongodb+srv://nurlaney:test@cluster0.aiwcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", (err: any) => console.log(err));
db.once("open", () => console.log("connected"));

router.get("/rooms", async (req: any, res: any) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/rooms/:id", (req: any, res: any) => {
  Room.findById(req.params.id)
    .then((room: any) => res.json(room))
    .catch((err: any) => res.status(400).json("Error: " + err));
});

router.post("/rooms", (req: any, res: any) => {
  const reservations = req.body.reservations;
  const newRoom = new Room({
    reservations,
  });
  newRoom
    .save()
    .then(() => res.json("New room created!"))
    .catch((err: any) => res.status(500).json("Error: " + err));
});

router.delete("/rooms/:id", (req: any, res: any) => {
  Room.findByIdAndDelete(req.params.id)
    .then(() => res.json("Room deleted"))
    .catch((err: any) => res.status(400).json("Error: " + err));
});

router.post("/rooms/:id", (req: any, res: any) => {
  Room.updateOne(
    {
      _id: req.params.id,
    },
    {
      $push: { reservations: req.body },
    }
  )
    .then(() => res.json("Reservation added"))
    .catch((err: any) => res.status(400).json("Error: " + err));
});

app.listen(port);
