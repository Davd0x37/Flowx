import { type Ref, reactive, ref, watch } from 'vue';

/**
 * Wrapped generic type with additional fields
 */
type FormFieldsRecord<T> = {
  [Key in keyof T]: FormField<T, Key>;
};

// type DependsOn<T, Key extends keyof T> = Exclude<keyof T, Key>;

// type InferFromDependency<T, Deps> = Deps extends Array<infer U extends keyof T> ? Pick<T, U> : never;

/**
 * Single form field with props like required, default, validate function
 */
// type FormField<T, Key extends keyof T, Dependson = Exclude<keyof T, Key>[]> = {
type FormField<
  T,
  Key extends keyof T,
  // Dependencies = DependsOn<T, Key>[],
  // DependenciesRecord = InferFromDependency<T, Dependencies>,
> = {
  default: T[Key];
  required?: boolean;
  // dependsOn?: Dependencies;
  validate: (val: T[Key] /* , dependencies: DependenciesRecord */) => FormFieldErrorResult;
};

type FormFieldErrorResult = {
  valid: boolean;
  message: string;
};

/**
 * Wrapped type with original key name and body as object with value/error property.
 */
type ValidationResultRecord<T> = {
  isDirty: Ref<boolean>;
  fields: { [Key in keyof T]: ValidationResult<T> };
};

/**
 * Single validation result structure.
 * Value prop has the same type as original entry in type.
 * Error prop can be string or boolean;
 */
type ValidationResult<T, Key extends keyof T = keyof T> = {
  value: T[Key];
  error: string;
};

const useFormValidation = <T>(fields: FormFieldsRecord<T>): ValidationResultRecord<T> => {
  const isDirty = ref(true);

  const validateObject = {} as ValidationResultRecord<T>['fields'];

  // @TODO: change to object.entries maybe?
  for (const key in fields) {
    const field = fields[key];

    validateObject[key] = reactive({
      value: field.default,
      error: '',
    }) as ValidationResult<T>;

    watch(
      () => validateObject[key].value,
      (newVal, _oldVal) => {
        const { valid, message } = field.validate(newVal as T[typeof key]);

        if (!valid) {
          validateObject[key].error = message;
        }
      },
    );
  }

  // const validateObject = Object.entries(fields).reduce((acc, [key, value]) => {
  //   // Variable holding object with field options like default, required etc.
  //   const field = value as FormField<T>;

  //   // New/merged object with value and error message
  //   const newFieldObj = reactive({
  //     value: field.default as Pick<ValidationResult<T>, 'value'>,
  //     error: '',
  //   }) as ValidationResult<T>;

  //   return { ...acc, [key]: newFieldObj };
  // }, {});

  // watch(
  //   () => validateObject.email.value,
  //   (oldVal, newVal) => {
  //     console.log(oldVal, newVal);
  //   },
  // );

  return {
    isDirty,
    fields: validateObject,
  };
};

export default useFormValidation;
