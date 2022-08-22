import type {
  IndyCredx,
  NativeCredentialEntry,
  NativeCredentialProve,
  NativeCredentialRevocationConfig,
  NativeRevocationEntry,
} from 'indy-credx-shared'
import { ObjectHandle } from 'indy-credx-shared'

import { indyCredxReactNative } from './library'
import { serializeArguments } from './utils'

export class ReactNativeIndyCredx implements IndyCredx {
  public version(): string {
    return indyCredxReactNative.version({})
  }

  public getCurrentError(): string {
    return indyCredxReactNative.getCurrentError({})
  }

  public generateNonce(): string {
    return indyCredxReactNative.generateNonce({})
  }

  public createSchema(options: {
    originDid: string
    name: string
    version: string
    attributeNames: string[]
    sequenceNumber?: number | undefined
  }): ObjectHandle {
    const handle = indyCredxReactNative.createSchema(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public createCredentialDefinition(options: {
    originDid: string
    schema: ObjectHandle
    tag: string
    signatureType: string
    supportRevocation: boolean
  }): [ObjectHandle, ObjectHandle, ObjectHandle] {
    const [handle1, handle2, handle3] = indyCredxReactNative.createCredentialDefinition(serializeArguments(options))
    return [new ObjectHandle(handle1), new ObjectHandle(handle2), new ObjectHandle(handle3)]
  }

  public createCredential(options: {
    credentialDefinition: ObjectHandle
    credentialDefinitionPrivate: ObjectHandle
    credentialOffer: ObjectHandle
    credentialRequest: ObjectHandle
    attributeRawValues: Record<string, string>
    attributeEncodedValues?: Record<string, string> | undefined
    revocationConfiguration?: NativeCredentialRevocationConfig | undefined
  }): [ObjectHandle, ObjectHandle, ObjectHandle] {
    const [handle1, handle2, handle3] = indyCredxReactNative.createCredential(serializeArguments(options))
    return [new ObjectHandle(handle1), new ObjectHandle(handle2), new ObjectHandle(handle3)]
  }

  public encodeCredentialAttributes(attributeRawValues: Record<string, string>): Record<string, string> {
    return indyCredxReactNative.encodeCredentialAttributes(serializeArguments({ attributeRawValues }))
  }

  public processCredential(options: {
    credential: ObjectHandle
    credentialRequestMetadata: ObjectHandle
    masterSecret: ObjectHandle
    credentialDefinition: ObjectHandle
    revocationRegistryDefinition?: ObjectHandle | undefined
  }): ObjectHandle {
    const handle = indyCredxReactNative.processCredential(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public revokeCredential(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    credentialRevocationIndex: number
    tailsPath: string
  }): [ObjectHandle, ObjectHandle] {
    const [handle1, handle2] = indyCredxReactNative.revokeCredential(serializeArguments(options))
    return [new ObjectHandle(handle1), new ObjectHandle(handle2)]
  }

  public createCredentialOffer(options: {
    schemaId: string
    credentialDefinition: ObjectHandle
    keyProof: ObjectHandle
  }): ObjectHandle {
    const handle = indyCredxReactNative.createCredentialOffer(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public createCredentialRequest(options: {
    proverDid: string
    credentialDefinition: ObjectHandle
    masterSecret: ObjectHandle
    masterSecretId: string
    credentialOffer: ObjectHandle
  }): [ObjectHandle, ObjectHandle] {
    const [handle1, handle2] = indyCredxReactNative.createCredentialRequest(serializeArguments(options))
    return [new ObjectHandle(handle1), new ObjectHandle(handle2)]
  }

  public createMasterSecret(): ObjectHandle {
    const handle = indyCredxReactNative.createMasterSecret({})
    return new ObjectHandle(handle)
  }

  public createPresentation(options: {
    presentationRequest: ObjectHandle
    credentials: NativeCredentialEntry[]
    credentialsProve: NativeCredentialProve[]
    selfAttest: Record<string, string>
    masterSecret: ObjectHandle
    schemas: ObjectHandle[]
    credentialDefinitions: ObjectHandle[]
  }): ObjectHandle {
    const handle = indyCredxReactNative.createPresentation(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public verifyPresentation(options: {
    presentation: ObjectHandle
    presentationRequest: ObjectHandle
    schemas: ObjectHandle[]
    credentialDefinitions: ObjectHandle[]
    revocationRegistryDefinitions: ObjectHandle[]
    revocationEntries: NativeRevocationEntry[]
  }): boolean {
    return indyCredxReactNative.verifyPresentation(serializeArguments(options))
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
    const [handle1, handle2, handle3, handle4] = indyCredxReactNative.createRevocationRegistry(
      serializeArguments(options)
    )
    return [new ObjectHandle(handle1), new ObjectHandle(handle2), new ObjectHandle(handle3), new ObjectHandle(handle4)]
  }

  public updateRevocationRegistry(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    issued: number[]
    revoked: number[]
    tailsDirectoryPath: string
  }): [ObjectHandle, ObjectHandle] {
    const [handle1, handle2] = indyCredxReactNative.updateRevocationRegistry(serializeArguments(options))
    return [new ObjectHandle(handle1), new ObjectHandle(handle2)]
  }

  public mergeRevocationRegistryDeltas(options: {
    revocationRegistryDelta1: ObjectHandle
    revocationRegistryDelta2: ObjectHandle
  }): ObjectHandle {
    const handle = indyCredxReactNative.mergeRevocationRegistryDeltas(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public createOrUpdateRevocationState(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistryDelta: ObjectHandle
    revocationRegistryIndex: number
    timestamp: number
    tailsPath: string
    previousRevocationState?: ObjectHandle | undefined
  }): ObjectHandle {
    const handle = indyCredxReactNative.createOrUpdateRevocationState(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public presentationRequestFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.presentationRequestFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public schemaGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    return indyCredxReactNative.schemaGetAttribute(serializeArguments(options))
  }

  public revocationRegistryDefinitionGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    return indyCredxReactNative.revocationRegistryDefinitionGetAttribute(serializeArguments(options))
  }

  public credentialGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    return indyCredxReactNative.credentialGetAttribute(serializeArguments(options))
  }

  public getJson(options: { objectHandle: ObjectHandle }): string {
    return indyCredxReactNative.getJson(serializeArguments(options))
  }

  public getTypeName(options: { objectHandle: ObjectHandle }): string {
    return indyCredxReactNative.getTypeName(serializeArguments(options))
  }

  public objectFree(options: { objectHandle: ObjectHandle }): void {
    return indyCredxReactNative.objectFree(serializeArguments(options))
  }

  public credentialDefinitionGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    return indyCredxReactNative.credentialDefinitionGetAttribute(serializeArguments(options))
  }

  public revocationRegistryDefinitionFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.revocationRegistryFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public revocationRegistryFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.revocationRegistryFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public presentationFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.presentationFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public credentialOfferFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public schemaFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.schemaFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public masterSecretFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.masterSecretFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public credentialRequestFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialRequestFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public credentialRequestMetadataFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialRequestMetadataFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public credentialFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public revocationRegistryDefinitionPrivateFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.revocationRegistryDefinitionPrivateFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public revocationRegistryDeltaFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.revocationRegistryDeltaFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public revocationStateFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.revocationStateFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }
  public credentialDefinitionFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialDefinitionFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public credentialDefinitionPrivateFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.credentialDefinitionPrivateFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }

  public keyCorrectnessProofFromJson(options: { json: string }): ObjectHandle {
    const handle = indyCredxReactNative.keyCorrectnessProofFromJson(serializeArguments(options))
    return new ObjectHandle(handle)
  }
}
