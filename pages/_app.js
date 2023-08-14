import '../styles/globals.css'
import Layout from '../components/layout/Layout'
function MyApp({ Component, pageProps }) {
  //putting <Layout> here means that you will get all the pages styled 
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
