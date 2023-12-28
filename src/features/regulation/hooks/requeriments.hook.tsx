import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useRequerimentsApi } from "./requeriments-api-service.hook";
import { IRegulation, IRequirementsForReglament } from "../../../common/interfaces/regulation";
import { Control, FieldErrors, UseFormGetValues, UseFormResetField, UseFormSetValue, useForm } from "react-hook-form";
import {ITableElement } from "../../../common/interfaces/table.interfaces";
import * as Icons from "react-icons/fa";
import { SwitchNewComponent } from "../../../common/components/Form/switch-new.component";

const INIT_TEMP_DATA = { active: false, mandatoryFor: '', description: '' };
const INIT_DATA = { dataTable: []};
interface IRequerimentsHook{
  getValues: UseFormGetValues<IRegulation>
  setValue: UseFormSetValue<IRegulation>
  updateData: IRegulation;
  errors: FieldErrors<IRegulation>
  control: Control<IRegulation, any>
}

const useRequerimentsHook = ({ getValues, setValue}: IRequerimentsHook) => {
  const tableComponentRef = useRef(null);
  const [data, setData] = useState(INIT_DATA);
  const [tempData, setTempData] = useState(INIT_TEMP_DATA); 
  const [messageError, setMessageError] = useState({})

  const {
    control: controlRequirement,
    reset,
  } = useForm<IRequirementsForReglament>({});

  useEffect(() => {
    if (getValues('requirementsForReglament')) {
      setData({
        dataTable: getValues('requirementsForReglament')
      });
    } else {
      setData(INIT_DATA);
      setTempData(INIT_TEMP_DATA);
    }
  }, []);

  useEffect(() => {
    if (data?.dataTable?.length > 0 ) {
      setValue('requirementsForReglament', [...data.dataTable]);
    }
  },[data])

  const addItem = () => {
    if (tempData.description == '' ) {
      setMessageError(prevState => ({
        ...prevState,
        description: {
          type: 'optionality',
          message: 'Campo requerido'
        }
      }))
    }
    if (tempData.mandatoryFor == '') {
      setMessageError(prevState => ({
        ...prevState,
        mandatoryFor: {
          type: 'optionality',
          message: 'Campo requerido'
        }
      }))
    }

    if (tempData.description &&  tempData.mandatoryFor) {
      setMessageError({})
      setData({
        ...data,
        dataTable: [
          ...data.dataTable,
          { ...tempData, id: new Date().toISOString() },
        ],
      });
      setTempData(INIT_TEMP_DATA);
      reset({
        mandatoryFor: '',
      })
    }
  }

  const deleteItem = (id: string) => {
    const copyArr = data.dataTable;
    const objWithIdIndex = copyArr.findIndex((obj) => obj?.id === id);
    copyArr.splice(objWithIdIndex, 1);
    setData({ ...data, ...copyArr });
    setValue('requirementsForReglament', data.dataTable);  
    loadTableData()  
  };

  const changeSwitche = (id: number) => {
    const copyArr = data.dataTable;
    const objWithIdIndex = copyArr.findIndex((obj) => obj?.id === id);
    copyArr[objWithIdIndex].active = !copyArr[objWithIdIndex].active;
    setData({ ...data, ...copyArr });
    setValue('requirementsForReglament', data.dataTable);
  }
  const tableColumns: ITableElement<IRequirementsForReglament>[] = [
    {
        fieldName: "aproved",
        header: "Activo",
        renderCell: (row) => {
          return (
            <SwitchNewComponent
              idInput={`checkRow${row.id}`}
              value={ row.active }
              onChange={(value) => {
                 changeSwitche(row?.id)
              }}
              className="switch-new"
            />
          )
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
    },
    {
        fieldName: "actions",
        header: "Acciones",
        renderCell: (row) => {
            return (
                <>
                  <div>
                    <label
                      style={{ padding: "14px 33px 14px 33px" }}
                      className="text-black  biggest"
                      onClick={() => { deleteItem(String(row?.id)) }}
                    >
                      <Icons.FaTrashAlt
                        style={{ color: "red" }}
                        className="button grid-button button-delete"
                      />
                    </label>
                  </div>
                </>
            );
        }
    }
  ]

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  useEffect(() => {
    loadTableData({
        page: 1,
        perPage: 100,
    });
  }, [])

  return {
    addItem,
    setTempData,
    tempData,
    tableColumns,
    tableComponentRef,
    data,
    messageError,
    controlRequirement
  };
};

export default useRequerimentsHook;
