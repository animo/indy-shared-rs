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
  //console.log(credx.createMasterSecret())
  const schemaObj = credx.createSchema({
    name: 'schema-1',
    originDid: '55GkHamhTU1ZbTbV2ab9DE',
    version: '1',
    sequenceNumber: 1,
    attributeNames: ['attribute-1', 'attribute-2'],
  })
  console.log(`Create Schema error:  ${credx.getCurrentError()}`)

  const schemaId = credx.schemaGetAttribute({
    schema: schemaObj,
    name: 'id',
  })
  console.log(`schemaGetAttribute returns: ${schemaId}`)
  console.log(`schemaGetAttribute error:  ${credx.getCurrentError()}`)

  const credDefObj = credx.createCredentialDefinition({
    originDid: '55GkHamhTU1ZbTbV2ab9DE',
    schema: schemaObj,
    signatureType: 'CL',
    supportRevocation: false,
    tag: 'TAG',
  })
  console.log(`Create Cred Def Error: ${credx.getCurrentError()}`)

  const encoded = credx.encodeCredentialAttributes({ key1: 'value2', key2: 'value1' })
  console.log(`encoded: ${JSON.stringify(encoded)}`)
}

run()
