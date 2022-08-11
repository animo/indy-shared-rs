import type {
  IndyCredx,
  NativeCredentialEntry,
  NativeCredentialProve,
  NativeCredentialRevocationConfig,
  NativeRevocationEntry,
  ObjectHandle,
} from 'indy-credx-shared'

import { indyCredxReactNative } from './library'

export class ReactNativeIndyCredx implements IndyCredx {
  public version(): string {
    return indyCredxReactNative.version({})
  }

  public getCurrentError(): string {
    throw new Error('Method not implemented.')
  }

  public generateNonce(): string {
    throw new Error('Method not implemented.')
  }

  public createSchema(options: {
    originDid: string
    name: string
    version: string
    attributeNames: string[]
    sequenceNumber?: number | undefined
  }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public createCredentialDefinition(options: {
    originDid: string
    schema: ObjectHandle
    tag: string
    signatureType: string
    supportRevocation: boolean
  }): [ObjectHandle, ObjectHandle, ObjectHandle] {
    throw new Error('Method not implemented.')
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
    throw new Error('Method not implemented.')
  }

  public encodeCredentialAttributes(attributeRawValues: Record<string, string>): Record<string, string> {
    throw new Error('Method not implemented.')
  }

  public processCredential(options: {
    credential: ObjectHandle
    credentialRequestMetadata: ObjectHandle
    masterSecret: ObjectHandle
    credentialDefinition: ObjectHandle
    revocationRegistryDefinition?: ObjectHandle | undefined
  }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public revokeCredential(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    credentialRevocationIndex: number
    tailsPath: string
  }): [ObjectHandle, ObjectHandle] {
    throw new Error('Method not implemented.')
  }

  public createCredentialOffer(options: {
    schemaId: string
    credentialDefinition: ObjectHandle
    keyProof: ObjectHandle
  }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public createCredentialRequest(options: {
    proverDid: string
    credentialDefinition: ObjectHandle
    masterSecret: ObjectHandle
    masterSecretId: string
    credentialOffer: ObjectHandle
  }): [ObjectHandle, ObjectHandle] {
    throw new Error('Method not implemented.')
  }

  public createMasterSecret(): ObjectHandle {
    throw new Error('Method not implemented.')
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
    throw new Error('Method not implemented.')
  }

  public verifyPresentation(options: {
    presentation: ObjectHandle
    presentationRequest: ObjectHandle
    schemas: ObjectHandle[]
    credentialDefinitions: ObjectHandle[]
    revocationRegistryDefinitions: ObjectHandle[]
    revocationEntries: NativeRevocationEntry[]
  }): boolean {
    throw new Error('Method not implemented.')
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
    throw new Error('Method not implemented.')
  }

  public updateRevocationRegistry(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistry: ObjectHandle
    issued: number[]
    revoked: number[]
    tailsDirectoryPath: string
  }): [ObjectHandle, ObjectHandle] {
    throw new Error('Method not implemented.')
  }

  public mergeRevocationRegistryDeltas(options: {
    revocationRegistryDelta1: ObjectHandle
    revocationRegistryDelta2: ObjectHandle
  }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public createOrUpdateRevocationState(options: {
    revocationRegistryDefinition: ObjectHandle
    revocationRegistryDelta: ObjectHandle
    revocationRegistryIndex: number
    timestamp: number
    tailsPath: string
    previousRevocationState?: ObjectHandle | undefined
  }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public presentationRequestFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public schemaGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryDefinitionGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public credentialGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public getJson(options: { objectHandle: ObjectHandle }): string {
    throw new Error('Method not implemented.')
  }

  public getTypeName(options: { objectHandle: ObjectHandle }): string {
    throw new Error('Method not implemented.')
  }

  public objectFree(options: { objectHandle: ObjectHandle }): void {
    throw new Error('Method not implemented.')
  }

  public credentialDefinitionGetAttribute(options: { objectHandle: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryDefinitionFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public presentationFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public credentialOfferFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public schemaFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public masterSecretFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public credentialRequestFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public credentialRequestMetadataFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public credentialFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryDefinitionPrivateFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryDeltaFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public revocationStateFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }
  public credentialDefinitionFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public credentialDefinitionPrivateFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }

  public keyCorrectnessProofFromJson(options: { json: string }): ObjectHandle {
    throw new Error('Method not implemented.')
  }
}
