import CustomCursor from "../components/CustomCursor"; // Adjust the path if needed

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
