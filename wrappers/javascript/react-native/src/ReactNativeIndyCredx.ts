import type {
  CredentialEntry,
  CredentialProve,
  CredentialRevocationConfig,
  IndyCredx,
  ObjectHandle,
  RevocationEntry,
} from 'indy-credx-shared'

export class ReactNativeIndyCredx implements IndyCredx {
  public version(): string {
    throw new Error('Method not implemented.')
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
    revocationConfiguration?: CredentialRevocationConfig | undefined
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
    credentials: CredentialEntry[]
    credentialsProve: CredentialProve[]
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
    revocationEntries: RevocationEntry[]
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

  public schemaGetAttribute(options: { schema: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public revocationRegistryDefinitionGetAttribute(options: { object: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public credentialGetAttribute(options: { object: ObjectHandle; name: string }): string {
    throw new Error('Method not implemented.')
  }

  public getJson(options: { object: ObjectHandle }): string {
    throw new Error('Method not implemented.')
  }

  public getTypeName(options: { object: ObjectHandle }): string {
    throw new Error('Method not implemented.')
  }

  public objectFree(options: { object: ObjectHandle }): void {
    throw new Error('Method not implemented.')
  }
}
