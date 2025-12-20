const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please Add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add course description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  cost: {
    type: Number,
    required: [true, "Please add course cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

courseSchema.statics.calculateAverageCost = function (bootcampId) {
  return this.aggregate([
    {
      $match: {
        bootcamp: bootcampId,
      },
    },
    {
      $group: {
        _id: "$_id",
        averageCost: {
          $avg: "$cost",
        },
      },
    },
  ]);
};

courseSchema.post("save", async function () {
  const averageCost = await Course.calculateAverageCost(this.bootcamp);
  console.log(averageCost);
});

const Course = model("Course", courseSchema);

module.exports = Course;
