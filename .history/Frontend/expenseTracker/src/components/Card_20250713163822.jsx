import React from 'react'

function Card({ label, icon: Icon, value, color }) {

    const bgColors = {
        purple: "bg-purple-500",
        green: "bg-green-500",
        red: "bg-red-500",
        blue: "bg-blue-500",
        yellow: "bg-yellow-500",
    };
    const bgClass = bgColors[color] || "bg-gray-500";


    return (
        <div className=" w-sm:w-[24vw]">
            <div className="w-full max-w-[320px] h-[100px] rounded-2xl shadow-lg text-white px-5 py-4 flex items-center justify-between gap-5 bg-white    }">

                <div className={`h-14 w-14 flex justify-center items-center rounded-full  ${bgClass}`} >
                    {Icon && <Icon className="text-3xl text-white" />}
                </div>

                <div className="flex flex-col justify-center items-end">
                    <h3 className="font-medium text-base text-black">{label}</h3>
                    <h2 className="font-bold text-2xl mt-1 text-black">${value}</h2>
                </div>
            </div>
        </div >

    );
}

export default Card;
