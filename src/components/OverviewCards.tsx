import React from 'react'
import {EllipsisVertical} from "lucide-react";
interface OverviewCardsProps {
    cardKey: string,
    title: string,
    amount: number | null,
}

const OverviewCards = ({cardKey, title, amount}: OverviewCardsProps) => {
    const isCredits = title.toLowerCase().includes("credit");

    return (
        <div data-card-key={cardKey}
             className={`overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                 isCredits ? "border-emerald-100 bg-emerald-50/60" : "border-sky-100 bg-sky-50/60"
             }`}>
            <div className='space-y-4 px-5 py-5 md:px-6'>
                <div className='flex items-start justify-between'>
                    <h2 className="text-xs font-semibold tracking-[0.18em] text-gray-600"
                        style={{textTransform: 'uppercase'}}>{title}</h2>
                    <EllipsisVertical color="#6b7280" size={16}/>
                </div>
                <div className="flex items-end justify-between gap-3">
                    <p className="text-3xl font-bold leading-none text-gray-900">{amount}</p>
                    <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                        isCredits ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
                    }`}>
                        Live
                    </span>
                </div>
            </div>
        </div>
    )
}


export default OverviewCards;
