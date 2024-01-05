import { useEffect, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import {
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {IRegulation } from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const INIT_DATA = { dataTable: []};
const INIT_TEMP_DATA = { maximumHourPercent: '', minimumHourPercent: '', condonationPercent: '' };
const DEFAULT_MESSAGE = "Campo requerido";

interface ITableInitialConfiguration {
  title: string;
  setValue: UseFormSetValue<any>;
  idInput: 'socialServiceCondonationPercent' | 'knowledgeTransferCondonationPercent';
  isOpen: boolean;
  getValues: UseFormGetValues<IRegulation>;
  onlyView: boolean;
  dataRead: IRegulation;
}
const TableInitialConfiguration = ({
  title,
  setValue,
  idInput,
  isOpen,
  getValues,
  dataRead,
}: ITableInitialConfiguration) => {
  const [data, setData] = useState(INIT_DATA);
  const [tempData, setTempData] = useState(INIT_TEMP_DATA); 
  const [messageError, setMessageError] = useState({})
  
  useEffect(() => {
    let getData
    if (dataRead) {  
      getData = dataRead;
    } else {
      getData = getValues();
    }

    if (getData[`${idInput}`]) {
      setData({...data, dataTable: getData[`${idInput}`],});
    } else {
      setData(INIT_DATA);
      setTempData(INIT_TEMP_DATA);
    }
  }, [isOpen]);


  const deleteItem = (id: string) => {
    const copyArr = data.dataTable;
    const objWithIdIndex = copyArr.findIndex((obj) => obj?.id === id);
    copyArr.splice(objWithIdIndex, 1);
    setData({ ...data, ...copyArr });
    setValue(idInput, data.dataTable);    
  };

  const addItem = () => {
    const validateField = (fieldName: string, value, message) => {
      if (!value) {
        setMessageError(prevState => ({
          ...prevState,
          [fieldName]: {
            type: "optionality",
            message: message
          }
        }));
      }
    };

    if (tempData.condonationPercent == '' || tempData.minimumHourPercent == '' || tempData.maximumHourPercent == '') {
      validateField('condonationPercent', tempData.condonationPercent, DEFAULT_MESSAGE);
      validateField('minimumHourPercent', tempData.minimumHourPercent, DEFAULT_MESSAGE);
      validateField('maximumHourPercent', tempData.maximumHourPercent, DEFAULT_MESSAGE);
    } else if(parseInt(tempData.condonationPercent) < 0 || parseInt(tempData.condonationPercent) > 100){
      setMessageError({
        ...({'condonationPercent':{
            "type": "optionality",
            "message": "El campo no puede ser mayor a 100 y menor que 0"
          }
        })
      })
    } else if (parseInt(tempData.maximumHourPercent) < 0 || parseInt(tempData.maximumHourPercent) > 100 ) {
      setMessageError({
        ...({'maximumHourPercent':{
            "type": "optionality",
            "message": "El campo no puede ser mayor a 100 y menor que cero"
          }
        }),
      })
    } else if(parseInt(tempData.minimumHourPercent) < 0 || parseInt(tempData.minimumHourPercent) > 100){
      setMessageError({
        ...({'minimumHourPercent':{
            "type": "optionality",
            "message": "El campo no puede ser mayor a 100 y menor que cero"
          }
        })
      })
    }else if(validateRanges()){
      return
    } else {
      setMessageError({})
      setData({
        ...data,
        dataTable: [
          ...data.dataTable,
          { ...tempData, id: new Date().toISOString() },
        ],
        
      });
    setTempData(INIT_TEMP_DATA);
    }
  }

  useEffect(() => {
   if( data?.dataTable?.length > 0 ){
    setValue( idInput, [ ...data.dataTable ]);
   }
  },[data])

  const validateRanges = () => {
    let isValidRange = false;
    data.dataTable.forEach((range) => {
      if (
        tempData.minimumHourPercent >= range.minimumHourPercent && tempData.minimumHourPercent <= range.maximumHourPercent
      ) {
        isValidRange = true;
        setMessageError({
          ...messageError,
          'minimumHourPercent':{
            "type": "optionality",
            "message": "No se permite agregar el porcentaje porque se está solapando con otro ya ingresado"
          }
        })
      }
      if (tempData.maximumHourPercent >= range.minimumHourPercent && tempData.maximumHourPercent <= range.maximumHourPercent) {
        isValidRange = true;
        setMessageError({
          ...messageError,
          'maximumHourPercent':{
            "type": "optionality",
            "message": "No se permite agregar el porcentaje porque se está solapando con otro ya ingresado"
          }
        })
      }
    });
    return isValidRange;
  };

  const validateDecimales = (number) => {
    const parts = number.toString().split(".");
    if (parts.length === 2 && parts[1].length === 3) { return true }
    return false;
  };

  //Valida que el valor ingresado no sea mayor a 100
  const handleInputChange = (value: string, key: string) => {
    value = value.replace(/^0+(?=\d)/, '');
    

    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setTempData({ ...tempData, [key]: value });
    } else {
      setTempData({ ...tempData, [key]: '' });
    }
  };

  // Ordena de forma ascendente 
  const sortedData = [...data.dataTable].sort((a, b) => a.minimumHourPercent - b.minimumHourPercent);

  return (
    <div>
      <section className="container-form-children p-24 ">
        <label className={"text-black biggest font-500"}>{title}</label>
        <div className="dynamic-grid mb-16px mt-16px"> 
          <InputComponent
            idInput="minimumHourPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              handleInputChange(e.target.value, 'minimumHourPercent')
            }}
            value={tempData.minimumHourPercent}
            className="input-basic medium"
            classNameLabel="text-black big text-required font-500"
            direction={EDirection.column}
            label="% horas mínimas"
            errors={messageError}
          />
           <InputComponent
            idInput="maximumHourPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              handleInputChange(e.target.value, 'maximumHourPercent')    
            }}
            value={tempData.maximumHourPercent}
            className="input-basic medium"
            classNameLabel="text-black big text-required font-500"
            direction={EDirection.column}
            label="% horas máximas"
            errors={messageError}
          />
          <InputComponent
            idInput="condonationPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              handleInputChange(e.target.value, 'condonationPercent')
            }}
            value={tempData.condonationPercent}
            className="input-basic medium"
            classNameLabel="text-black big text-required font-500"
            direction={EDirection.column}
            label="% Condonado"
            errors={messageError}
          />
          <div className="display-align-flex-end mt-5px">
            <ButtonComponent
              value="Agregar"
              type="button"
              action={() => {
                addItem()
              }}
              className="button-save big disabled-black padding-button no-margin"
            />
          </div>
        </div>
      </section>
      {
        (data?.dataTable?.length > 0 && sortedData.length > 0) && (
          <div className='spc-customized-table spc-common-table-without-border'>
            <div className="containerJsonTable" >
                <DataTable value={sortedData} className={`spc-table full-height`} paginator={false} scrollable >
                  <Column field="minimumHourPercent" header="% horas mínimas"></Column>
                  <Column field="maximumHourPercent" header="% horas máximas"></Column>
                  <Column field="condonationPercent" header="% Condonado"></Column>
                  <Column
                    className="spc-table-actions"
                    header={
                      <div>
                        <div className="spc-header-title">Acciones</div>
                      </div>
                    }
                    body={(row) => (
                      <label
                        style={{ padding: "16px", cursor: 'pointer' }}
                        className="text-black  biggest"
                        onClick={() => {
                          deleteItem(row.id);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6901 21H8.30603C7.24587 21 6.36494 20.192 6.28596 19.147L5.37769 7H19.5881L18.7102 19.142C18.6342 20.189 17.7523 21 16.6901 21V21Z" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.4999 11V17" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4.39941 7H20.6005" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M17.5628 7L16.5371 4.298C16.2404 3.517 15.485 3 14.6405 3H10.3594C9.51492 3 8.75955 3.517 8.46286 4.298L7.43713 7" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.9731 11L15.5377 17" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M9.02674 11L9.46214 17" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </label>
                    )}
                  />
                </DataTable>
              </div>
          </div>
        )
      }
    </div>
  );
};

export default TableInitialConfiguration;
