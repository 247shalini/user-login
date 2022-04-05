import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductModelSchema = new Schema(
    {
        productName: { type: Schema.Types.String, required: true },
        MRP: { type: Schema.Types.Number, required: true },
        salePrice: { type: Schema.Types.Number, required: true },
        description: { type: Schema.Types.String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        }
    },
);

ProductModelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

ProductModelSchema.pre("update", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

ProductModelSchema.pre("findOneAndUpdate", function () {
    this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("product", ProductModelSchema);