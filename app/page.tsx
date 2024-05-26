import { auth } from "@/auth";
import { Catalogue, Footer, Header } from "../components";


export default async function Home() {
  const session=await auth()
  return (
    <main className="">
      <Header/>
        <p className=" container text-lg text-gray-2">Order your favourite food!</p>
        <Catalogue userid={session?.user?.id}/>
      <Footer/>
    </main>
  );
}
