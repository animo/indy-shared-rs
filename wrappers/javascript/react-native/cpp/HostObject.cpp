#include <HostObject.h>
#include <algorithm>
#include <vector>

TurboModuleHostObject::TurboModuleHostObject(jsi::Runtime &rt) { return; }

FunctionMap TurboModuleHostObject::functionMapping(jsi::Runtime &rt) {
  FunctionMap fMap;

  fMap.insert(std::make_tuple("version", &indyCredx::version));
  fMap.insert("bufferFree", &indyCredx::bufferFree));
  fMap.insert("createCredential", &indyCredx::createCredential));
  fMap.insert("createCredentialDefinition", &indyCredx::createCredentialDefinition));
  fMap.insert("createCredentialOffer", &indyCredx::createCredentialOffer));
  fMap.insert("createCredentialRequest", &indyCredx::createCredentialRequest));
  fMap.insert("createMasterSecret", &indyCredx::createMasterSecret));
  fMap.insert("createOrUpdateRevocationState", &indyCredx::createOrUpdateRevocationState));
  fMap.insert("createPresentation", &indyCredx::createPresentation));
  fMap.insert("createRevocationRegistry", &indyCredx::createRevocationRegistry));
  fMap.insert("createSchema", &indyCredx::createSchema));
  fMap.insert("credentialDefinitionGetAttribute", &indyCredx::credentialDefinitionGetAttribute));
  fMap.insert("credentialGetAttribute", &indyCredx::credentialGetAttribute));
  fMap.insert("encodeCredentialAttributes", &indyCredx::encodeCredentialAttributes));
  fMap.insert("generateNonce", &indyCredx::generateNonce));
  fMap.insert("getCurrentError", &indyCredx::getCurrentError));
  fMap.insert("mergeRevocationRegistryDeltas", &indyCredx::mergeRevocationRegistryDeltas));
  fMap.insert("objectGetJson", &indyCredx::objectGetJson));
  fMap.insert("objectGetTypeName", &indyCredx::objectGetTypeName));
  fMap.insert("processCredential", &indyCredx::processCredential));
  fMap.insert("revocationRegistryDefinitionGetAttribute", &indyCredx::revocationRegistryDefinitionGetAttribute));
  fMap.insert("revokeCredential", &indyCredx::revokeCredential));
  fMap.insert("schemaGetAttribute", &indyCredx::schemaGetAttribute));
  fMap.insert("setDefaultLogger", &indyCredx::setDefaultLogger));
  fMap.insert("verifyPresentation", &indyCredx::verifyPresentation));
  fMap.insert("objectFree", &indyCredx::objectFree));

  return fMap;
}

jsi::Function TurboModuleHostObject::call(jsi::Runtime &rt, const char *name,
                                          Cb cb) {
  return jsi::Function::createFromHostFunction(
      rt, jsi::PropNameID::forAscii(rt, name), 1,
      [this, cb](jsi::Runtime &rt, const jsi::Value &thisValue,
                 const jsi::Value *arguments, size_t count) -> jsi::Value {
        const jsi::Value *val = &arguments[0];
        turboModuleUtility::assertValueIsObject(rt, val);
        return (*cb)(rt, val->getObject(rt));
      });
};

std::vector<jsi::PropNameID>
TurboModuleHostObject::getPropertyNames(jsi::Runtime &rt) {
  auto fMap = TurboModuleHostObject::functionMapping(rt);
  std::vector<jsi::PropNameID> result;
  for (FunctionMap::iterator it = fMap.begin(); it != fMap.end(); ++it) {
    result.push_back(jsi::PropNameID::forUtf8(rt, it->first));
  }

  return result;
}

jsi::Value TurboModuleHostObject::get(jsi::Runtime &rt,
                                      const jsi::PropNameID &propNameId) {
  auto propName = propNameId.utf8(rt);
  auto fMap = TurboModuleHostObject::functionMapping(rt);
  for (FunctionMap::iterator it = fMap.begin(); it != fMap.end(); ++it) {
    if (it->first == propName) {
      return TurboModuleHostObject::call(rt, it->first, it->second);
    }
  }

  /*
   * https://overreacted.io/why-do-react-elements-have-typeof-property/
   *
   * This is a special React key on the object that `React.createElement()`
   * returns.
   *
   * This function is called under-the-hood to see if this React element is
   * renderable.
   *
   * When we return undefined, instead of `Symbol.for('react.element'), we tell
   * React that this element is not renderable.
   *
   */
  if (propName == "$$typeof")
    return jsi::Value::undefined();

  throw jsi::JSError(rt, "Function: " + propName + " is not defined");
}
