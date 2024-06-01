"use client"

import { changePassword } from "@/actions/profileActions";
import { LoadingComponent } from "@/components";
import Avatar from "@/components/Avatar";
import Form, { useForm } from "@/components/Form"
import MessageModal from "@/components/MessageModal";
import { useModal } from "@/libs/Hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formFields = [
    {
      name: 'currentPassword',
      label: 'Current Password',
      type: 'password',
      placeholder: 'Enter your current password',
      required: true,
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter your new password',
      required: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
      type: 'password',
      placeholder: 'Confirm your new password',
      required: true,
    },
  ];
  
export default function Page(){
    const {controls,setErrorMsg,setErrored,setGoodMsg,} = useForm()
    const {visible,close,open:openSuccess}= useModal()
    const router=useRouter()
    const {data:session,status}= useSession()
    const changePass=async (data:FormData)=>{
        if(!session?.user?.id)  return setErrorMsg("Something went wrong... Please Try again.")
        const result = await changePassword(session.user.id,data)
        if(result.error){
            if(result.errInputs)
                setErrored(result.errInputs)
            setErrorMsg(result.error)
            return
        }
        if(result.message)
            setGoodMsg(result.message)
        openSuccess()
    }
    return(
        <div>
             <Avatar 
                size={151}
                className={` !border-none left-1/2 -translate-x-1/2 absolute my-0 top-0 mx-auto !bg-accent-gradient -translate-y-1/2 profile !rounded-full !w-[30%] !min-w-[151px] aspect-square !p-0`} 
                user={session?.user}
             />
            <LoadingComponent loading={status==="loading"}>
                <p className="mt-[85px] text-gray-3 text-center text-xs sm:text-sm lg:text-base">Editing password for  {session?.user?.email}</p>
                <MessageModal
                    iconStyle="!bg-green-500"
                    headingStyle="!text-green-500"
                    buttonStyle="!border-green-500 hollow-accent-button  !bg-transparent !text-green-500"
                    bodyText="Password was changed sucessfully" 
                    visible={visible}
                    onButtonClicked={router.back}
                />
                <Form
                    gap={0}
                    className="!my-1"
                    submitAction={changePass}
                    heading={"Change Password"}
                    inputsArray={formFields}
                    submitText="Update"
                    {...controls}
                />
            </LoadingComponent>
        </div>
    )
}