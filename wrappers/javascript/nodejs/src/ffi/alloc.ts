import { alloc } from 'ref-napi'

import { FFI_STRING, FFI_OBJECT_HANDLE } from '../ffi/primitives'

// TODO: more allocations here

export const allocateStringBuffer = (): Buffer => alloc(FFI_STRING)

export const allocatePointer = (): Buffer => alloc(FFI_OBJECT_HANDLE)
