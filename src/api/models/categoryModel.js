import mongoose from "mongoose";

const { Schema } = mongoose;

const CategoryModelSchema = new Schema(
    {
        category: { type: Schema.Types.String, required: true },
    },
);

CategoryModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

CategoryModelSchema.pre("update", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

CategoryModelSchema.pre("findOneAndUpdate", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("category", CategoryModelSchema);