import Image from "next/image";
import Splash from "../components/splash";
import { Catalogue, Footer, Header } from "../components";

const underHeaderText="Order your favourite food!"

export default function Home() {

  return (
    <main className="">
      <Header/>
        <p className=" container text-lg text-gray-2">{underHeaderText}</p>
        <Catalogue/>
      <Footer/>
    </main>
  );
}
