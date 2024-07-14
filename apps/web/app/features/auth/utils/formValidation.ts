import type { GenericApiErrorType } from '@flowx/api_types/generics';
import { AppError } from '@flowx/shared/utils/error';

/**
 * Form validation result with field and message properties.
 * May be nullish if no field or message found.
 */
export type FormValidationResult<FieldKeys> = { field: FieldKeys | null; message: string | null };

/**
 * Validate form error and return field and message
 */
export const formErrorValidate = <
  ErrorDataType extends GenericApiErrorType,
  FormData extends Record<string, unknown>,
>(
  error: Error,
  variables: FormData,
): FormValidationResult<keyof FormData> => {
  // If error is not an instance of AppError, return nullish values
  if (!(error instanceof AppError)) return { field: null, message: null };

  // Cast error to custom AppError
  const errorData = error as AppError<ErrorDataType>;
  if (!errorData.data?.error) return { field: null, message: null };

  const {
    data: { field },
    message,
  } = errorData.data?.error ?? {};

  if (!field || typeof field !== 'string') {
    console.debug('Field not found in error', field);
    return { field: null, message: null };
  }

  if (!(field in variables)) {
    console.debug('Field not found in form', field);
    return { field: null, message: null };
  }

  return {
    field,
    message,
  };
};
