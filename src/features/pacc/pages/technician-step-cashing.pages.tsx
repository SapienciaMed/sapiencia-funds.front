import React from "react";
import { SelectComponentUser } from "../../../common/components/Form/select.component.user";
import { EDirection } from "../../../common/constants/input.enum";

function TechnicianStepCashing() {
    
    return(
        <div className="card-table gap-0 mt-14px">
             <div className='grid-form-3-container'>
                <SelectComponentUser
                    idInput={"numberProject"}
                    data={[]}
                    label="Corte"
                    className="select-basic medium select-disabled-list"
                    classNameLabel={`text-black big text-with-colons`}
                    placeholder="Seleccionar."
                    direction={EDirection.column}
                />

             </div>

        </div>
    )
}

export default React.memo(TechnicianStepCashing)