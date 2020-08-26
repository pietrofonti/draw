import { identity } from 'lodash'

import makeReducerHookPersist from 'utils/makeReducerHookPersist'

const possibleValues = [
  'light',
  'dark',
  'auto',
] as const

export type Theme = (typeof possibleValues)[number]

export default makeReducerHookPersist<Theme>('store:theme', 'light', {
  parse: identity,
  serialize: identity,
  validate: v => possibleValues.includes(v),
})
