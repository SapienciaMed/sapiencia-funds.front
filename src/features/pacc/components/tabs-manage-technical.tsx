import React, { useContext, useState } from "react";
import TabListComponent from "../../../common/components/tab-list.component";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import { useParams } from "react-router-dom";
import SupportsPQRSDF from "./manageTechnical/supports-PQRSDF";
import { AppContext } from "../../../common/contexts/app.context";
import { ButtonComponent } from "../../../common/components/Form";
import Requirements from "./manageTechnical/requirements";

function TabsManageTechnical({ document }) {

    const { option } = useParams();
    const { validateActionAccess } = useContext(AppContext);
    
    const tabs = (): ITabsMenuTemplate[] => {
        const servicioSocial = {
            id: "servicioSocial", 
            title: "Servicio social", 
            content:( <></> ), 
            action: () => {},
            hide: validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') || false /*poner el rol */ 
        }
        const soportesPQRSDF = {
            id: "soportesPQRSDF", 
            title: "Soportes PQRSDF", 
            content: (<SupportsPQRSDF document={document}/>), 
            action: () => {},
            hide: validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') || validateActionAccess('VER_SOPORTES_PQRSDF') 
        }
        const requisitos = {
            id: "requisitos", 
            title: "Requisitos", 
            content: (<Requirements/>), 
            action: () => {},
            hide: validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') || validateActionAccess('VER_REQUISITOS_REGLAMENTO') 
        }
        const liquidacion = {
            id: "liquidacion", 
            title: "Liquidación", 
            content: (<></>), 
            action: () => {},
            hide: validateActionAccess('ADMIN_BANDEJA_CONSOLIDACION') || false /*poner el rol */ 
        }

        const result = [
            servicioSocial,
            soportesPQRSDF,
            requisitos,
            liquidacion
        ].filter(item => item?.hide);

        return result;
    }

    const start = tabs().find((tab) => tab.id.toString().toLowerCase() == option?.toLowerCase());

    return(
        <>
            <section className="mt-20px">
                <TabListComponent tabs={tabs()} start={start} titleMessage="Cambios sin guardar" description="¿Estas segur@ de salir sin guardar los cambios?" />
            </section>
        </>
    )
}

export default React.memo(TabsManageTechnical)