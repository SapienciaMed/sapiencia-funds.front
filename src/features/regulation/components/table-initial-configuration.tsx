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
  IPerformanceStructure,
  IRegulation,
  IRegulationSearch,
} from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";

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
  onlyView,
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
    if (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100) {
      setTempData({ ...tempData, [key]: value });
    }else {
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

        {data?.dataTable?.length > 0 && (
          <div className="containerJsonTable">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold-500"
                >
                  % horas mínimas
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold-500"
                >
                  % horas máximas
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black biggest bold-500"
                >
                  % Condonado
                </label>

                {!onlyView && (
                  <label
                    style={{ padding: "14px 33px 14px 33px" }}
                    className="text-black biggest  bold-500"
                  >
                    Accion
                  </label>
                )}
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
                {sortedData?.map((item) => {
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
                          {item.minimumHourPercent}%
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
                          {item.maximumHourPercent}%
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
                          {item.condonationPercent}%
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
                              if (onlyView) return;
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

export default TableInitialConfiguration;
