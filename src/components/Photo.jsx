import React from "react";

export default function PhotoB(props) {
    let {name,id,photo} = props
    return (
        <>
            <div key={id} className="card flex f-column g-1">
                <img className="img-fit" src={photo} alt={name} />
                <p className=" carousel-text text-center"> {name}</p>
            </div>
        </>
    );
}