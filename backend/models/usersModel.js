import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  number: { type: String, },
  name: { type: String },
  father: { type: String },
  marrid: { type: String },
  education: { type: String },
  job: { type: String },
  category: { type: String },
  statename: { type: String },
  districtname: { type: String },
  loksabhaconstituencyname: { type: String },
  vidhansabhaconstituencyname: { type: String },
  tehsilname: { type: String },
  zilapanchayatconstituencyname: { type: String },
  janpadpanchayatconstituencyname: { type: String },
  municipalcorporationname: { type: String },
  municipalityname: { type: String },
  nagarpanchayatname: { type: String },
  grampanchayatname: { type: String },
  wardno: { type: String },
  pincode: { type: String },
  image: { type: String },
  screenshot: { type: String },
  sagetan: { type: String },
  randomCode:{type:Number}
});

const usersModel = mongoose.model("users", usersSchema);
export default usersModel;
