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
  IRegulationSearch,
} from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";

const INIT_DATA = { percentCondonation: "", dataTable: [] };
const INIT_TEMP_DATA = { maximumHourPercent: "", minimumHourPercent: "", condonationPercent: "" };
const DEFAULT_MESSAGE = "Campo requerido";

interface ITableInitialConfiguration {
  title: string;
  setValue: UseFormSetValue<IRegulationSearch>;
  idInput: 'socialServiceCondonationPercent' | 'accumulatedPerformanceDataTable';
  isOpen: boolean;
  getValues: UseFormGetValues<IRegulationSearch>;
  onlyView: boolean;
  dataRead: IPerformanceStructure;
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
    if (onlyView) {  // No se esta usando 
      getData = dataRead;
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

    if (tempData.condonationPercent.length === 0 || tempData.minimumHourPercent.length === 0 || tempData.maximumHourPercent.length === 0) {
      validateField('condonationPercent', tempData.condonationPercent, DEFAULT_MESSAGE);
      validateField('minimumHourPercent', tempData.minimumHourPercent, DEFAULT_MESSAGE);
      validateField('maximumHourPercent', tempData.maximumHourPercent, DEFAULT_MESSAGE);
    } else if(parseInt(tempData.condonationPercent) < 0 || parseInt(tempData.condonationPercent) > 100){
      setMessageError({
        ...({'percent':{
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
        ...({'endAverage':{
            "type": "optionality",
            "message": "El campo no puede ser mayor a 100 y menor que cero"
          }
        })
      })
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
    setTimeout(() => {
      setValue(
        idInput,
        {
          ...data,
          dataTable: [
            ...data.dataTable,
            { ...tempData},
          ],
        },
      );
    }, 500);
    }
  }

  const validateDecimales = (number) => {
    const parts = number.toString().split(".");
    if (parts.length === 2 && parts[1].length === 3) { return true }
    return false;
  };

  return (
    <div>
      <section className="container-form-children p-24 ">
        <label className={"text-black biggest font-500"}>{title}</label>
        <div className="dynamic-grid mb-16px mt-16px">
          <InputComponent
            idInput="maximumHourPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              setTempData({ ...tempData, maximumHourPercent: e.target.value });
            }}
            value={tempData.maximumHourPercent}
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
            direction={EDirection.column}
            label="% horas máximas"
            errors={messageError}
          />
          <InputComponent
            idInput="minimumHourPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              setTempData({ ...tempData, minimumHourPercent: e.target.value });
            }}
            value={tempData.minimumHourPercent}
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
            direction={EDirection.column}
            label="% horas mínimas"
            errors={messageError}
          />
          <InputComponent
            idInput="condonationPercent"
            typeInput="number"
            onChange={(e) => {
              if (validateDecimales(e.target.value)) return;
              setTempData({ ...tempData, condonationPercent: e.target.value });
            }}
            value={tempData.condonationPercent}
            className="input-basic color-default-value"
            classNameLabel="text-black weight-500 big text-required"
            direction={EDirection.column}
            label="% Condonado"
            errors={messageError}
          />
          <div className="display-align-flex-end mt-5px">
            <ButtonComponent
              value="Agregar"
              type="button"
              action={() => {
                if (onlyView) return;
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
                {data?.dataTable?.map((item) => {
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
