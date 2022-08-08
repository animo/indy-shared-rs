#include <indyCredx.h>

#include <include/libindy_credx.h>

using namespace turboModuleUtility;

namespace indyCredx {

jsi::Value version(jsi::Runtime &rt, jsi::Object options) {
  return jsi::String::createFromAscii(rt, credx_version());
};

} // namespace indyCredx
