import mongoose from "mongoose";
const Connect = process.env.MONGODB_CONNECT;

mongoose
  .connect(Connect)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => {
    console.log("Not Connected");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  titles: { type: String, require: true },
  body: { type: String, require: true },
  date: String,
  updatedDate: String,
  dateTime: { type: Date, default: Date.now },
});

const userModels = mongoose.model("users", userSchema);
export default userModels;
