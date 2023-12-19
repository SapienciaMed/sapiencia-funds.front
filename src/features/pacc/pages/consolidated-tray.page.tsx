import React, { useContext } from "react";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import { useParams } from "react-router-dom";
import TabListComponent from "../../../common/components/tab-list.component";
import { AppContext } from "../../../common/contexts/app.context";
import { EStatePac } from "../../../common/constants/api.enum";
import BeneficiaryTrayPage from "./beneficiary-tray.pages";

function ConsolidatedTrayPage() {
    
    const { option } = useParams();
    const { validateActionAccess } = useContext(AppContext);

    const tabs = (): ITabsMenuTemplate[] => {
        const tecnicoPasoCobro = {
            id: "tecnicoPasoCobro", 
            title: "Técnico paso al cobro", 
            content: (<BeneficiaryTrayPage typeState={EStatePac.TecnhicianStepCashing}/>), 
            action: () => {},
            hide: validateActionAccess('TECNICO_PASO_COBRO') 
        }
        const servicioSocial = { 
            id: "servicioSocial", 
            title: "Servicio social", 
            content:( <BeneficiaryTrayPage typeState={EStatePac.SocialService} isCut={false}/> ), 
            action: () => {},
            hide: validateActionAccess('SERVICIO_SOCIAL') 
        }
        const certificacionValores = {
            id: "certificacionValores", 
            title: "Certificación de valores", 
            content: (<></>), 
            action: () => {},
            hide: false /*poner el rol */ 
        }
        const tecnicoProfesional = {
            id: "tecnicoProfesional", 
            title: "Técnico profesional", 
            content: (<BeneficiaryTrayPage typeState={EStatePac.ProfessionalTechnician}/>), 
            action: () => {},
            hide: validateActionAccess('TECNICO_PROFESIONAL') 
        }
        const coordinador = {
            id: "coordinador", 
            title: "Coordinador", 
            content: (<BeneficiaryTrayPage typeState={EStatePac.Coordinator}/>), 
            action: () => {},
            hide: validateActionAccess('COORDINADOR') 
        }
        const juridica = {
            id: "juridica", 
            title: "Jurídica", 
            content: (<BeneficiaryTrayPage typeState={EStatePac.Juridical}/>), 
            action: () => {},
            hide: validateActionAccess('JURIDICA') 
        }
        const liderProyecto = {
            id: "liderProyecto", 
            title: "Lider de proyecto", 
            content: (<BeneficiaryTrayPage typeState={EStatePac.ProjectManager}/>),
            action: () => {},
            hide: validateActionAccess('LIDER_PROYECTO') 
        }
       const result = [
            servicioSocial,
            certificacionValores,
            tecnicoPasoCobro,
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
