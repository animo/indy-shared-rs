#include <indyCredx.h>

#include <include/libindy_credx.h>

using namespace turboModuleUtility;

namespace indyCredx {

jsi::Value version(jsi::Runtime &rt, jsi::Object options) {
  return jsi::String::createFromAscii(rt, credx_version());
};

jsi::Value version(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value bufferFree(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createCredential(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createCredentialDefinition(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createCredentialOffer(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createCredentialRequest(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createMasterSecret(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createOrUpdateRevocationState(jsi::Runtime &rt,
                                         jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createPresentation(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createRevocationRegistry(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value createSchema(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value credentialDefinitionGetAttribute(jsi::Runtime &rt,
                                            jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value credentialGetAttribute(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value encodeCredentialAttributes(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value generateNonce(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value getCurrentError(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value mergeRevocationRegistryDeltas(jsi::Runtime &rt,
                                         jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value objectGetJson(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value objectGetTypeName(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value processCredential(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value revocationRegistryDefinitionGetAttribute(jsi::Runtime &rt,
                                                    jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value revokeCredential(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value schemaGetAttribute(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value setDefaultLogger(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value verifyPresentation(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

jsi::Value objectFree(jsi::Runtime &rt, jsi::Object options) {
  return jsi::Value::null();
};

} // namespace indyCredx
