import { MantineProvider } from '@mantine/core'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
         fontFamily: "Greycliff CF, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
         colors: {
          'mantine': "linear-gradient(52deg, rgb(51, 154, 240) 3%, rgb(59, 201, 219) 97%)",
        },
      }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  ) 
}

export default MyApp
