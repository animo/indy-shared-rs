import {
  number,
  NativeCredentialEntry,
  NativeCredentialProve,
  NativeRevocationEntry,
  NativeCredentialRevocationConfig,
} from 'indy-credx-shared'

// Alias for _Handle
type _Handle = number

export interface NativeBindings {
  version(options: Record<never, never>): string
  getCurrentError(options: Record<never, never>): string
  generateNonce(options: Record<never, never>): string
  createSchema(options: {
    originDid: string
    name: string
    version: string
    attributeNames: string[]
    sequenceNumber?: number | undefined
  }): _Handle
  createCredentialDefinition(options: {
    originDid: string
    schema: number
    tag: string
    signatureType: string
    supportRevocation: number
  }): [_Handle, _Handle, _Handle]
  createCredential(options: {
    credentialDefinition: number
    credentialDefinitionPrivate: number
    credentialOffer: number
    credentialRequest: number
    attributeRawValues: string
    attributeEncodedValues?: string | undefined
    revocationConfiguration?: string | undefined
  }): [_Handle, _Handle, _Handle]
  encodeCredentialAttributes(options: { attributeRawValues: string }): Record<string, string>
  processCredential(options: {
    credential: number
    credentialRequestMetadata: number
    masterSecret: number
    credentialDefinition: number
    revocationRegistryDefinition?: number | undefined
  }): _Handle
  revokeCredential(options: {
    revocationRegistryDefinition: number
    revocationRegistry: number
    credentialRevocationIndex: number
    tailsPath: string
  }): [_Handle, _Handle]

  createCredentialOffer(options: { schemaId: string; credentialDefinition: number; keyProof: number }): _Handle

  createCredentialRequest(options: {
    proverDid: string
    credentialDefinition: number
    masterSecret: number
    masterSecretId: string
    credentialOffer: number
  }): [_Handle, _Handle]

  createMasterSecret(options: Record<never, never>): number

  createPresentation(options: {
    presentationRequest: number
    credentials: string[]
    credentialsProve: string[]
    selfAttest: string
    masterSecret: number
    schemas: number[]
    credentialDefinitions: number[]
  }): _Handle

  verifyPresentation(options: {
    presentation: number
    presentationRequest: number
    schemas: number[]
    credentialDefinitions: number[]
    revocationRegistryDefinitions: number[]
    revocationEntries: string[]
  }): boolean

  createRevocationRegistry(options: {
    originDid: string
    credentialDefinition: number
    tag: string
    revocationRegistryType: string
    issuanceType?: string | undefined
    maximumCredentialNumber: number
    tailsDirectoryPath?: string | undefined
  }): [_Handle, _Handle, _Handle, _Handle]

  updateRevocationRegistry(options: {
    revocationRegistryDefinition: number
    revocationRegistry: number
    issued: number[]
    revoked: number[]
    tailsDirectoryPath: string
  }): [number, _Handle]

  mergeRevocationRegistryDeltas(options: {
    revocationRegistryDelta1: number
    revocationRegistryDelta2: number
  }): _Handle

  createOrUpdateRevocationState(options: {
    revocationRegistryDefinition: number
    revocationRegistryDelta: number
    revocationRegistryIndex: number
    timestamp: number
    tailsPath: string
    previousRevocationState?: number | undefined
  }): _Handle
  presentationRequestFromJson(options: { json: string }): _Handle
  schemaGetAttribute(options: { objectHandle: number; name: string }): string
  revocationRegistryDefinitionGetAttribute(options: { objectHandle: number; name: string }): string
  credentialGetAttribute(options: { objectHandle: number; name: string }): string
  getJson(options: { objectHandle: number }): string
  getTypeName(options: { objectHandle: number }): string
  objectFree(options: { objectHandle: number }): void
  credentialDefinitionGetAttribute(options: { objectHandle: number; name: string }): string
  revocationRegistryDefinitionFromJson(options: { json: string }): _Handle
  revocationRegistryFromJson(options: { json: string }): _Handle
  presentationFromJson(options: { json: string }): _Handle
  credentialOfferFromJson(options: { json: string }): _Handle
  schemaFromJson(options: { json: string }): _Handle
  masterSecretFromJson(options: { json: string }): _Handle
  credentialRequestFromJson(options: { json: string }): _Handle
  credentialRequestMetadataFromJson(options: { json: string }): _Handle
  credentialFromJson(options: { json: string }): _Handle
  revocationRegistryDefinitionPrivateFromJson(options: { json: string }): _Handle
  revocationRegistryDeltaFromJson(options: { json: string }): _Handle
  revocationStateFromJson(options: { json: string }): _Handle
  credentialDefinitionFromJson(options: { json: string }): _Handle
  credentialDefinitionPrivateFromJson(options: { json: string }): _Handle
  keyCorrectnessProofFromJson(options: { json: string }): _Handle
}
