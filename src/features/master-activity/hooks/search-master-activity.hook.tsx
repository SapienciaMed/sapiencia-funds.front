import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {ITableAction,ITableElement,} from "../../../common/interfaces/table.interfaces";
import {IMasterActivityFilter, IMasterActivity} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import {
    DataItem,
    ResponsiveTable,
  } from "../../../common/components/Form/table-detail.component";


export default function useSearchMasterHook() {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getActivity, getActivityById } = useActivityService();

  //states
  const [showTable, setshowTable] = useState(false);
  const [activity, setActivity] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();



  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getActivity();  
    if (operation.code === EResponseCodes.OK) {
      const activityList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });

      setActivity(activityList);

    } else {
      setActivity([]);
    }
  };


  const showDetailLicence = async (id: number) => {
    const { operation, data } = await getActivityById(id);

    if (operation.code === EResponseCodes.OK) {
      const dataResolution: DataItem[] = [
        {
          title: "Actividad",
          value: `${data[0].name}`,
        },
      ];

      const dataInformation: DataItem[] = [
        {
          title: <span className="text-left">Valor</span>,
          value: `${data[0].totalValue}`,
        },
        {
          title: <span className="text-left">Programa</span>,
          value: `${data[0].codProgramCode}`,
        },

        {
          title: <span className="text-left">Descripción</span>,
          value: data[0].description
        },
      ];

      return setMessage({
        title: "Editar maestro actividad",
        show: true,
        //OkTitle: "Aceptar",
        description: (
          <div className="container-modal_description">
            <ResponsiveTable data={dataResolution} />
            <div>
              <h3 className="">Información</h3>
              <ResponsiveTable data={dataInformation} />
            </div>
           
          </div>
        ),
        size: "large",
        background: true,
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
  } = useForm<IMasterActivityFilter>();
  

  
  const tableColumns: ITableElement<IMasterActivity>[] = [
   
    {
      fieldName: "employment.worker.numberDocument",
      header: "Actividad",
      renderCell: (row) => {
        return (<>{row.name}</>);
      },
    },
    {
      fieldName: "row.employment.worker.firstName",
      header: "Valor",
      renderCell: (row) => {
        return (<>{row.totalValue}</>);
      },
    },
    {
      fieldName: "licenceType.id",
      header: "Programa",
      renderCell: (row) => {
        return <>{row.codProgramCode}</>;
      },
    },
    {
      fieldName: "licenceState",
      header: "Descripción",
      renderCell: (row) => {
        return <>{row.description}</>;
      },
    },
  ];
  const tableActions: ITableAction<IMasterActivity>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        showDetailLicence(row.id);
      },
    },
  ];


  const redirectCreate = () => {
    navigate("../crear");
   };


  const formValues = watch();


  const onSubmit = handleSubmit(async (data: IMasterActivity) => {
    setshowTable(true);
  
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
      console.log("*********************", data)
    }
  });


  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
    
  }


}
