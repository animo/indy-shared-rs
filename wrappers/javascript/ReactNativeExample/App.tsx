import type { TestFn } from './tests/bindings.test'

import React from 'react'
import { Button, SafeAreaView, ScrollView } from 'react-native'

import {
  _testEncodeCredentialAttributes,
  _testAll,
  _testCreateSchema,
  _testGenerateNonce,
  _testCurrentError,
  beforeAll,
  _testVersion,
  _testCreateCredentialDefinition,
} from './tests/bindings.test'

const TestComponent = ({ testFunc }: { testFunc: TestFn }) => {
  const funcName = testFunc.name
  return (
    <Button
      title={funcName}
      onPress={() => {
        // eslint-disable-next-line no-console
        if (!testFunc()) console.log(`Test ${funcName} succeeded`)
      }}
    />
  )
}

export const App: React.FC = () => {
  beforeAll()
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TestComponent testFunc={_testAll} />
        <TestComponent testFunc={_testVersion} />
        <TestComponent testFunc={_testCurrentError} />
        <TestComponent testFunc={_testGenerateNonce} />
        <TestComponent testFunc={_testCreateSchema} />
        <TestComponent testFunc={_testCreateCredentialDefinition} />
        <TestComponent testFunc={_testEncodeCredentialAttributes} />
      </ScrollView>
    </SafeAreaView>
  )
}
