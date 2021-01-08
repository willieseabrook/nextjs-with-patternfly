import '@patternfly/react-core/dist/styles/base.css'

const WithPatternflyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default WithPatternflyApp
