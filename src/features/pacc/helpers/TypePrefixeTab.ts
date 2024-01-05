import { EStatePac } from "../../../common/constants/api.enum";

export const typePrefixeTabs = (tipo: number) => {

    const typePrefix: Map<number, string> = new Map([
        [EStatePac.TecnhicianStepCashing, 'consolidation-tray-collection-technician'],
        [EStatePac.ProfessionalTechnician, 'consolidation-tray-professional-technician'],
        [EStatePac.Coordinator, 'consolidation-tray-coordinator'],
        [EStatePac.Juridical, 'consolidation-tray-legal'],
        [EStatePac.ProjectManager, 'consolidation-tray-project-leader'],
        [EStatePac.SocialService, 'consolidation-tray-social-service'],
        [EStatePac.Committee, 'consolidation-tray-committee'],
        [EStatePac.AdministrativeAct, 'consolidation-tray-administrative-act'], //TODO: VALIDAR SI ES ESTO
    ]);

    return valorHas(typePrefix, tipo);
}

const valorHas = (valorMap: Map<number, string>, valor: number) => {
    let type: string = '';

    if (valorMap.has(valor)) {
        valorMap.forEach((value: string, key: number) => {
            if (key === valor) {
                type = value
            }
        });
    } else {
        type = ''
    }

    return type;

}