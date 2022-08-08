#pragma once

#include <jsi/jsi.h>

#include <include/libindy_credx.h>
#include <turboModuleUtility.h>

using namespace facebook;

namespace indyCredx {

jsi::Value version(jsi::Runtime &rt, jsi::Object options);

} // namespace indyCredx
