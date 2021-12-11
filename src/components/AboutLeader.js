import React from 'react'

function AboutLeader({name, imagePath, description}) {
    return (
        <div className=" flex flex-col gap-3 items-center">

            <div>
                <div className="avatar">
                    <div className="rounded-full w-32 h-32">
                        <img src={imagePath} />
                    </div> 
                </div>
                <h1 className="font-bold text-lg">{name}</h1>
            </div>
            
            <p className="max-w-xs lg:w-56">{description}</p>
        </div> 
    )
}

export default AboutLeader