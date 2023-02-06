import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="container mx-auto px-4 flex flex-col gap-10">
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer />
    </main>
  );
}
