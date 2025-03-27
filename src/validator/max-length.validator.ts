import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MaxLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [max] = args.constraints;
    return value.length <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const [max] = args.constraints;
    return `${args.property} must be less than or equal to ${max}`;
  }
}

export function MaxLength(max: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [max],
      validator: MaxLengthConstraint,
    });
  };
}
