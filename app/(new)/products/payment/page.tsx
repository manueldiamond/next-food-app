
import { PayNow } from '@/components';
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
    {name:itemTag+foodInfo.name, text:`${foodInfo.price} × ${amount}`,main:true},
    {name:'Order', amt:Orderprice},
    {name:'Tax',amt:tax},
    {name:'Delivery fees',amt:5.0},
  ] 
  let total=0
  orderSummary.forEach(item=>item.amt&&(total+=item.amt))
  total=parseFloat(total.toFixed(2))

  //TODO:get payment methods
  const paymentMethods=[]

  return (
    <div className='container min-h-screen flex flex-col pb-10'>
      <section>
        <h3 className='text-xl py-7 font-semibold text-gray-1'>Order summary</h3>
        <div className='px-4 flex flex-col gap-2'>
          {orderSummary.map(({name,amt,text,main})=>(
              <p className={`${main?"text-gray-3 font-bold":"text-gray-4"} text-lg flex justify-between`}>
              <span>{name}</span>
              <span>{amt?("GH₵"+amt):text}</span>
            </p> 
            ))}
          <hr className=' py-5 text-[#F0F0F0]'/>
          <p className='text-lg text-gray-1 font-semibold flex justify-between'>
            <span>Total</span>
            <span>GH₵ {total}</span>
          </p> 
          <p className='text-gray-1 font-semibold text-sm flex justify-between'>
            <span>Estimated delivery time:</span>
            <span>15 - 30 mins</span>
          </p>
        </div>
      </section>
     {paymentMethods.length>0&&<section className='mt-5'>
        <h3 className='text-xl py-7 font-semibold text-gray-1'>Payment methods</h3>
        
        {/* TODO: show a to add new onclick */}
        <button className='add__new  hollow-dark-button w-[6.25rem] h-[5rem]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        {/* Might be unecessary? */}
        <div className='flex gap-1 '>
          <input value={'checked'} type='checkbox'/>
          <label  className='text-gray-3'>Save details for future payments</label>
        </div>
      </section>}
      <div className='flex-1'/>
      <p className=' text-gray-4 text-sm text-center mx-auto'>Click PayNow to proceed to payment </p>
      <div className='flex-1'/>
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
