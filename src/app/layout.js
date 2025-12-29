import Head from 'next/head';
import "../../public/assets/css/plugins/fontawesome.css";
import "../../public/assets/css/plugins/magnifying-popup.css";
import "../../public/assets/css/plugins/swiper.css";
import "../../public/assets/css/plugins/metismenu.css";
import "../../public/assets/css/vendor/bootstrap.min.css";
import 'react-modal-video/css/modal-video.min.css';

// Import your custom styles LAST to override plugin styles
import "../../public/assets/css/style.css";

import Script from 'next/script';



export const metadata = {
  title: "Edunextg - IT solutions for a growing businesses",
  description: "IT solutions for a growing businesses",
  icons: {
    icon: "/assets/images/logo/onlylogo.png", // Ensure the path is correct
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Luminos - IT solutions for a growing businesses</title>
        <meta name="author" content="reactheme" />
        <meta name="description" content="Luminos - IT solutions for a growing businesses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/logo/onlylogo.png" />
      </Head>
      <body className='index-one'>

        {children}



        <Script
          src="/assets/js/plugins/smooth-scroll.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
