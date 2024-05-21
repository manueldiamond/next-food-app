import Image from "next/image";
import Splash from "./componenets/splash";
import { Catalogue, Footer, Header } from "./componenets";

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
