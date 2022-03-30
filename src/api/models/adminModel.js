import mongoose from "mongoose";

const { Schema } = mongoose;

const AdminModelSchema = new Schema(
    {
        firstname: { type: Schema.Types.String, required: true },
        lastname: { type: Schema.Types.String, required: true },
        email: { type: Schema.Types.String, required: true },
        password: { type: Schema.Types.String, required: true },
        address: { type: Schema.Types.String, required: true },
        city: { type: Schema.Types.String, required: true },
    },
);

AdminModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

AdminModelSchema.pre("update", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

AdminModelSchema.pre("findOneAndUpdate", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("admin", AdminModelSchema);
