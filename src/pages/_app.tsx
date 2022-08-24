import "src/libs/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import { SearchProvider } from "src/state/search";
import { AuthProvider } from "src/AuthContext";


export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
    {/* <SWRConfig value={{ fetcher }}> */}
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily:
              "Greycliff CF, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
          }}
        >
          <AuthProvider>
            <SearchProvider>
                <Component {...pageProps} />
            </SearchProvider>
          </AuthProvider>
        </MantineProvider>
      {/* </SWRConfig> */}
    </>
  );
}

