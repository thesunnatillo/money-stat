import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MinLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
    const [min] = args.constraints;
    return value.length >= min;
  }

  defaultMessage(args?: ValidationArguments): string {
    const [min] = args.constraints;
    return `${args.property} must be more than or equal to ${min}`;
  }
}

export function MinLength(min: number, validationOptions?: ValidatorOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [min],
      validator: MinLengthConstraint,
    });
  };
}
