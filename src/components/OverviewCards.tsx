import React from 'react'
import {EllipsisVertical} from "lucide-react";

interface OverviewCardsProps{
    title: string;
    amount: number | null;
}
const OverviewCards = ({title, amount}: OverviewCardsProps) =>{
    return (
        <div className="rounded-[10px] border border-gray-300 shadow-sm">
            <div className='px-4 py-5 space-y-2'>
                <div className='flex justify-between'>
                    <h2 className="font-normal text-sm text-gray-600 pt-5 md:pt-0" style={{ textTransform: 'uppercase'}}>{title}</h2>
                    <EllipsisVertical color="grey" size={16} />
                </div>
                <p className="font-bold text-2xl text-gray-900">{amount}</p>
            </div>
        </div>
    )
}


export default OverviewCards;