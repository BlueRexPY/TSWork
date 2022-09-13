import type { AppProps } from "next/app";
require("../styles/variables.less");
import "antd/dist/antd.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";

const store = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
