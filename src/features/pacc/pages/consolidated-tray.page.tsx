import React, { useContext } from "react";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import { useParams } from "react-router-dom";
import TabListComponent from "../../../common/components/tab-list.component";
import TechnicianStepCashingPages from "./technician-step-cashing.pages";
import { AppContext } from "../../../common/contexts/app.context";

function ConsolidatedTrayPage() {
    
    const { option } = useParams();
    const { validateActionAccess } = useContext(AppContext);

    const tabs = (): ITabsMenuTemplate[] => {
        const tecnicoPasoCobro = {
            id: "tecnicoPasoCobro", 
            title: "Técnico paso al cobro", 
            content: (<TechnicianStepCashingPages/>), 
            action: () => {},
            hide: validateActionAccess('TECNICO_PASO_COBRO') || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const servicioSocial = {
            id: "servicioSocial", 
            title: "Servicio social", 
            content:( <></> ), 
            action: () => {},
           hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const certificacionValores = {
            id: "certificacionValores", 
            title: "Certificación de valores", 
            content: (<></>), 
            action: () => {},
            hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const tecnicoProfesional = {
            id: "tecnicoProfesional", 
            title: "Técnico profesional", 
            content: (<></>), 
            action: () => {},
           hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const coordinador = {
            id: "coordinador", 
            title: "Coordinador", 
            content: (<></>), 
            action: () => {},
           hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const juridica = {
            id: "juridica", 
            title: "Jurídica", 
            content: (<></>), 
            action: () => {},
           hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
        const liderProyecto = {
            id: "liderProyecto", 
            title: "Lider de proyecto", 
            content: (<></>), 
            action: () => {},
           hide: false /*poner el rol */ || validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') 
        }
       const result = [
            servicioSocial,
            tecnicoPasoCobro,
            certificacionValores,
            tecnicoProfesional,
            coordinador,
            juridica,
            liderProyecto
        ].filter(item => item?.hide);

        return result;
    }

    const start = tabs().find((tab) => tab.id.toString().toLowerCase() == option?.toLowerCase());

    return(
        <div className="main-page">
            <div className="card-table gap-0 mt-14px">
                <section className="title-area-2">
                    <div className="text-black extra-large">Bandeja de consolidación de créditos</div>
                </section>

                <section className="mt-20px">
                    <TabListComponent tabs={tabs()} start={start}/>
                </section>

            </div>

        </div>
    
    )
}

export default React.memo(ConsolidatedTrayPage)
