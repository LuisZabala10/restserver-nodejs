const { model, Schema } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    require: [true, "The name is required"],
  },
  active: {
    type: Boolean,
    require: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = model("Ctegory", CategorySchema);
