import { ObjectHandle } from 'indy-credx-shared'

export type Callback = (err: number) => void
export type CallbackWithResponse = (err: number, response: string) => void

type Argument =
  | Record<string, unknown>
  | Array<unknown>
  | Date
  | Uint8Array
  | SerializedArgument
  | boolean
  | ObjectHandle

type SerializedArgument = string | number | Callback | CallbackWithResponse | ArrayBuffer | Array<number>

type SerializedArguments = Record<string, SerializedArgument>

export type SerializedOptions<Type> = {
  [Property in keyof Type]: Type[Property] extends string
    ? string
    : Type[Property] extends number
    ? number
    : Type[Property] extends boolean
    ? number
    : Type[Property] extends Record<string, unknown>
    ? string
    : Type[Property] extends Array<string>
    ? Array<string>
    : Type[Property] extends Array<number>
    ? Array<number>
    : Type[Property] extends Array<ObjectHandle>
    ? Array<number>
    : Type[Property] extends Array<Record<string, unknown>>
    ? Array<string>
    : Type[Property] extends Array<unknown>
    ? string
    : Type[Property] extends Array<unknown> | undefined
    ? string
    : Type[Property] extends Record<string, unknown> | undefined
    ? string | undefined
    : Type[Property] extends Date
    ? number
    : Type[Property] extends Date | undefined
    ? number | undefined
    : Type[Property] extends string | undefined
    ? undefined | string
    : Type[Property] extends number | undefined
    ? undefined | number
    : Type[Property] extends Callback
    ? Callback
    : Type[Property] extends CallbackWithResponse
    ? CallbackWithResponse
    : Type[Property] extends Uint8Array
    ? ArrayBuffer
    : Type[Property] extends ObjectHandle
    ? number
    : Type[Property] extends ObjectHandle | undefined
    ? number
    : Type[Property] extends Uint8Array | undefined
    ? ArrayBuffer
    : unknown
}

const serialize = (arg: Argument): SerializedArgument => {
  switch (typeof arg) {
    case 'undefined':
      return arg
    case 'string':
      return arg
    case 'boolean':
      return Number(arg)
    case 'number':
      return arg
    case 'function':
      return arg
    case 'object':
      if (arg instanceof Date) {
        return arg.valueOf()
      } else if (arg instanceof ObjectHandle) {
        return arg.handle
      } else if (Array.isArray(arg) && arg[0] instanceof ObjectHandle) {
        return (arg as Array<ObjectHandle>).map((a) => a.handle)
      } else if (arg instanceof Uint8Array) {
        return arg.buffer
      } else {
        return JSON.stringify(arg)
      }
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Could not serialize value ${arg}`)
  }
}

const serializeArguments = <T extends Record<string, Argument> = Record<string, Argument>>(
  args: T
): SerializedOptions<T> => {
  const retVal: SerializedArguments = {}
  Object.entries(args).forEach(([key, val]) => (retVal[key] = serialize(val)))
  return retVal as SerializedOptions<T>
}

export { serializeArguments }
