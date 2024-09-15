import Ajv, { type Ajv as SchemaValidatorType } from 'ajv'
import addFormats from 'ajv-formats'

export const schemaValidator = addFormats(new Ajv({}), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
])

export type { SchemaValidatorType }
