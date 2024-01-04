import { useEffect, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import * as Icons from "react-icons/fa";
import {
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
 IRegulation,
  IRegulationSearch,
} from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";

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
  const sortedData = [...data.dataTable].sort((a, b) => a.initialAverage - b.initialAverage);

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
          className="input-basic color-default-value"
          classNameLabel="text-black weight-500 big text-required"
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
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
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
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
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
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
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
      {data?.dataTable?.length > 0 && (
          <div className="containerJsonTable">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold-500"
                >
                  Promedio Inicial
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold-500"
                >
                  Promedio Final
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black biggest bold-500"
                >
                  Porcentaje
                </label>
                  <label
                    style={{ padding: "14px 33px 14px 33px" }}
                    className="text-black biggest  bold-500"
                  >
                    Accion
                  </label>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                {sortedData.map((item) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#F4F4F4",
                        width: "100%",
                        minWidth: "560px",
                      }}
                      key={"keyTable"}
                    >
                      <div
                        style={{
                          width: "175px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{ padding: "16px 23.5px 16px 23.5px" }}
                          className="text-black  biggest"
                        >
                          {item.initialAverage}
                        </label>
                      </div>
                      <div
                        style={{
                          width: "175px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{ padding: "14px 33px 14px 33px" }}
                          className="text-black  biggest"
                        >
                          {item.endAverage}
                        </label>
                      </div>
                      <div
                        style={{
                          width: "175px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{ padding: "14px 33px 14px 33px" }}
                          className="text-black  biggest"
                        >
                          {item.percent}%
                        </label>
                      </div>
                      <div
                          style={{
                            width: "175px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            style={{ padding: "14px 33px 14px 33px" }}
                            className="text-black  biggest"
                            onClick={() => {
                              deleteItem(item.id);
                            }}
                          >
                            <Icons.FaTrashAlt
                              style={{ color: "red" }}
                              className="button grid-button button-delete"
                            />
                          </label>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TableJson;
