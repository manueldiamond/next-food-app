
import { PayNow, PaymentMethods } from '@/components';
import { redirect } from 'next/navigation'

import { auth } from '@/auth';
import { getFoodPriceFromDB } from '@/utils/db';


const page = async ({searchParams:{item,amount=1,name:itemTag=""}}:{searchParams:{item:string,name:string,amount:number}}) => {
  
  const session=await auth()
  if (!session?.user)
    return redirect("/login")

  // TO DO GET PRODUCT INFO
  const foodInfo = await getFoodPrice(item)
  if (!foodInfo){
    throw new Error("Order details could not be resolved")
  }
  if (itemTag)  itemTag=`${itemTag[0].toUpperCase()}${itemTag.slice(1).toLowerCase()} `
  const Orderprice  = foodInfo.price*amount
  const tax = Math.round(((Orderprice*.01)) * 100) / 100 //we're just gonna assume MOMO charges is 1%... Compute real value later
  const orderSummary = [
    {name:itemTag+foodInfo.name, text:`GH₵${foodInfo.price} × ${amount}`,main:true},
    {name:'Order', amt:Orderprice},
    {name:'Tax',amt:tax},
    {name:'Delivery fees',amt:5.0},
  ] 
  let total=0
  orderSummary.forEach(item=>item.amt&&(total+=item.amt))
  total=parseFloat(total.toFixed(2))
  
  return (
    <div className='container min-h-screen flex flex-col pb-10'>
      <section>
        <h3 className='text-xl py-7 font-semibold text-gray-1'>Order summary</h3>
        <div className='px-4 flex flex-col gap-2'>
          {orderSummary.map(({name,amt,text,main})=>(
              <p className={`${main?"text-gray-3 font-bold":"text-gray-4"}  text-xs sm:text-base md:text-lg flex justify-between`}>
              <span>{name}</span>
              <span>{amt?("GH₵"+amt):text}</span>
            </p> 
            ))}
          <hr className=' py-5 text-[#F0F0F0]'/>
          <p className='  text-base md:text-lg  text-gray-1  font-semibold flex justify-between'>
            <span>Total</span>
            <span>GH₵ {total}</span>
          </p> 
          <p className='text-gray-1 font-semibold text-xs md:text-sm flex justify-between'>
            <span>Estimated delivery time:</span>
            <span>15 - 30 mins</span>
          </p>
        </div>
      </section>
      <PaymentMethods/>
      <div className='flex-1'/>
      <div className='flex-1 centered'>
      </div>
      <hr className='w-full text-gray-4 my-4'/>
      <PayNow user={session.user} amount={total}/>
    </div>
  )
}


export default page


async function getFoodPrice(id:string){
  try{
    return await getFoodPriceFromDB(id)
  }catch (e){
    console.log(e)
    return null;
  }
}
