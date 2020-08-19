import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GoogleFonts from 'next-google-fonts';
import { DefaultSeo } from 'next-seo';

import theme from '../lib/theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      {/* <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@300,400;500;700&display=swap" /> */}
      <DefaultSeo
        title="Denny Incorporation"
        titleTemplate={'%s | Denny Incorporation'}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://denny-incorporation.vercel.app/',
          site_name: 'Denny Incorporation',
        }}
      />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
