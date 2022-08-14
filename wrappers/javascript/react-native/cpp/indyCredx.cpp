#include <indyCredx.h>

#include <include/libindy_credx.h>

using namespace turboModuleUtility;

namespace indyCredx {

jsi::Value version(jsi::Runtime &rt, jsi::Object options) {
  return jsi::String::createFromAscii(rt, credx_version());
};

jsi::Value bufferFree(jsi::Runtime &rt, jsi::Object options) {
  auto buffer = jsiToValue<ByteBuffer>(rt, options, "buffer");

  credx_buffer_free(buffer);

  return jsi::Value::null();
};

jsi::Value createCredential(jsi::Runtime &rt, jsi::Object options) {
  auto credDef = jsiToValue<ObjectHandle>(rt, options, "credDef");
  auto credDefPrivate = jsiToValue<ObjectHandle>(rt, options, "credDefPrivate");
  auto credOffer = jsiToValue<ObjectHandle>(rt, options, "credOffer");
  auto credRequest = jsiToValue<ObjectHandle>(rt, options, "credRequest");
  auto attrNames = jsiToValue<FfiStrList>(rt, options, "attrNames");
  auto attrRawValues = jsiToValue<FfiStrList>(rt, options, "attrRawValues");
  auto attrEncValues = jsiToValue<FfiStrList>(rt, options, "attrEncValues");
  auto revocation = jsiToValue<FfiCredRevInfo>(rt, options, "revocation");

  ObjectHandle credP;
  ObjectHandle revRegP;
  ObjectHandle revDeltaP;

  ErrorCode code = credx_create_credential(
      credDef, credDefPrivate, credoffer, credRequest, attrNames, attrRawValues,
      attrEncvalues, revocation, credP, revRegP, revDeltaP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "cred", credP);
  object.setProperty(rt, "revReg", revRegP);
  object.setProperty(rt, "revDelta", revDeltaP);
  return object;
};

jsi::Value createCredentialDefinition(jsi::Runtime &rt, jsi::Object options) {
  auto originDid = jsiToValue<FfiStr>(rt, options, "originDid");
  auto schema = jsiToValue<ObjectHandle>(rt, options, "schema");
  auto tag = jsiToValue<FfiStr>(rt, options, "tag");
  auto signatureType = jsiToValue<FfiStr>(rt, options, "signatureType");
  auto supportRevocation = jsiToValue<int8_t>(rt, options, "supportRevocation");

  ObjectHandle credDefP;
  ObjectHandle credDefPvtP;
  ObjectHandle keyProofP;

  ErrorCode code = credx_create_credential_definition(
      originDid, schema, tag, signatureType, supportRevocation, credDefP,
      credDefPvtP, keyProofP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "credDef", credDefP);
  object.setProperty(rt, "credDevPvt", credDevPvtP);
  object.setProperty(rt, "keyProof", keyProofP);
  return object;
};

jsi::Value createCredentialOffer(jsi::Runtime &rt, jsi::Object options) {
  auto schemaId = jsiToValue<FfiStr>(rt, options, "schemaId");
  auto credDef = jsiToValue<ObjectHandle>(rt, options, "credDef");
  auto keyProof = jsiToValue<ObjectHandle>(rt, options, "keyProof");

  Objecthandle credOfferP;

  ErrorCode code =
      credx_create_credential_offer(schemaId, credDef, keyProof, credOfferP);
  handleError(rt, code);

  return jsi::Value(credOfferP);
};

jsi::Value createCredentialRequest(jsi::Runtime &rt, jsi::Object options) {
  auto proverDid = jsiToValue<FfiStr>(rt, options, "proverDid");
  auto credDef = jsiToValue<ObjectHandle>(rt, options, "credDef");
  auto masterSecret = jsiToValue<ObjectHandle>(rt, options, "masterSecret");
  auto masterSecretId = jsiToValue<FfiStr>(rt, options, "masterSecretId");
  auto credOffer = jsiToValue<ObjectHandle>(rt, options, "credOffer");

  Objecthandle credReqP;
  Objecthandle credReqMetaP;

  ErrorCode code = credx_create_credential_request(
      proverDid, credDef, masterSecret, masterSecretId, credOffer, credReqP,
      credReqMetaP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "credReq", credReqP);
  object.setProperty(rt, "credReqMeta", credReqMetaP);
  return object;
};

jsi::Value createMasterSecret(jsi::Runtime &rt, jsi::Object options) {
  ObjectHandle masterSecretP;

  ErrorCode code = crex_create_master_secret(masterSecretP);
  handleError(rt, code);

  return jsi::Value(masterSecretP);
};

jsi::Value createOrUpdateRevocationState(jsi::Runtime &rt,
                                         jsi::Object options) {
  auto revRegDef = jsiToValue<ObjectHandle>(rt, options, "revRegDef");
  auto revRegDelta = jsiToValue<ObjectHandle>(rt, options, "revRegDelta");
  auto timestamp = jsiToValue<int64_t>(rt, options, "timestamp");
  auto tailsPath = jsiToValue<FfiStr>(rt, options, "tailsPath");
  auto revState = jsiToValue<ObjectHandle>(rt, options, "revState");

  ObjectHandle revStateP;

  ErrorCode code = credx_create_or_update_revocation_state(
      revRegDef, revRegDelta, timestamp, tailsPath, revState, revStateP);
  handleError(rt, code);

  return jsi::Value(revStateP);
};

jsi::Value createPresentation(jsi::Runtime &rt, jsi::Object options) {
  auto presReq = jsiToValue<ObjectHandle>(rt, options, "presReq");
  auto credentials =
      jsiToValue<FfiList_FfiCredentialEntry>(rt, options, "credentials");
  auto credentialsProve =
      jsiToValue<FfiList_FfiCredentialProve>(rt, options, "credentialsProve");
  auto selfAttestNames = jsiToValue<FfiStrList>(rt, options, "selfAttestNames");
  auto selfAttestValues =
      jsiToValue<FfiStrList>(rt, options, "selfAttestValues");
  auto masterSecret = jsiToValue<ObjectHandle>(rt, options, "masterSercet");
  auto schemas = jsiToValue<FfiList_ObjectHandle>(rt, options, "schemas");
  auto credDefs = jsiToValue<FfiList_ObjectHandle>(rt, options, "credDefs");

  ObjectHandle presentationP;

  ErrorCode code = credx_create_presentation(
      presReq, credentials, credentialsProve, selfAttestNames, selfAttestValues,
      schemas, credDefs, presentationP);

  return jsi::Value(presentationP);
};

jsi::Value createRevocationRegistry(jsi::Runtime &rt, jsi::Object options) {
  auto originDid = jsiToValue<FfiStr>(rt, options, "originDid");
  auto credDef = jsiToValue<ObjectHandle>(rt, options, "credDef");
  auto tag = jsiToValue<FfiStr>(rt, options, "tag");
  auto revRegType = jsiToValue<FfiStr>(rt, options, "revRegType");
  auto issuanceType = jsiToValue<FfiStr>(rt, options, "issuanceType");
  auto maxCredNum = jsiToValue<int64_t>(rt, options, "maxCredNum");
  auto tailsDirPath = jsiToValue<FfiStr>(rt, options, "tailsDirPath");

  ObjectHandle regDefP;
  ObjechHandle regDefPrivateP;
  ObjectHandle regEntryP;
  ObjectHandle regInitDeltaP;

  ErorCode code = credx_create_revocation_registry(
      originDid, credDef, tag, revRegType, issuanceType, maxCredNum,
      tailsDirPath, regDefP, regDefPrivateP, regEntryP, regInitDeltaP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "regDef", regDefP);
  object.setProperty(rt, "regDefPrivate", regDefPrivateP);
  object.setProperty(rt, "regEntry", regEntryP);
  object.setProperty(rt, "regInitDelta", regInitDeltaP);
  return object;
};

jsi::Value createSchema(jsi::Runtime &rt, jsi::Object options) {
  auto originDid = jsiToValue<FfiStr>(rt, options, "originDid");
  auto schemaName = jsiToValue<FfiStr>(rt, options, "schemaName");
  auto schemaVersion = jsiToValue<FfiStr>(rt, options, "schemaVersion");
  auto attrNames = jsiToValue<FfiStrList>(rt, options, "attrNames");
  auto seqNo = jsiToValue<int64_t>(rt, options, "seqNo");

  ObjectHandle resultP;

  ErrorCode code = credx_create_schema(originDid, schemaName, schemaVersion,
                                       attrNames, seqNo, resultP);
  handleError(rt, code);

  return jsi::Value(resultP);
};

jsi::Value credentialDefinitionGetAttribute(jsi::Runtime &rt,
                                            jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");
  auto name = jsiToValue<FfiStr>(rt, options, "name");

  const char **resultP;

  ErrorCode code =
      credx_credential_definition_get_attribute(handle, name, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, resultP);
};

jsi::Value credentialGetAttribute(jsi::Runtime &rt, jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");
  auto name = jsiToValue<FfiStr>(rt, options, "name");

  const char **resultP;

  ErrorCode code = credx_credential_get_attribute(handle, name, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, resultP);
};

jsi::Value encodeCredentialAttributes(jsi::Runtime &rt, jsi::Object options) {
  auto attrRawValues = jsiToValue<FfiStrList>(rt, options, "attrRawValues");

  const char **resultP;

  ErrorCode code = credx_encode_credential_attributes(attrRawValues, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, resultP);
};

jsi::Value generateNonce(jsi::Runtime &rt, jsi::Object options) {
  const char **nonceP;

  ErrorCode code = credx_generate_nonce(nonceP);
  handleError(rt code);

  return jsi::String::createFromAscii(rt, nonceP);
};

jsi::Value getCurrentError(jsi::Runtime &rt, jsi::Object options) {
  const char **errorJsonP;

  ErrorCode code = credx_get_current_error(errorJsonP);
  handleError(rt code);

  return jsi::String::createFromAscii(rt, errorJsonP);
};

jsi::Value mergeRevocationRegistryDeltas(jsi::Runtime &rt,
                                         jsi::Object options) {
  auto revRegDelta1 = jsiToValue<ObjectHandle>(rt, options, "revRegDelta1");
  auto revRegDelta2 = jsiToValue<ObjectHandle>(rt, options, "revRegDelta2");

  ObjectHandle revRegDeltaP;

  ErrorCode code = credx_merge_revocation_registry_deltas(
      revRegDelta1, revRegDelta2, revRegDeltaP);
  handleError(rt, code);

  return jsi::Value(revRegDeltaP);
};

jsi::Value objectGetJson(jsi::Runtime &rt, jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");

  ByteBuffer resultP;

  ErrorCode code = credx_object_get_json(handle, resultP);
  handleError(rt, code);

  return jsi::Value(resultP);
};

jsi::Value objectGetTypeName(jsi::Runtime &rt, jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");

  const char **resultP;

  ErrorCode code = credx_object_get_type_name(handle, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, errorJsonP);
};

jsi::Value processCredential(jsi::Runtime &rt, jsi::Object options) {
  auto cred = jsiToValue<ObjectHandle>(rt, options, "cred");
  auto credReqMetadata =
      jsiToValue<ObjectHandle>(rt, options, "credReqMetadata");
  auto masterSecret = jsiToValue<ObjectHandle>(rt, options, "masterSercet");
  auto credDef = jsiToValue<ObjectHandle>(rt, options, "credDef");
  auto revRegDef = jsiToValue<ObjectHandle>(rt, options, "revRegDef");

  ObjectHandle *credP;

  ErrorCode code = credx_process_credential(cred, credReqMetadata, masterSecret,
                                            credDef, revRegDef, credP);
  handleError(rt, code);

  return jsi::Value(credP);
};

jsi::Value revocationRegistryDefinitionGetAttribute(jsi::Runtime &rt,
                                                    jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");
  auto name = jsiToValue<FfiStr>(rt, options, "name");

  const char **resultP;

  ErrorCode code =
      credx_revocation_registry_definition_get_attrbute(handle, name, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, resultP);
};

jsi::Value revokeCredential(jsi::Runtime &rt, jsi::Object options) {
  auto revRegDef = jsiToValue<ObjectHandle>(rt, options, "revRegDef");
  auto revReg = jsiToValue<ObjectHandle>(rt, options, "revReg");
  auto credRevIdx = jsiToValue<int64_t>(rt, options, "credRevIdx");
  auto tailsPath = jsiToValue<FfiStr>(rt, options, "tailsPath");

  ObjectHandle *revRegP;
  ObjectHandle *revRegDeltaP;

  ErrorCode code = credx_revoke_credential(revRegDef, revReg, credRevIdx,
                                           tailsPath, revRegP, revRegDeltaP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "revReg", revRegP);
  object.setProperty(rt, "revRegDelta", revRegDeltaP);
  return object;
};

jsi::Value schemaGetAttribute(jsi::Runtime &rt, jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");
  auto name = jsiToValue<FfiStr>(rt, options, "name");

  const char **resultP;

  ErrorCode code = credx_schema_get_attribute(handle, name, resultP);
  handleError(rt, code);

  return jsi::String::createFromAscii(rt, resultP);
};

jsi::Value setDefaultLogger(jsi::Runtime &rt, jsi::Object options) {
  credx_set_default_logger();
  return jsi::Value::null();
};

jsi::Value updateRevocationRegistry(jsi::Runtime &rt, jsi::Object options) {
  auto revRegDef = jsiToValue<ObjectHandle>(rt, options, "revRegDef");
  auto revReg = jsiToValue<ObjectHandle>(rt, options, "revReg");
  auto issued = jsiToValue<FfiList_i64>(rt, options, "revoked");
  auto tailsPath = jsiToValue<FfiStr>(rt, options, "tailsPath");

  ObjectHanlde *revRegP;
  ObjectHanlde *revRegDeltaP;

  ErrorCode code = credx_update_revocation_registry(
      revRegDef, revReg, issued, tailsPath, revRegP, revRegDeltaP);
  handleError(rt, code);

  jsi::Object object = jsi::Object(rt);
  object.setProperty(rt, "revReg", revRegP);
  object.setProperty(rt, "revRegDelta", revRegDeltaP);
  return object;
}

jsi::Value verifyPresentation(jsi::Runtime &rt, jsi::Object options) {
  auto presentation = jsiToValue<ObjectHandle>(rt, options, "presentation");
  auto presReq = jsiToValue<ObjectHandle>(rt, options, "presReq");
  auto schemas = jsiToValue<FfiList_ObjectHandle>(rt, options, "schemas");
  auto credDefs = jsiToValue<FfiList_ObjectHandle>(rt, options, "credDefs");
  auto revRegDefs = jsiToValue<FfiList_ObjectHandle>(rt, options, "revRegDefs");
  auto revRegEntries =
      jsiToValue<FfiList_FfiRevocationEntry>(rt, options, "revRegEntries");

  int8_t *resultP;

  ErrorCode code =
      credx_verify_presentation(presentation, presReq, schemas, credDefs,
                                revRegDefs, revRegEntries, resultP);
  handleError(rt, code);

  return jsi::Value(resultP);
};

jsi::Value objectFree(jsi::Runtime &rt, jsi::Object options) {
  auto handle = jsiToValue<ObjectHandle>(rt, options, "handle");

  credx_object_free(handle);

  return jsi::Value::null();
};

} // namespace indyCredx
