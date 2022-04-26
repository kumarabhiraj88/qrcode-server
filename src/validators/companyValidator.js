import validator from 'express-validator';

//if any error happends with check() then passes to validationResult()
const { check, validationResult } = validator;

const companyValidation = [
    check('companyName')
    .notEmpty()
    .withMessage('Company Name is required')
];

const companyValidationResult = (req, res, next) => {
    //checking if there any error exists within validationResult, then outputs the error
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    next(); 
}

export default {
    companyValidation,
    companyValidationResult
}