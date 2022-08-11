import type { CredentialDefinition } from './CredentialDefinition'
import type { CredentialDefinitionPrivate } from './CredentialDefinitionPrivate'
import type { CredentialOffer } from './CredentialOffer'
import type { CredentialRequest } from './CredentialRequest'
import type { CredentialRequestMetadata } from './CredentialRequestMetadata'
import type { CredentialRevocationConfig } from './CredentialRevocationConfig'
import type { MasterSecret } from './MasterSecret'
import type { RevocationRegistryDefinition } from './RevocationRegistryDefinition'

import { IndyObject } from '../IndyObject'
import { indyCredx } from '../register'

import { RevocationRegistry } from './RevocationRegistry'
import { RevocationRegistryDelta } from './RevocationRegistryDelta'

export type CreateCredentialOptions = {
  credentialDefinition: CredentialDefinition
  credentialDefinitionPrivate: CredentialDefinitionPrivate
  credentialOffer: CredentialOffer
  credentialRequest: CredentialRequest
  attributeRawValues: Record<string, string>
  attributeEncodedValues?: Record<string, string>
  revocationConfiguration?: CredentialRevocationConfig
}

export type ProcessCredentialOptions = {
  credentialRequestMetadata: CredentialRequestMetadata
  masterSecret: MasterSecret
  credentialDefinition: CredentialDefinition
  revocationRegistryDefinition?: RevocationRegistryDefinition
}

export class Credential extends IndyObject {
  public static create(options: CreateCredentialOptions) {
    const [cred, revReg, revDelta] = indyCredx.createCredential({
      credentialDefinition: options.credentialDefinition.handle,
      credentialDefinitionPrivate: options.credentialDefinitionPrivate.handle,
      credentialRequest: options.credentialRequest.handle,
      credentialOffer: options.credentialOffer.handle,
      attributeRawValues: options.attributeRawValues,
      attributeEncodedValues: options.attributeEncodedValues,
      revocationConfiguration: options.revocationConfiguration?.native,
    })

    return {
      credential: new Credential(cred.handle),
      revocationRegistry: revReg ? new RevocationRegistry(revReg.handle) : undefined,
      revocationRegistryDelta: revDelta ? new RevocationRegistryDelta(revDelta.handle) : undefined,
    }
  }

  public static load(json: string) {
    return new Credential(indyCredx.credentialFromJson({ json }).handle)
  }

  public process(options: ProcessCredentialOptions) {
    const credential = indyCredx.processCredential({
      credential: this.handle,
      credentialDefinition: options.credentialDefinition.handle,
      credentialRequestMetadata: options.credentialRequestMetadata.handle,
      masterSecret: options.masterSecret.handle,
      revocationRegistryDefinition: options.revocationRegistryDefinition?.handle,
    })

    return new Credential(credential.handle)
  }

  public getSchemaId() {
    return indyCredx.credentialGetAttribute({ object: this.handle, name: 'schema_id' })
  }

  public getCredentialDefinitionId() {
    return indyCredx.credentialGetAttribute({ object: this.handle, name: 'cred_def_id' })
  }

  public getRevocationRegistryId() {
    return indyCredx.credentialGetAttribute({ object: this.handle, name: 'rev_reg_id' })
  }

  public getRevocationRegistryIndex() {
    const index = indyCredx.credentialGetAttribute({ object: this.handle, name: 'rev_reg_index' })
    return index ? Number(index) : undefined
  }
}
