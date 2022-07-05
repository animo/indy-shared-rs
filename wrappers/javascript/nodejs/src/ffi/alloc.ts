import { alloc } from 'ref-napi'

import { FFI_STRING, FFI_OBJECT_HANDLE, FFI_INT8 } from '../ffi/primitives'

// TODO: more allocations here

export const allocateStringBuffer = (): Buffer => alloc(FFI_STRING)

export const allocatePointer = (): Buffer => alloc(FFI_OBJECT_HANDLE)

export const allocateInt8Buffer = (): Buffer => alloc(FFI_INT8)
