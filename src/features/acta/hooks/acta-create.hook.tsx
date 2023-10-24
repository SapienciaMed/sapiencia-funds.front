import { useForm } from "react-hook-form";
import { IActa } from "../../../common/interfaces/acta.interface";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createActas } from "../../../common/schemas/acta-shema";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import ItemsCreatePage from "../pages/items-create.page";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import useActaApi from "./acta-api.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList, ISalaryMin } from "../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { IUser } from "../../../common/interfaces/auth.interfaces";
import { ICitation } from '../../../common/interfaces/citationInterface';

export default function useActaCreate() {
    const resolver = useYupValidationResolver(createActas);

    const { setMessage, authorization, setDataGridItems, dataGridItems, setDataGridUsers, dataGridUsers } = useContext(AppContext);
    const tableComponentRef = useRef(null);

    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<IActaItems[]>([]);
    const [datosActa, setDatosActa] = useState<IActa>();
    const [status, setStatus] = useState([]);
    const [salary, setSalary] = useState([]);
    const [projectList, setProjectsList] = useState([]);
    const [projectMeta, setProjectMeta] = useState("");
    const [actaItems, setActaItems] = useState(Array<IActaItems>);
    const [userList, setUserList] = useState(Array<IUser>);



    const [totalQuantityPeriod1, setTotalQuantityPeriod1] = useState(0);
    const [totalValuePeriod1, setTotalValuePeriod1] = useState(0);
    const [totalQuantityPeriod2, setTotalQuantityPeriod2] = useState(0);
    const [totalValuePeriod2, setTotalValuePeriod2] = useState(0);
    const [totalCostBillsOperation, setTotalCostBillsOperation] = useState(0);
    const [totalNet, setTotalNet] = useState(0);
    const [totalFinancialOperatorCommission, setTotalFinancialOperatorCommission] = useState(0);
    const [totalResourcesCredit, setTotalResourcesCredit] = useState(0);
    const [vigency1, setVigency1] = useState(0);
    const [subtotalVigency, setSubtotalVigency] = useState(0);
    const [userInfo, setUserInfo] = useState([]);
    const [activeUserList, setActiveUserList] = useState([]);
    const [times, setTimes] = useState([]);


    const { getProjectsList, createActa, getHours } = useActaApi();
    const { getSalaryMin } = useGenericListService();
    const { getUser } = useAuthService();


    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        formState: { errors },
        watch
    } = useForm<IActa>({ resolver });



    const calculateTotals = (items) => {
        let totalQuantityPeriod1 = 0;
        let totalValuePeriod1 = 0;
        let totalQuantityPeriod2 = 0;
        let totalValuePeriod2 = 0;
        let totalCostBillsOperation = 0;
        let totalNet = 0;
        let totalFinancialOperatorCommission = 0;
        let totalResourcesCredit = 0;
        let totalSubtotalVigency = 0;

        items.forEach(item => {

            const quantityPeriod1 = parseInt(item.periods?.quantityPeriod1 || '0', 10);
            const valuePeriod1 = parseInt(item.periods?.valuePeriod1 || '0', 10);
            const quantityPeriod2 = parseInt(item.periods?.quantityPeriod2 || '0', 10);
            const valuePeriod2 = parseInt(item.periods?.valuePeriod2 || '0', 10);
            const costBillsOperation = parseInt(item.costBillsOperation || '0', 10);
            const net = parseInt(item.net || '0', 10);
            const financialOperatorCommission = parseInt(item.financialOperatorCommission || '0', 10);
            const resourcesCredit = parseInt(item.resourcesCredit || '0', 10);
            const subtotalVigency = parseInt(item.subtotalVigency || '0', 10);


            totalQuantityPeriod1 += isNaN(quantityPeriod1) ? 0 : quantityPeriod1;
            totalValuePeriod1 += isNaN(valuePeriod1) ? 0 : valuePeriod1;

            totalQuantityPeriod2 += isNaN(quantityPeriod2) ? 0 : quantityPeriod2;
            totalValuePeriod2 += isNaN(valuePeriod2) ? 0 : valuePeriod2;

            totalCostBillsOperation += isNaN(costBillsOperation) ? 0 : costBillsOperation;

            totalNet += isNaN(net) ? 0 : net;

            totalFinancialOperatorCommission += isNaN(financialOperatorCommission) ? 0 : financialOperatorCommission;

            totalResourcesCredit += isNaN(resourcesCredit) ? 0 : resourcesCredit;

            totalSubtotalVigency += isNaN(subtotalVigency) ? 0 : subtotalVigency;
        });

        const vigency1 = totalValuePeriod1 + totalValuePeriod2 + totalCostBillsOperation + totalFinancialOperatorCommission;

        setTotalQuantityPeriod1(totalQuantityPeriod1);
        setTotalValuePeriod1(totalValuePeriod1);
        setTotalQuantityPeriod2(totalQuantityPeriod2);
        setTotalValuePeriod2(totalValuePeriod2);
        setTotalCostBillsOperation(totalCostBillsOperation);
        setTotalNet(totalNet);
        setTotalFinancialOperatorCommission(totalFinancialOperatorCommission);
        setTotalResourcesCredit(totalResourcesCredit);
        setSubtotalVigency(totalSubtotalVigency)
        setVigency1(vigency1);
        return {
            totalQuantityPeriod1,
            totalValuePeriod1,
            totalQuantityPeriod2,
            totalValuePeriod2,
            totalCostBillsOperation,
            totalNet,
            totalFinancialOperatorCommission,
            totalResourcesCredit,
            totalSubtotalVigency,
            vigency1
        };
    };



    useEffect(() => {
        calculateTotals(dataGridItems);
    }, [dataGridItems]);

    const addItem = handleSubmit((data: IActa) => {
        //console.log('datos',data)
        data.idStatus = 1;
        setDatosActa(data)
        setMessage({
            show: true,
            title: "Agregar ítem",
            description: <ItemsCreatePage acta={data} action={"new"} />,
            background: true,
            size: "items",
            items: true,
            onOk() {
                setMessage({});
            },
        });
    });


    /* 
      const addItem = handleSubmit((data: IVotingCreate) => { 
        console.log("data en agregar item ", data)
        if (data.communeNeighborhood && data.numberProject && data.ideaProject && data.validity) {
            setMessage({
              show: true,
              title: "Agregar item",
              // OkTitle: "Aceptar",
              // cancelTitle: "Cancelar",
              onOk() {
                setMessage({});
              },
              background: true,
              description: <ItemResultsPage dataVoting={data} action={"new"} />,
              size: "large",
              style: "mdl-agregarItem-voting",
            });
          onSubmitSearch();
        } else {
            setMessage({
              show: true,
              title: "Error",
              description: "Debe llenar todos los campos",
              OkTitle: "Aceptar",
              cancelTitle: "Cancelar",
              onOk() {
                setMessage({});
              },
              background: true,
            });
            }

    })
    */



    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    useEffect(() => {
        getProjectsList()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setProjectsList(
                        response.data.map((item) => {
                            const list = {
                                value: item.id,
                                name: item.bpin,
                                meta: item.goal,
                            };
                            return list;
                        })
                    );
                }
            })

        getWorkersActive();




        getHours().then(result => setTimes(result));

    }, []);


    const getWorkersActive = () => {
        getUser()
            .then((response: ApiResponse<IUser[]>) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setUserInfo(response.data);
                    setActiveUserList(
                        response.data.map((item) => {
                            const list = {
                                value: item.id,
                                name: `${item.numberDocument +
                                    " - " +
                                    item.names +
                                    " " +
                                    item.lastNames
                                    }`,
                                email: item.email
                            };
                            return list;
                        })
                    );
                }
            })
            .catch((err) => { });
    };


        const selectedProject = watch('numberProject');    
        const selectedUser = watch('user');    
        const selectedTime= watch('timeCitation');    
        const selectedDate= watch('dateCitation');    

        useEffect(() => {
            // Verifica si todos los valores están definidos antes de ejecutar el push
            if (selectedUser ) {
                dataGridUsers.push({
                    user: selectedUser,
                    dateCitation: selectedDate,
                    timeCitation: selectedTime
                });
                setMessage({
                    OkTitle: "Aceptar",
                    description: "Se ha agregado el item exitosamente",
                    title: "Agregar Item",
                    show: true,
                    type: EResponseCodes.OK,
                    background: true,
                    onOk() {
                        //reset();
                        setMessage({});
                    },
                    onClose() {
                        reset();
                        setMessage({});
                    },
                });
            }
        }, [selectedUser]);
             
        



    useEffect(() => {
        const selectedProjectMeta = projectList[selectedProject]?.meta;
        setProjectMeta(selectedProjectMeta);
        //setValue("techo", projectMeta);
    }, [selectedProject, projectList]);


    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        reset();
        if (showTable) {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []);

    useEffect(() => {
        getSalaryMin()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setSalary(response.data[0].value);
                }
            })

    }, []);

    useEffect(() => {
        if (!salary) return;
        setValue("salaryMin", String(salary));
    }, [salary]);


    /*Functions*/
    const onsubmitCreate = handleSubmit((data: IActa) => {
        setMessage({
            show: true,
            title: "Guardar acta",
            description: "¿Estas segur@ de guardar de guardar la información?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                confirmActaCreation(data);
            },
            background: true,
        });
    });

    const confirmActaCreation = async (data: IActa) => {
        dataGridItems.map((e) => {
            actaItems.push({
                costOperation: e.costOperation,
                subtotalVigency: e.subtotalVigency,
                costBillsOperation: e.costBillsOperation,
                financialOperatorCommission: e.financialOperatorCommission,
                resourcesCredit: e.resourcesCredit,
                periods: e.periods,
                net: e.net,
                idFound: e.idFound,
                idLine: e.idLine,
                idProgram: e.idProgram,
                idAnnouncement: e.idAnnouncement,
                idConcept: e.idConcept

            });
        })

        const actaData = {
            numberProject: data.numberProject,
            periodVigency: data.periodVigency,
            announcementInitial: data.announcementInitial,
            salaryMin: data.salaryMin,
            costsExpenses: data.costsExpenses,
            OperatorCommission: data.OperatorCommission,
            financialOperation: data.financialOperation,
            idStatus: data.idStatus,
            items: actaItems,
        };

        const res = await createActa(actaData);

        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Guardar",
                description: "¡Guardado exitosamente!",
                title: "Guardar",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                    //navigate("/core/usuarios/consultar");
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });

        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Crear Acta",
                description: "Ocurrió un error en el sistema",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });

        }
    };

    const handleInputChange = 0;


    return {
        control,
        errors,
        register,
        setValue,
        onsubmitCreate,
        showTable,
        tableComponentRef,
        datos,
        setDataGridItems,
        dataGridItems,
        salary,
        datosActa,
        projectList,
        projectMeta,
        vigency1,
        addItem,
        totalQuantityPeriod1,
        totalValuePeriod1,
        totalQuantityPeriod2,
        totalValuePeriod2,
        totalCostBillsOperation,
        totalNet,
        totalFinancialOperatorCommission,
        totalResourcesCredit,
        subtotalVigency,
        activeUserList,
        times,
        handleInputChange,
        dataGridUsers
        /* CancelFunction  */
    }
}