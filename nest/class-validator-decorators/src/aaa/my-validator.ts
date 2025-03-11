import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
export class MyValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments) {
        return value.includes(validationArguments.constraints[0]);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new Error("Method not implemented.");
    }
    
}