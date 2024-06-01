import { auth } from "@/auth";
import { Catalogue, Footer, Header } from "../components";


export default async function Home() {
  const session=await auth()
  return (
    <main className="">
      <Header/>
      <p className=" container text-sm sm:text-base md:text-lg text-gray-2">Order your favourite food around Central campus!</p>
      <Catalogue user={session?.user}/>
      {session&&<Footer/>}
    </main>
  );
}
