import type { CredentialEntry, CredentialProve, IndyCredx, RevocationEntry, ObjectHandle } from 'indy-credx-shared'

import { TextEncoder } from 'util'

import {
  allocateStringBuffer,
  allocatePointer,
  serializeArguments,
  StringListStruct,
  CredentialEntryStruct,
  CredentialProveStruct,
  CredentialEntryListStruct,
  CredentialProveListStruct,
  ObjectHandleListStruct,
  RevocationEntryListStruct,
  RevocationEntryStruct,
  allocateInt8Buffer,
  I64ListStruct,
  Int64Array,
} from './ffi'
import { nativeIndyCredx } from './library'

export class NodeJSIndyCredx implements IndyCredx {
  public generateNonce(): string {
    const ret = allocateStringBuffer()
    nativeIndyCredx.credx_generate_nonce(ret)
    return ret.deref() as string
  }

  public createSchema(options: {
    originDid: string
    name: string
    version: string
    attributeNames: string[]
    sequenceNumber?: number | undefined
  }): ObjectHandle {
    const { originDid, name, version, attributeNames, sequenceNumber } = serializeArguments(options)

    const ret = allocatePointer()

    // @ts-ignore
    nativeIndyCredx.credx_create_schema(originDid, name, version, attributeNames, sequenceNumber, ret)

    return ret.deref() as ObjectHandle
  }

  public schemaGetAttribute(options: { schema: ObjectHandle; name: string }) {
    const { schema, name } = serializeArguments(options)

    const ret = allocateStringBuffer()
    nativeIndyCredx.credx_schema_get_attribute(schema, name, ret)

    return ret.deref() as string
  }

  public createCredentialDefinition(options: {
    originDid: string
    schema: ObjectHandle
    tag: string
    signatureType: string
    supportRevocation: boolean
  }): [ObjectHandle, ObjectHandle, ObjectHandle] {
    const { originDid, schema, tag, signatureType, supportRevocation } = serializeArguments(options)

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()
    const ret3 = allocatePointer()

    nativeIndyCredx.credx_create_credential_definition(
      originDid,
      schema,
      tag,
      signatureType,
      supportRevocation,
      ret1,
      ret2,
      ret3
    )

    return [ret1.deref() as ObjectHandle, ret2.deref() as ObjectHandle, ret3.deref() as ObjectHandle]
  }

  public createCredential(options: {
    credentialDefinition: ObjectHandle
    credentialDefinitionPrivate: ObjectHandle
    credentialOffer: ObjectHandle
    credentialRequest: ObjectHandle
    attributeRawValues: Record<string, string>
    attributeEncodedValues?: Record<string, string> | undefined
    revocationConfiguration?: Record<string, string> | undefined
  }): [ObjectHandle, ObjectHandle, ObjectHandle] {
    const {
      credentialDefinition,
      credentialDefinitionPrivate,
      credentialOffer,
      credentialRequest,
      revocationConfiguration,
    } = serializeArguments(options)

    const attributeNames = StringListStruct({
      count: options.attributeRawValues.length,
      // @ts-ignore
      data: Object.keys(options.attributeRawValues),
    })

    const attributeRawValues = StringListStruct({
      count: options.attributeRawValues.length,
      // @ts-ignore
      data: Object.values(options.attributeRawValues),
    })

    const attributeEncodedValues = StringListStruct({
      count: options.attributeRawValues.length,
      // @ts-ignore
      data: Object.values(options.attributeEncodedValues),
    })

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()
    const ret3 = allocatePointer()

    nativeIndyCredx.credx_create_credential(
      credentialDefinition,
      credentialDefinitionPrivate,
      credentialOffer,
      credentialRequest,
      // @ts-ignore
      attributeNames,
      attributeRawValues,
      attributeEncodedValues,
      revocationConfiguration,
      ret1,
      ret2,
      ret3
    )

    return [ret1.deref() as ObjectHandle, ret2.deref() as ObjectHandle, ret3.deref() as ObjectHandle]
  }
  public encodeCredentialAttributes(attributeRawValues: Record<string, string>): Record<string, string> {

    const rawValues = StringListStruct({
      count: Object.keys(attributeRawValues).length,
      // @ts-ignore
      data: Object.values(attributeRawValues),
    })

    const ret = allocateStringBuffer()

    // @ts-ignore
    nativeIndyCredx.credx_encode_credential_attributes(rawValues, ret)

    const result = ret.deref() as string

    const keys = Object.keys(attributeRawValues)
    const values = result.split(',')

    const output: Record<string, string> = {}
    keys.forEach((key, i) => (output[key] = values[i]))
    return output
  }

  public processCredential(options: {
    credential: ObjectHandle
    credentialRequestMetadata: ObjectHandle
    masterSecret: ObjectHandle
    credentialDefinition: ObjectHandle
    revocationRegistryDefinition?: ObjectHandle | undefined
  }): ObjectHandle {
    const { credential, credentialRequestMetadata, masterSecret, credentialDefinition, revocationRegistryDefinition } =
      serializeArguments(options)

    const ret = allocatePointer()

    nativeIndyCredx.credx_process_credential(
      credential,
      credentialRequestMetadata,
      masterSecret,
      credentialDefinition,
      // @ts-ignore
      revocationRegistryDefinition,
      ret
    )

    return ret.deref() as ObjectHandle
  }
  public revokeCredential(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    credentialRevocationIndex: number
    tailsPath: string
  }): [ObjectHandle, ObjectHandle] {
    const { revocationRegistryDefinition, revocationRegistry, credentialRevocationIndex, tailsPath } =
      serializeArguments(options)

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()

    nativeIndyCredx.credx_revoke_credential(
      revocationRegistryDefinition,
      revocationRegistry,
      credentialRevocationIndex,
      tailsPath,
      ret1,
      ret2
    )

    return [ret1.deref() as ObjectHandle, ret2.deref() as ObjectHandle]
  }

  public createCredentialOffer(options: {
    schemaId: string
    credentialDefinition: ObjectHandle
    keyProof: ObjectHandle
  }): ObjectHandle {
    const { schemaId, credentialDefinition, keyProof } = serializeArguments(options)

    const ret = allocatePointer()
    nativeIndyCredx.credx_create_credential_offer(schemaId, credentialDefinition, keyProof, ret)

    return ret.deref() as ObjectHandle
  }

  public createCredentialRequest(options: {
    proverDid: string
    credentialDefinition: ObjectHandle
    masterSecret: ObjectHandle
    masterSecretId: string
    credentialOffer: ObjectHandle
  }): [ObjectHandle, ObjectHandle] {
    const { proverDid, credentialDefinition, masterSecret, masterSecretId, credentialOffer } =
      serializeArguments(options)

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()

    nativeIndyCredx.credx_create_credential_request(
      proverDid,
      credentialDefinition,
      masterSecret,
      masterSecretId,
      credentialOffer,
      ret1,
      ret2
    )

    return [ret1.deref() as ObjectHandle, ret2.deref() as ObjectHandle]
  }

  public createMasterSecret(): ObjectHandle {
    const ret = allocatePointer()

    nativeIndyCredx.credx_create_master_secret(ret)

    return ret.deref() as ObjectHandle
  }

  public createPresentation(options: {
    presentationRequest: ObjectHandle
    credentials: CredentialEntry[]
    credentialsProve: CredentialProve[]
    selfAttest: Record<string, string>
    masterSecret: ObjectHandle
    schemas: ObjectHandle[]
    credentialDefinitions: ObjectHandle[]
  }): ObjectHandle {
    const { presentationRequest, masterSecret } = serializeArguments(options)

    const credentialEntries = options.credentials.map((value) => {
      const { credential, timestamp, revocationState: rev_state } = serializeArguments(value)
      return CredentialEntryStruct({ credential, timestamp, rev_state })
    })

    const credentialEntryList = CredentialEntryListStruct({
      count: credentialEntries.length,
      // @ts-ignore
      data: credentialEntries,
    })

    const credentialProves = options.credentialsProve.map((value) => {
      const { entryIndex: entry_idx, isPredicate: is_predictable, reveal } = serializeArguments(value)
      const referent = new TextEncoder().encode(value.referent)

      // @ts-ignore
      return CredentialProveStruct({ entry_idx, referent, is_predictable, reveal })
    })

    const credentialProveList = CredentialProveListStruct({
      count: credentialProves.length,
      // @ts-ignore
      data: credentialProves,
    })

    const selfAttestKeys = StringListStruct({
      count: Object.keys(options.selfAttest).length,
      // @ts-ignore
      data: Object.keys(options.selfAttest),
    })

    const selfAttestValues = StringListStruct({
      count: Object.values(options.selfAttest).length,
      // @ts-ignore
      data: Object.values(options.selfAttest),
    })

    const schemas = options.schemas.map((value) => value.handle)

    const credentialDefinitions = options.credentialDefinitions.map((value) => value.handle)

    const ret = allocatePointer()

    nativeIndyCredx.credx_create_presentation(
      presentationRequest,
      // @ts-ignore
      credentialEntryList,
      credentialProveList,
      selfAttestKeys,
      selfAttestValues,
      masterSecret,
      schemas,
      credentialDefinitions,
      ret
    )

    return ret.deref() as ObjectHandle
  }
  public verifyPresentation(options: {
    presentation: ObjectHandle
    presentationRequest: ObjectHandle
    schemas: ObjectHandle[]
    credentialDefinitions: ObjectHandle[]
    revocationRegistryDefinitions: ObjectHandle[]
    revocationRegistries: RevocationEntry[]
  }): boolean {
    const { presentation, presentationRequest } = serializeArguments(options)

    const schemas = ObjectHandleListStruct({
      count: options.schemas.length,
      // @ts-ignore
      data: options.schemas.map((item) => item.handle),
    })

    const credentialDefinitions = ObjectHandleListStruct({
      count: options.credentialDefinitions.length,
      // @ts-ignore
      data: options.credentialDefinitions.map((item) => item.handle),
    })

    const revocationRegistryDefinitions = ObjectHandleListStruct({
      count: options.revocationRegistryDefinitions.length,
      // @ts-ignore
      data: options.revocationRegistryDefinitions.map((item) => item.handle),
    })

    const revocationRegistries = RevocationEntryListStruct({
      count: options.revocationRegistries.length,
      // @ts-ignore
      data: options.revocationRegistries.map((item) =>
        RevocationEntryStruct({
          def_entry_idx: item.revocationRegistryDefinitionEntryIndex,
          entry: item.entry.handle,
          timestamp: item.timestamp,
        })
      ),
    })

    const ret = allocateInt8Buffer()

    nativeIndyCredx.credx_verify_presentation(
      presentation,
      presentationRequest,
      // @ts-ignore
      schemas,
      credentialDefinitions,
      revocationRegistryDefinitions,
      revocationRegistries,
      ret
    )

    return Boolean(ret.deref() as number)
  }

  public createRevocationRegistry(options: {
    originDid: string
    credentialDefinition: ObjectHandle
    tag: string
    revocationRegistryType: string
    issuanceType?: string | undefined
    maximumCredentialNumber: number
    tailsDirectoryPath?: string | undefined
  }): [ObjectHandle, ObjectHandle, ObjectHandle, ObjectHandle] {
    const {
      originDid,
      credentialDefinition,
      tag,
      revocationRegistryType,
      issuanceType,
      maximumCredentialNumber,
      tailsDirectoryPath,
    } = serializeArguments(options)

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()
    const ret3 = allocatePointer()
    const ret4 = allocatePointer()

    nativeIndyCredx.credx_create_revocation_registry(
      originDid,
      credentialDefinition,
      tag,
      revocationRegistryType,
      issuanceType,
      maximumCredentialNumber,
      tailsDirectoryPath,
      ret1,
      ret2,
      ret3,
      ret4
    )

    return [
      ret1.deref() as ObjectHandle,
      ret2.deref() as ObjectHandle,
      ret3.deref() as ObjectHandle,
      ret4.deref() as ObjectHandle,
    ]
  }
  public updateRevocationRegistry(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    issued: number[]
    revoked: number[]
    tailsDirectoryPath: string
  }): [ObjectHandle, ObjectHandle] {

    const { revocationRegistryDefinition, revocationRegistry, tailsDirectoryPath } = serializeArguments(options)

    const issued = I64ListStruct({
      count: options.issued.length,
      // @ts-ignore
      data: Int64Array(options.issued),
    })

    const revoked = I64ListStruct({
      count: options.revoked.length,
      // @ts-ignore
      data: Int64Array(options.revoked),
    })

    const ret1 = allocatePointer()
    const ret2 = allocatePointer()

    nativeIndyCredx.credx_update_revocation_registry(
      revocationRegistryDefinition,
      revocationRegistry,
      // @ts-ignore
      issued,
      revoked,
      tailsDirectoryPath,
      ret1,
      ret2
    )

    return [ret1.deref() as ObjectHandle, ret2.deref() as ObjectHandle]
  }
  public mergeRevocationRegistryDeltas(options: {
    revocationRegistryDelta1: ObjectHandle
    revocationRegistryDelta2: ObjectHandle
  }): ObjectHandle {
    const { revocationRegistryDelta1, revocationRegistryDelta2 } = serializeArguments(options)

    const ret = allocatePointer()

    nativeIndyCredx.credx_merge_revocation_registry_deltas(revocationRegistryDelta1, revocationRegistryDelta2, ret)

    return ret.deref() as ObjectHandle
  }
  public createOrUpdateRevocationState(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistryDelta: ObjectHandle
    revocationRegistryIndex: number
    timestamp: number
    tailsPath: string
    previousRevocationState?: ObjectHandle | undefined
  }): ObjectHandle {
    const {
      revocationRegistryDefinition,
      revocationRegistryDelta,
      revocationRegistryIndex,
      timestamp,
      tailsPath,
      previousRevocationState,
    } = serializeArguments(options)

    const ret = allocatePointer()

    nativeIndyCredx.credx_create_or_update_revocation_state(
      revocationRegistryDefinition,
      revocationRegistryDelta,
      revocationRegistryIndex,
      timestamp,
      tailsPath,
      // @ts-ignore
      previousRevocationState,
      ret
    )

    return ret.deref() as ObjectHandle
  }
  public version(): string {
    return nativeIndyCredx.credx_version()
  }

  // This should be called when a function returns a non-zero code
  public getCurrentError(): string {
    const ret = allocateStringBuffer()
    nativeIndyCredx.credx_get_current_error(ret)
    return ret.deref() as string
  }
}
