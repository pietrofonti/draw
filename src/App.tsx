import React, {
  useEffect,
  lazy,
  Suspense,
} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'

import usePopup from 'store/usePopup'
import useIsDarkMode from 'utils/hooks/useIsDarkMode'

import * as themes from './themes'
import Body from './Body'
import Popup from './Popup'

const routesPromise = import(/* webpackPreload: true, webpackChunkName: "routes" */ './routes')
const versionPromise = import(/* webpackPreload: true, webpackChunkName: "version" */ './Version')

const Routes = lazy(() => routesPromise)
const Version = lazy(() => versionPromise)

const Root = styled.div`
  & * {
    box-sizing: border-box;
  }
`

const App = () => {
  const [popup, setPopup] = usePopup()
  const isDarkMode = useIsDarkMode()

  useEffect(() => {
    if (popup.initial && !popup.waiting) {
      setPopup({
        initial: false,
      })
    }
  }, [popup.waiting])

  return (
    <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
      <Body />
      <Root>
        <Popup />
        <Suspense fallback={false}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </Suspense>
        <Suspense fallback={false}>
          <Version />
        </Suspense>
      </Root>
    </ThemeProvider>
  )
}

export default App
