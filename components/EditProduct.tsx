"use client"
import { Form, LoadingComponent } from '@/components';
import { useForm, useFormRef } from '@/components/Form';
import { formInput, FoodType } from '@/libs/types';
import React, { useMemo } from 'react'
import Image from 'next/image';
import { addFoodToDB, removeProduct, updateFoodInDB } from '@/actions/addAction';
import { useProductdData } from '@/libs/dataFetches';
import { useRouter } from 'next/navigation';
import { isUserAdmin, useAdminPage, useIsAdmin } from '@/libs/Hooks';
import { useSession } from 'next-auth/react';
import { useImageUpload } from '@/libs/ImageUpload';


type addProductsFormInput=Omit<formInput,'name'>&{
    name:keyof Omit<FoodType,'favourite'|'id'|'img'>,
}

const SCEHEMA: addProductsFormInput[] = [
    { name: 'name', required: true },
    { name: 'vendor', required: false }, // nullable field
    { name: 'description',type:"area",maxLength:2500 ,required: true },
    { name: 'preptime', label:"Prepration Time",required: false }, // nullable field
    { name: 'rating',type:'number', required: true },
    { name: 'price',type:'number', required: true },

];


const mapDataToInputs=(data:FoodType|null|undefined)=>{
    if (!data)
        return SCEHEMA
    return SCEHEMA.map((input)=>({
        ...input,
        defaultValue: data[input.name as keyof FoodType]
    }));
}

const EditProduct = ({id}:{id:string}) => {
    const router = useRouter()
 
    const editing=id!=="new"
    let inputsArray=SCEHEMA

    const {data,mutate,isLoading,error} = useProductdData(editing?id:undefined)
   
    let defaultImageURL = "/some-ham.png"
    inputsArray=useMemo(()=>mapDataToInputs(data),
        [
            data.name, data.description,data.img,
            data.preptime,data.price,data.vendor,data.rating
        ])

    if(!isLoading&&data&&data.img)  defaultImageURL = data.img
    
    console.log(data)
    console.log(inputsArray)
    
    const {FileInputHelper,changePhoto,getPublicUrl,loading,selectedPhoto:{url:productImageUrl}} = useImageUpload()()
    
    const {controls:formControls,setErrorMsg,setGoodMsg,setErrored} = useForm()

    async function deleteProduct() {
        const result = await (removeProduct(data.id))
        const {error}=result

        if(error)
             setErrorMsg(error)
        else
        {
            alert("DELETED")
            router.replace("/products/edit/new")
        }
    }

    async function addProduct (formData:FormData){
        const data:Partial<FoodType>={}

        data.name = formData.get('name') as string;
        data.description = formData.get('description') as string;
        data.preptime = formData.get('preptime') as string | null;
        data.favourite = (formData.get('favourite') === 'true')? ( true ) : (formData.get('favourite') === 'false') ? false : undefined;
        data.rating = parseFloat(formData.get('rating') as string);
        data.vendor = formData.get('vendor') as string | null;
        data.published = formData.get('published') === 'true';
        data.price = parseFloat(formData.get('price') as string);
        

        if(productImageUrl){
            const result = await getPublicUrl()
            console.log(result)
            if(!result?.url){
                 setErrorMsg("Image upload failed")
                return;
            }
            data.img=(result.url)
        }else{
            data.img=defaultImageURL

        }
           
        const res=await (editing?updateFoodInDB(id,data):addFoodToDB(data))

        if (res?.error){
             setErrorMsg(res.error)
            if(res.errorPaths)
             setErrored(res.errorPaths)
            return
        }
        if(editing) mutate({data})
         setGoodMsg("Product "+ data.name +editing?"Sucesssfully Updated":" Successfully Added.")
        return true
    }
  return (
    <div className='centered flex-col'>
       <LoadingComponent loading={isLoading} error={error} >
       { data&&<>
            <button onClick={changePhoto} className='!hover:border-[3px] !border-[1px] !border-black/5 centered !overflow-visible  hollow-accent-button max-w-[380px] max-sm:w-full aspect-square flex '>
                <Image 
                    className=' product-shadow shadow-black/60 mx-auto flex object-contain w-full ' 
                    src={productImageUrl?productImageUrl:defaultImageURL} 
                    width={350} 
                    height={350} 
                    alt={"product image"}
                    />
                <FileInputHelper/>
            </button>
            {/* <button title='Only click this if the upload is not working well' onClick={getPublicUrl}>Force UPLOAD</button> */}
            <Form
                 inputsArray = {inputsArray}
                 submitAction = {addProduct}
                 submitText={editing?"Update Product":"Add Product"}
                 heading={editing?"Edit Product Details":"Add New Food"}
                {...formControls}
            />
            {editing&&<button onClick={deleteProduct} className='!mb-16 my-8 !w-max mx-auto !text-red-700 hollow-dark-button'>DELETE PRODUCT</button>}
        </>}
        </LoadingComponent>
    </div>
  )
}


export default EditProduct