import '../styles/globals.css'

BigInt.prototype.toJSON = function () {
  return Number(this);
};

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
