import { useRef } from "react";
import { ICondonationPercent, IRegulation, IRequirementsForReglament, ITableMicroStructure } from "../../../../common/interfaces/regulation";
import { ITableElement } from "../../../../common/interfaces";
import TotalTableComponent from "../../../../common/components/total-table.component";
import { ERegulation } from "../../../../common/constants/api.enum";

interface IRequiremetOnlyView{
    detailData: IRegulation;
    typeTable: {
        requirement?: ERegulation.requirement,
        socialService?: ERegulation.socialService,
        knowledgeTransfer?: ERegulation.knowledgeTransfer,
        cumulativeAcademicPeriod?: ERegulation.cumulativeAcademicPeriod,
        cumulativeAcademicPerformance?: ERegulation.cumulativeAcademicPerformance
    }
    viewPaginator: boolean
}
const TableRegulationView = ({ detailData, typeTable, viewPaginator }: IRequiremetOnlyView) => {
    const tableComponentRef = useRef(null);

    const tableColumnsRequirement: ITableElement<IRequirementsForReglament>[] = [
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

    const tableSocialService: ITableElement<ICondonationPercent>[] = [
        {
            fieldName: "aproved",
            header: "% horas mínimas",
            renderCell: (row) => {
                return <>{row.minimumHourPercent || '0'} %</>;
            }
        },
        {
            fieldName: "maximumHourPercent",
            header: "% horas máximas",
            renderCell: (row) => {
                return <>{row?.maximumHourPercent || '0'} %</>;
            }
        },
        {
            fieldName: "condonationPercent",
            header: "% Condonado",
            renderCell: (row) => {
                return <>{row?.condonationPercent || '0'} %</>;
            }
        }
    ]

    const tableAcademicPerformance: ITableElement<ITableMicroStructure>[] = [
        {
            fieldName: "initialAverage",
            header: "Promedio Inicial",
            renderCell: (row) => {
                return <>{row.initialAverage || '0'} %</>;
            }
        },
        {
            fieldName: "endAverage",
            header: "Promedio Final",
            renderCell: (row) => {
                return <>{row?.endAverage || '0'} %</>;
            }
        },
        {
            fieldName: "percent",
            header: "Porcentaje",
            renderCell: (row) => {
                return <>{row?.percent || '0'} %</>;
            }
        }
    ]

    const tableSelect = () => {
       if (typeTable.requirement) {
            return {
                colum: tableColumnsRequirement,
                data: detailData.requirementsForReglament
            };
       }

       if (typeTable.socialService) {
            return {
                colum: tableSocialService,
                data: detailData.socialServiceCondonationPercent
            };
       }

        if (typeTable.knowledgeTransfer) {
            return {
                colum: tableSocialService,
                data: detailData.knowledgeTransferCondonationPercent
            };
        }

        if (typeTable.cumulativeAcademicPeriod) {
            return {
                colum: tableAcademicPerformance,
                data: detailData.performancePeriodStructure.dataTable
            };
        }

        if (typeTable.cumulativeAcademicPerformance) {
            return {
                colum: tableAcademicPerformance,
                data: detailData.accumulatedPerformanceDataTable.dataTable
            };
        }


        return {
            colum: [],
            data: []
        }
    }

    return (
        <TotalTableComponent
            ref={tableComponentRef}
            data={tableSelect().data}
            columns={tableSelect().colum}
            isShowModal={true}
            secondaryTitle='Requisitos creados'
            isMobil={false}
            classSizeTable="size-table-wd-content"
            viewPaginator={viewPaginator}
        />
    )
}

export default TableRegulationView;