import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("addressLine1").isString().notEmpty().withMessage("Address is required"),
    body("country").isString().notEmpty().withMessage("Country is required"),
    body("city").isString().notEmpty().withMessage("City is required"),
    handleValidationErrors,
]

export const validateMyBacklinkRequest = [
    body("url").notEmpty().withMessage("URL is required"),
    body("price").isFloat({min: 0}).notEmpty().withMessage("Price is required"),
    body("traffic").isInt({min:0}).notEmpty().withMessage("Traffic is required"),
    body("domainRanking").isInt({min:0, max: 100}).notEmpty().withMessage("Domain Rating is required"),
    body("domainAuthority").isInt({min:0, max: 100}).notEmpty().withMessage("Domain Authority is required"),
    body("language").notEmpty().withMessage("Language is required"),
    body("categories").isArray().withMessage("Category is required").not().notEmpty().withMessage("Category is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleValidationErrors,
]