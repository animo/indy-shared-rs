import { registerIndyCredx, ReactNativeIndyCredx, indyCredx } from 'indy-credx-react-native'

// FIXTURES
const TEST_DID = '55GkHamhTU1ZbTbV2ab9DE'
const TEST_SCHEMA = '55GkHamhTU1ZbTbV2ab9DE:2:schema-1:1'

export type TestFn = () => number

const assert = (b: unknown, msg?: string) => {
  if (b) return

  throw new Error(`[TEST_ERROR]: ${msg ?? 'Something went wrong'}`)
}

const isNum = (s: string): boolean => {
  const regexp = new RegExp(/^\d*$/)
  const x = regexp.exec(s)
  if (x && x.length > 0) {
    return true
  }
  return false
}

export const beforeAll = () => {
  registerIndyCredx({ credx: new ReactNativeIndyCredx() })
}

export const _testVersion: TestFn = () => {
  const version = indyCredx.version()
  const expected = '0.3.1'

  assert(version === '0.3.1', `Version mismatch. got: ${version} - expected: ${expected}`)

  return 0
}

export const _testCurrentError: TestFn = () => {
  const error = indyCredx.getCurrentError()
  const expected = { code: 0, message: null }

  assert(error === JSON.stringify(expected))

  return 0
}

export const _testGenerateNonce: TestFn = () => {
  const nonce = indyCredx.generateNonce()

  assert(isNum(nonce), 'Nonce is not a number')

  return 0
}

export const _testCreateSchema: TestFn = () => {
  const schemaObj = indyCredx.createSchema({
    name: 'schema-1',
    originDid: TEST_DID,
    version: '1',
    sequenceNumber: 1,
    attributeNames: ['attr-1'],
  })

  const schemaId = indyCredx.schemaGetAttribute({
    objectHandle: schemaObj,
    name: 'id',
  })

  assert(schemaId === TEST_SCHEMA, `schemaIdMistach. got: ${schemaId} - expected: ${TEST_SCHEMA}`)
  return 0
}

export const _testCreateCredentialDefinition: TestFn = () => {
  const schemaObj = indyCredx.createSchema({
    name: 'schema-1',
    originDid: TEST_DID,
    version: '1',
    sequenceNumber: 1,
    attributeNames: ['attr-1'],
  })

  const { keyProof, credentialDefinition, credentialDefinitionPrivate } = indyCredx.createCredentialDefinition({
    originDid: TEST_DID,
    schema: schemaObj,
    signatureType: 'CL',
    supportRevocation: true,
    tag: 'TAG',
  })

  const credDefJson = indyCredx.getJson({ objectHandle: credentialDefinition })

  const parsedCredDef = JSON.parse(credDefJson)
  assert(parsedCredDef.id === '55GkHamhTU1ZbTbV2ab9DE:3:CL:1:TAG')
  assert(parsedCredDef.tag === 'TAG')
  assert(parsedCredDef.type === 'CL')
  assert(parsedCredDef.schemaId === '1')
  assert(parsedCredDef.ver === '1.0')

  const credDefPvtJson = indyCredx.getJson({ objectHandle: credentialDefinitionPrivate })
  const keyProofJson = indyCredx.getJson({ objectHandle: keyProof })

  assert(JSON.parse(credDefPvtJson).value, 'Could not access value')
  assert(JSON.parse(keyProofJson).c, 'could not access c')
  assert(JSON.parse(keyProofJson).xr_cap, 'could not access xr_cap')

  return 0
}

export const _testEncodeCredentialAttributes: TestFn = () => {
  const encoded = indyCredx.encodeCredentialAttributes({ attributeRawValues: ['value2', 'value1'] })

  assert(
    encoded[0] === '2360207505573967335061705667247358223962382058438765247085581582985596391831',
    'Could not encode key1'
  )
  assert(
    encoded[1] === '27404702143883897701950953229849815393032792099783647152371385368148256400014',
    'Could not encode key2'
  )
  return 0
}

export const _testAll: TestFn = () => {
  _testVersion()
  _testCurrentError()
  _testGenerateNonce()
  _testCreateSchema()
  _testCreateCredentialDefinition()
  _testEncodeCredentialAttributes()

  return 0
}
