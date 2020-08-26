import useMatchMedia from './useMatchMedia'

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

export default () =>
  useMatchMedia(MEDIA_QUERY)
