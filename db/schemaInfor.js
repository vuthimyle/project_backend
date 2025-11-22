import mongoose from "mongoose";

const schemaInfo = new mongoose.Schema({
  version: String,
  load_date_time: { type: Date, default: Date.now },
});

export default mongoose.models.SchemaInfo || mongoose.model("SchemaInfo", schemaInfo);
