import { Router } from "express";
import { category, categoryAction} from "../../controllers/category.js";
import { handleValidationErrors } from "../../middleware/handleValidation.js";
import { categoryValidation } from "../../validators/categoryValidate.js";

const categoryRouter = Router();

categoryRouter.post("/category", categoryValidation, handleValidationErrors , category)
categoryRouter.get("/category", categoryAction)

export default categoryRouter;