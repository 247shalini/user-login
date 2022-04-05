import { Router } from "express";
import { addProduct, productAction } from "../../controllers/product.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import { productValidation } from "../../validators/productValidate.js";

const productRouter = Router();

productRouter.post("/product", productValidation, handleValidationErrors , addProduct)
productRouter.get("/product", productAction)

export default productRouter;