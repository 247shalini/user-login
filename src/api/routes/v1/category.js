import { Router } from "express";
import { category, categoryAction } from "../../controllers/category.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import { tokenValidation } from "../../middleware/tokenValidation.js";
import { categoryValidation } from "../../validators/categoryValidate.js";

const categoryRouter = Router();

categoryRouter.post("/category", tokenValidation, categoryValidation, handleValidationErrors , category)
categoryRouter.get("/category", tokenValidation, categoryAction)

export default categoryRouter;