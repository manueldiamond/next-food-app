import { auth } from "@/auth"
import { EditProduct } from "@/components"
import { isUserAdmin } from "@/libs/Hooks"
import { userType } from "@/libs/types"

const page = async({params}:{params:{id:string}})=>{
    const id=params.id
    const session=await auth() 
    if (session?.user){
        const user = session?.user as userType
        if(user?.role==='admin')
            return(
                <EditProduct id={id}/>
            )
    }
    throw new Error("Access Denied!")
}

export default page