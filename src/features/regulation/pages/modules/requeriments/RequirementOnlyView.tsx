import { useRef } from "react";
import { IRequirementsForReglament } from "../../../../../common/interfaces/regulation";
import { ITableElement } from "../../../../../common/interfaces";
import TotalTableComponent from "../../../../../common/components/total-table.component";

interface IRequiremetOnlyView{
    detailData: IRequirementsForReglament[];
}
const RequirementOnlyView = ({ detailData }: IRequiremetOnlyView) => {
    const tableComponentRef = useRef(null);

    const tableColumns: ITableElement<any>[] = [
        {
            fieldName: "aproved",
            header: "Activo",
            renderCell: (row) => {
                return <>{row.active ? "SI" : "NO"}</>;
            }
        },
        {
            fieldName: "mandatoryFor",
            header: "Obligatorio para",
            renderCell: (row) => {
                return <>{row?.mandatoryFor || ''}</>;
            }
        },
        {
            fieldName: "description",
            header: "Descripcion",
            renderCell: (row) => {
                return <>{row?.description}</>;
            }
        }
    ]

    return (
        <TotalTableComponent
            ref={tableComponentRef}
            data={detailData}
            columns={tableColumns}
            isShowModal={true}
            secondaryTitle='Requisitos creados'
            isMobil={false}
            classSizeTable="size-table-wd-content"
        />
    )
}

export default RequirementOnlyView;