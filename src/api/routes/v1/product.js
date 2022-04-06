import { Router } from "express";
import { addProduct, productAction } from "../../controllers/product.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import { upload } from "../../middleware/profileImage.js";
import { tokenValidation } from "../../middleware/tokenValidation.js";
import { productValidation } from "../../validators/productValidate.js"

const productRouter = Router();

productRouter.post("/product", tokenValidation, 
                    productValidation, 
                    handleValidationErrors,
                    upload.array('file', 5),
                    addProduct
                )

productRouter.get("/product", tokenValidation, productAction)

export default productRouter;