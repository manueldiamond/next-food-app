import { FoodType } from '@/libs/types';
import Image from 'next/image';
import Link from 'next/link'
import FavouriteButton from './FavouriteButton';



type favouriteItemProps={
    food:FoodType
    key:any,
    userid:string
}

const FavouritesItem=(
    {food,key,userid}:favouriteItemProps
)=>{
    return( 
    <div  key={key} className=' rounded-[20px] centered w-full min-w-[225px] min-h-[185px] transition scale-up-animation group hover:shadow-xl hover:z-10 z-0 mt-2 p-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,.1)]'>
        <Link href={`/products/${food.id}`} className='flex centered flex-1'>
            <div className=' text-gray-1'  >
                <Image
                    className='flex-1 h-full w-max object-contain group-hover:scale-105 catalogue-display-item-shadow mb-4 mx-auto' 
                    src={food.img}
                    width={120}
                    height={120}
                    alt={`picture  of ${food.vendor} ${food.name}`} 
                    />
            
            
            </div>
            <div className=' flex-1'>
                <h4 className='py-0 font-semibold text-xl'>{food.name}</h4>
                <p className='ml-2 text-gray-3'>From {food.vendor}</p>
            </div>
        </Link>

        <div className='rating_and_favourite bottom flex-col flex h-full justify-between items-center '>
            <div className='rating flex gap-1 items-center'> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9782 15.5435L8.00016 11.8848L3.02216 15.5435L4.93349 9.63479L-0.0418396 5.99945H6.10083L8.00016 0.0807877L9.89949 5.99945H16.0415L11.0668 9.63479L12.9782 15.5435Z" fill="#FF9633"/>
                </svg>

                <span>{food.rating}</span>
            </div>
            <FavouriteButton 
                className={"h-[2rem] aspect-square"}
                userid={userid}
                foodid={food.id}
                defaultValue={food.favourite} 
            />
        </div>
    </div>
    )
}



export default FavouritesItem