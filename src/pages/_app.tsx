import "src/libs/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import { SearchProvider } from "src/state/search";

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily:
            "Greycliff CF, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
        }}
      >
        <SearchProvider>
            <Component {...pageProps} />
        </SearchProvider>
      </MantineProvider>
    </>
  );
}

