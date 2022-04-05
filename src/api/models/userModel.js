import mongoose from "mongoose";

const { Schema } = mongoose;

const userModelSchema = new Schema(
    {
        firstname: { type: Schema.Types.String, required: true },
        lastname: { type: Schema.Types.String, required: true },
        email: { type: Schema.Types.String, required: true },
        password: { type: Schema.Types.String, required: true },
        userProfileImage: {type: Schema.Types.String, required:false, default:''},
    },
);

userModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

userModelSchema.pre("update", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

userModelSchema.pre("findOneAndUpdate", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("user", userModelSchema);
