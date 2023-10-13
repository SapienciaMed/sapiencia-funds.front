import React, { Fragment } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const ActaPage = () =>{
    const navigate = useNavigate();

    return(
       <Fragment>
            <div className="title-area">
                <p className="text-black huge ml-24px mt-20px mg-0">Acta</p>
                <div className="title-button-users text-three biggest" onClick={() => { navigate('../crear') }}>
                                        Crear acta <BiPlusCircle />
                                    </div>
                                    
            </div>
       </Fragment>
    )
}

export default React.memo(ActaPage);