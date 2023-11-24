import React, { useContext } from "react";
import TabListComponent from "../../../common/components/tab-list.component";
import { ITabsMenuTemplate } from "../../../common/interfaces/tabs-menu.interface";
import { useParams } from "react-router-dom";
import SupportsPQRSDF from "./manageTechnical/supports-PQRSDF";
import { AppContext } from "../../../common/contexts/app.context";

function TabsManageTechnical() {

    const { option } = useParams();
    const { validateActionAccess } = useContext(AppContext);

    const tabs = (): ITabsMenuTemplate[] => {
        const servicioSocial = {
            id: "servicioSocial", 
            title: "Servicio social", 
            content:( <></> ), 
            action: () => {},
            hide: validateActionAccess('BANDEJA_CONSOLIDACION_TODOS') || false /*poner el rol */ 
        }
        const soportesPQRSDF = {
            id: "soportesPQRSDF", 
            title: "Soportes PQRSDF", 
            content: (<SupportsPQRSDF/>), 
            action: () => {},
            hide: validateActionAccess('BANDEJA_CONSOLIDACION_TODOS') || true /*validateActionAccess('SOPORTE_PQRSDF')*/  
        }
        const requisitos = {
            id: "requisitos", 
            title: "Requisitos", 
            content: (<></>), 
            action: () => {},
            hide: validateActionAccess('BANDEJA_CONSOLIDACION_TODOS') || false /*poner el rol */ 
        }
        const liquidacion = {
            id: "liquidacion", 
            title: "Liquidación", 
            content: (<></>), 
            action: () => {},
            hide: validateActionAccess('BANDEJA_CONSOLIDACION_TODOS') || false /*poner el rol */ 
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
        <section className="mt-20px">
            <TabListComponent tabs={tabs()} start={start}/>
        </section>
    )
}

export default React.memo(TabsManageTechnical)