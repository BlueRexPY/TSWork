import React from 'react'
import type { AppProps } from 'next/app'
require("../styles/variables.less");
import "antd/dist/antd.css";
import '../styles/globals.css'
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  const store = React.useMemo(()=> setupStore(), []);
  
  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
