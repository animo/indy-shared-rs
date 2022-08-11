import type { Schema } from './Schema'

import { IndyObject } from '../IndyObject'
import { indyCredx } from '../register'

import { CredentialDefinitionPrivate } from './CredentialDefinitionPrivate'
import { KeyCorrectnessProof } from './KeyCorrectnessProof'

export type CreateCredentialDefinitionOptions = {
  originDid: string
  schema: Schema
  signatureType: string
  tag: string
  supportRevocation?: boolean
}

export class CredentialDefinition extends IndyObject {
  public static create(options: CreateCredentialDefinitionOptions) {
    const [credDef, credDefPvt, keyProof] = indyCredx.createCredentialDefinition({
      originDid: options.originDid,
      schema: options.schema.handle,
      signatureType: options.signatureType,
      tag: options.tag,
      supportRevocation: options.supportRevocation ?? false,
    })

    return {
      credentialDefinition: new CredentialDefinition(credDef.handle),
      credentialDefinitionPrivate: new CredentialDefinitionPrivate(credDefPvt.handle),
      keyCorrectnessProof: new KeyCorrectnessProof(keyProof.handle),
    }
  }

  public static load(json: string) {
    return new CredentialDefinition(indyCredx.credentialDefinitionFromJson({ json }).handle)
  }

  public getId() {
    return indyCredx.credentialDefinitionGetAttribute({ object: this.handle, name: 'id' })
  }

  public getSchemaId() {
    return indyCredx.credentialDefinitionGetAttribute({ object: this.handle, name: 'schema_id' })
  }
}
