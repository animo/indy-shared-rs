/* eslint-disable no-console */
import { registerIndyCredx } from 'indy-credx-shared'

import { NodeJSIndyCredx } from './NodeJSIndyCredx'

const run = () => {
  const credx = new NodeJSIndyCredx()
  // NOTE: this is only required when using the functionality from within shared
  // if you want to access the library like in the `console.log` below, you can
  // do that directly
  registerIndyCredx({ credx })
  console.log(credx.version())
  console.log(credx.getCurrentError())
  console.log(credx.generateNonce())
  const schemaObj = credx.createSchema({
    name: 'schema-1',
    originDid: '55GkHamhTU1ZbTbV2ab9DE',
    version: '1',
    sequenceNumber: 1,
    attributeNames: ['attr-1', 'attr-2'],
  })
  console.log(`Create Schema error:  ${credx.getCurrentError()}`)

  const schemaId = credx.schemaGetAttribute({
    schema: schemaObj,
    name: 'id',
  })
  console.log(`schemaGetAttribute returns: ${schemaId}`)
  console.log(`schemaGetAttribute error:  ${credx.getCurrentError()}`)

  const [credDefObj, credDefPvt, keyProof] = credx.createCredentialDefinition({
    originDid: '55GkHamhTU1ZbTbV2ab9DE',
    schema: schemaObj,
    signatureType: 'CL',
    supportRevocation: true,
    tag: 'TAG',
  })
  console.log(`Create Cred Def Error: ${credx.getCurrentError()}`)

  const encoded = credx.encodeCredentialAttributes({ key1: 'value2', key2: 'value1' })
  console.log(`encoded: ${JSON.stringify(encoded)}`)

  const [revRegDef, revRegDefPrivate, revReg, revRegInitDelta] = credx.createRevocationRegistry({
    originDid: '55GkHamhTU1ZbTbV2ab9DE',
    credentialDefinition: credDefObj,
    tag: 'default',
    revocationRegistryType: 'CL_ACCUM',
    maximumCredentialNumber: 100,
  })

  const tailsPath = credx.revocationRegistryDefinitionGetAttribute({
    object: revRegDef,
    name: 'tails_location',
  })
  console.log(`revocationRegistryDefinitionGetAttribute returns: ${tailsPath}`)

  const masterSecret = credx.createMasterSecret()
  const masterSecretId = 'master secret id'

  const credOfferObj = credx.createCredentialOffer({
    schemaId,
    credentialDefinition: credDefObj,
    keyProof,
  })
  console.log(`Create Cred Offer Error: ${credx.getCurrentError()}`)

  const [credReq, credReqMetadata] = credx.createCredentialRequest({
    proverDid: '55GkHamhTU1ZbTbV2ab9DE',
    credentialDefinition: credDefObj,
    masterSecret,
    masterSecretId,
    credentialOffer: credOfferObj,
  })
  console.log(`Create Cred Request Error: ${credx.getCurrentError()}`)

  const issuerRevIndex = 1

  const [cred, revRegUpdated, revDelta] = credx.createCredential({
    credentialDefinition: credDefObj,
    credentialDefinitionPrivate: credDefPvt,
    credentialOffer: credOfferObj,
    credentialRequest: credReq,
    attributeRawValues: { 'attr-1': 'test' },
    // TODO: CredentialRevocationConfig
    attributeEncodedValues: undefined,
    revocationConfiguration: {
      registryDefinition: revRegDef,
      registryDefinitionPrivate: revRegDefPrivate,
      registry: revReg,
      registryIndex: issuerRevIndex,
      tailsPath: tailsPath,
    },
  })

  console.log(`Create Credential Error: ${credx.getCurrentError()}`)

  const credReceived = credx.processCredential({
    credential: cred,
    credentialDefinition: credDefObj,
    credentialRequestMetadata: credReqMetadata,
    masterSecret,
    revocationRegistryDefinition: revRegDef,
  })

  console.log(`Process credential error: ${credx.getCurrentError()}`)

  const timestamp = new Date().getUTCDate()

  const presRequestObj = credx.presentationRequestFromJson({
    json: JSON.stringify({
      name: 'proof',
      version: '1.0',
      nonce: '1234',
      requested_attributes: {
        reft: {
          name: 'attr',
          non_revoked: { from: timestamp, to: timestamp },
        },
      },
      requested_predicates: {},
      non_revoked: { from: timestamp, to: timestamp },
      ver: '1.0',
    }),
  })

  console.log(`Presentation Request from JSON error: ${credx.getCurrentError()}`)

  console.log(`Presentation Request type name: ${credx.getTypeName({ object: presRequestObj })}`)
  console.log(`Presentation Request type name: ${presRequestObj.typeName()})}`)

  const json = credx.getJson({ object: presRequestObj })

  //console.log(`Presentation Request JSON. Length ${json.length}: ${json}`)

  const revRegIndex = credx.credentialGetAttribute({
    object: cred,
    name: 'rev_reg_index',
  })

  console.log(`credentialGetAttribute returns: ${revRegIndex}`)

  const revocationRegistryIndex = revRegIndex === null ? 0 : parseInt(revRegIndex)

  console.log(revocationRegistryIndex)
  const revocationState = credx.createOrUpdateRevocationState({
    revocationRegistryDefinition: revRegDef,
    revocationRegistryDelta: revRegInitDelta,
    revocationRegistryIndex,
    timestamp,
    tailsPath,
  })

  console.log(`Create Revocation State error: ${credx.getCurrentError()}`)
}

run()
