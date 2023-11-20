import React from "react";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import { useParams } from "react-router-dom";
import TabListComponent from "../../../common/components/tab-list.component";
import TechnicianStepCashingPages from "./technician-step-cashing.pages";

function ConsolidatedTrayPage() {
    
    const { option } = useParams();

    const tabs: ITabsMenuTemplate[] = [
        { 
            id: "servicioSocial", 
            title: "Servicio social", 
            content:( <></> ), 
            action: () => {},
        },
        { 
            id: "certificacionValores", 
            title: "Certificación de valores", 
            content: (<></>), 
            action: () => {} 
        },
        { 
            id: "tecnicoPasoCobro", 
            title: "Técnico paso al cobro", 
            content: (<TechnicianStepCashingPages/>), 
            action: () => {} 
        },
        { 
            id: "tecnicoProfesional", 
            title: "Técnico profesional", 
            content: (<></>), 
            action: () => {} 
        },
        { 
            id: "coordinador", 
            title: "Coordinador", 
            content: (<></>), 
            action: () => {} 
        },
        { 
            id: "juridica", 
            title: "Jurídica", 
            content: (<></>), 
            action: () => {} 
        },
        { 
            id: "liderProyecto", 
            title: "Lider de proyecto", 
            content: (<></>), 
            action: () => {} 
        },

    ];

    const start = tabs.find((tab) => tab.id.toString().toLowerCase() === option?.toLowerCase());

    return(
        <div className="main-page">
            <div className="card-table gap-0 mt-14px">
                <section className="title-area-2">
                    <div className="text-black extra-large">Bandeja de consolidación de créditos</div>
                </section>

                <section className="mt-20px">
                    <TabListComponent tabs={tabs} start={start}/>
                </section>

            </div>

        </div>
    
    )
}

export default React.memo(ConsolidatedTrayPage)
