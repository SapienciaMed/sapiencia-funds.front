import { useEffect, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import {
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
 IRegulation,
  IRegulationSearch,
} from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const INIT_DATA = { percentCondonation: "", dataTable: [] };
const INIT_TEMP_DATA = { initialAverage: "", endAverage: "", percent: "" };
const DEFAULT_MESSAGE = "Campo requerido";

interface ITableJson {
  title: string;
  setValue: UseFormSetValue<IRegulationSearch>;
  idInput: 'performancePeriodStructure' | 'accumulatedPerformanceDataTable';
  isOpen: boolean;
  getValues: UseFormGetValues<IRegulationSearch>;
  dataRead: IRegulation;
}

const TableJson = ({
  title,
  setValue,
  idInput,
  isOpen,
  getValues,
  dataRead,
}: ITableJson) => {
  const [data, setData] = useState(INIT_DATA);
  const [tempData, setTempData] = useState(INIT_TEMP_DATA);
  const [percentCondonationValue, setPercentCondonationValue] = useState("");
  const [messageError, setMessageError] = useState({})

  useEffect(() => {
    let getData
    if (dataRead) { 
      getData = dataRead;
      setPercentCondonationValue(String(dataRead?.[idInput]?.percentCondonation))
    } else {
      getData = getValues();
    }

    if (getData[`${idInput}`]) {
      setData(getData[`${idInput}`]);
    } else {
      setData(INIT_DATA);
      setTempData(INIT_TEMP_DATA);
    }
  }, [isOpen]);

  const deleteItem = (id: string) => {
    const copyArr = data.dataTable;
    const objWithIdIndex = copyArr.findIndex((obj) => obj.id === id);
    copyArr.splice(objWithIdIndex, 1);
    setData({ ...data, dataTable: copyArr });
    setValue(idInput, data);    
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

    if (percentCondonationValue == '' || tempData.percent.length === 0 || tempData.endAverage.length === 0 || tempData.initialAverage.length === 0) {
      validateField('percentCondonation', percentCondonationValue, DEFAULT_MESSAGE);
      validateField('percent', tempData.percent, DEFAULT_MESSAGE);
      validateField('endAverage', tempData.endAverage, DEFAULT_MESSAGE);
      validateField('initialAverage', tempData.initialAverage, DEFAULT_MESSAGE);
    } else if(validateRanges()){
      return
    } else {
      setMessageError({})
      setData({
        ...data,
        dataTable: [
          ...data.dataTable,
          { ...tempData, id: new Date().toISOString() },
        ],
        percentCondonation: percentCondonationValue
      });
    setTempData(INIT_TEMP_DATA);
    setTimeout(() => {
      setValue(
        idInput,
        {
          ...data,
          dataTable: [
            ...data.dataTable,
            { ...tempData},
          ],
          percentCondonation: parseInt(percentCondonationValue)
        },
      );
    }, 500);
    }
  }

  const validateRanges = () => {
    let isValidRange = false;
    data.dataTable.forEach((range) => {
      if (
        tempData.initialAverage >= range.initialAverage && tempData.initialAverage <= range.endAverage
      ) {
        isValidRange = true;
        setMessageError({
          ...messageError,
          'initialAverage':{
            "type": "optionality",
            "message": "No se permite agregar el porcentaje porque se está solapando con otro ya ingresado"
          }
        })
      }
      if (tempData.endAverage >= range.initialAverage && tempData.endAverage <= range.endAverage) {
        isValidRange = true;
        setMessageError({
          ...messageError,
          'endAverage':{
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

  const validateSize = (number: string) => { return parseInt(number) > 5.00 };

  // Ordena de forma ascendente 
  const sortedData = [...data?.dataTable].sort((a, b) => a?.initialAverage - b?.initialAverage);

  function handleInputChange3(value: string, minSize: number, maxSize: number, setTargetValue: (newValue: string) => void) {
    const cleanValue = formatInputValue(value);
    const floatValue = parseFloat(cleanValue);
  
    if (
      floatValue > maxSize ||
      isNaN(floatValue) ||
      parseInt(cleanValue) < minSize ||
      cleanValue === '00' ||
      cleanValue === '0.00'
    ) {
      setTargetValue('');
    } else {
      setTargetValue(cleanValue);
    }
  }
  
  function formatInputValue(value: string): string {
    return value
    .replace(/^0+(?=\d)/, '')
    .replace(/[^0-9.]/g, '')
    .replace(/\.(\d{2})\d*$/, '.$1') 
    .replace(/^\./, '0.');
  }


  return (
    <div>
      <section className="grid-form-2-container mb-16px">
        <InputComponent
          idInput='percentCondonation'
          typeInput="number"
          value={percentCondonationValue}
          onChange={(e) => {  handleInputChange3(e.target.value, 0, 100, (newValue) => {
            setPercentCondonationValue(newValue);
            setValue(`${idInput}.percentCondonation`, newValue);
          }); }}
          className="input-basic big"
          classNameLabel="text-black big text-required font-500 text-required"
          direction={EDirection.column}
          label="Porcentaje de condonación"
          errors={messageError}
        />
      </section>
      <section className="container-form-children p-24 ">
        <label className={"text-black biggest font-500"}>{title}</label>
        <div className="dynamic-grid mb-16px mt-16px">
          <InputComponent
            idInput="initialAverage"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              if (validateSize(e.target.value)) return;
              setTempData({ ...tempData, initialAverage: e.target.value });
            }}
            value={tempData.initialAverage}
            className="input-basic big"
            classNameLabel="text-black big text-required font-500 text-required"
            direction={EDirection.column}
            label="Promedio inicial"
            errors={messageError}
          />
          <InputComponent
            idInput="endAverage"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              if (validateSize(e.target.value)) return;
              setTempData({ ...tempData, endAverage: e.target.value });
            }}
            value={tempData.endAverage}
            className="input-basic big"
            classNameLabel="text-black big text-required font-500 text-required"
            direction={EDirection.column}
            label="Promedio final"
            errors={messageError}
          />
          <InputComponent
            idInput="percent"
            typeInput="number"
            onChange={(e) => {
              handleInputChange3(e.target.value, 1, 100, (newValue) => {
                setTempData({ ...tempData, percent: newValue });
              });
            }}
            value={tempData.percent}
            className="input-basic big"
            classNameLabel="text-black big text-required font-500 text-required"
            direction={EDirection.column}
            label="Porcentaje"
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
                <DataTable value={sortedData} className={`spc-table full-height`} paginator={false} scrollable>
                  <Column field="initialAverage" header="Promedio Inicial"></Column>
                  <Column field="endAverage" header="Promedio Final"></Column>
                  <Column field="percent" header="Porcentaje"></Column>
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

export default TableJson;
