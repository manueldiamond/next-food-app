"use client"
import { Form, LoadingComponent } from '@/components';
import { useFormRef } from '@/components/Form';
import { formInput, FoodType } from '@/libs/types';
import React, { useMemo } from 'react'
import { useImageUpload } from '../../../../../libs/ImageUpload';
import Image from 'next/image';
import { ZodError, number } from 'zod';
import { foodSchema, parseZodError } from '@/libs/zod';
import { addFoodToDB, removeProduct } from '@/actions/addAction';
import { useProductdData } from '@/libs/dataFetches';
import { useRouter } from 'next/navigation';


type addProductsFormInput=Omit<formInput,'name'>&{
    name:keyof Omit<FoodType,'favourite'|'id'|'img'>,
}
``
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

const page = ({params}:{params:{id?:string}}) => {
    const id = params.id
    const editing=id!=="new"
    let inputsArray=SCEHEMA
    const {data,mutate,isLoading,error} = useProductdData(editing?id:undefined)
    
    let defaultImageURL = "/some-ham.png"
    
    inputsArray=useMemo(()=>mapDataToInputs(data),[
        ...(
        (data)?
        [data.name,data.description,data.img,data.preptime,data.price,data.vendor,data.rating]:
        [0,0,0,0,0,0,0])])

    if(!isLoading&&data&&data.img)  defaultImageURL = data.img
    
    console.log(data)
    console.log(inputsArray)
    
    const {FileInputHelper,changePhoto,getPublicUrl,loading,selectedPhoto:{url:productImageUrl}} = useImageUpload()()
    
    const {ref:formRef,refForm:Form} = useFormRef({
        inputsArray,
        submitAction:addProduct,
        submitText:editing?"Add Product":"Update Product",
        heading:editing?"Edit Product Details":"Add New Food",
    },[addProduct])

    const router = useRouter()
    async function deleteProduct() {
        const result = await removeProduct(data.id)
        const {error}=result

        if(error)
            formRef.current?.setErrorMsg(error)
        else
           {    alert("DELETED")
                 router.replace("/products/edit/new")
            }
    }

    async function addProduct (formData:FormData){
        const data:Partial<FoodType>={}

        data.name = formData.get('name') as string;
        data.description = formData.get('description') as string;
        data.preptime = formData.get('preptime') as string | null;
        data.favourite = (formData.get('favourite') === 'true') ? true : (formData.get('favourite') === 'false') ? false : undefined;
        data.rating = parseFloat(formData.get('rating') as string);
        data.vendor = formData.get('vendor') as string | null;
        data.published = formData.get('published') === 'true';
        data.price = parseFloat(formData.get('price') as string);
        

        if(productImageUrl){
            const result = await getPublicUrl()
            console.log(result)
            if(!result?.url){
                formRef.current?.setErrorMsg("Image upload failed")
                return;
            }
            data.img=(result.url)
        }else{
            data.img=defaultImageURL

        }
           
        const res=await addFoodToDB(data)
        if (res?.error){
            formRef.current?.setErrorMsg(res.error)
            if(res.errorPaths)
            formRef.current?.setErrored(res.errorPaths)
            return
        }
        formRef.current?.setGoodMsg(data.name +" Successfully Added.")
        return true
    }
  return (
    <div className='centered flex-col'>
       <LoadingComponent loading={isLoading} error={error} >
       { data&&<>
            <button onClick={changePhoto} className='!hover:border-[3px] !border-[1px] !border-black/5 centered !overflow-visible  hollow-accent-button max-w-[380px] max-sm:w-full aspect-square flex '>
                <Image 
                    className=' product-shadow shadow-black/60 mx-auto flex object-fill w-full ' 
                    src={productImageUrl?productImageUrl:defaultImageURL} 
                    width={350} 
                    height={350} 
                    alt={"product image"}
                    />
                <FileInputHelper/>
            </button>
            {/* <button title='Only click this if the upload is not working well' onClick={getPublicUrl}>Force UPLOAD</button> */}
            <Form>
            </Form>
            {editing&&<button onClick={deleteProduct} className='!mb-16 my-8 !w-max mx-auto !text-red-700 hollow-dark-button'>DELETE PRODUCT</button>}
        </>}
        </LoadingComponent>
    </div>
  )
}

export default page