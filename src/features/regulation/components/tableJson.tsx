import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import * as Icons from "react-icons/fa";

const INIT_DATA = { percentCondonation: "", dataTable: [] };
const INIT_TEMP_DATA = { initialAverage: "", endAverage: "", percent: "" };
const DEFAULT_MESSAGE = "Campo requerido";

const TableJson = ({
  title,
  setValue,
  idInput,
  isOpen,
  getValues,
  error,
  onlyView,
}) => {
  const [data, setData] = useState(INIT_DATA);
  const [tempData, setTempData] = useState(INIT_TEMP_DATA);
  const [percentCondonation, setPercentCondonation] = useState("");
  const [initialAverage, setInitialAverage] = useState("");
  const [endAverage, setEndAverage] = useState("");
  const [percent, setPercent] = useState("");

  useEffect(() => {
    const getData = getValues();
    if (getData[`${idInput}`]) {
      const parceData = JSON.parse(getData[`${idInput}`]);
      console.log(parceData);
      setData(parceData);
    } else {
      setData(INIT_DATA);
      setTempData(INIT_TEMP_DATA);
    }
  }, [isOpen]);

  const validateFields = () => {
    let isError = false;
    if (data.percentCondonation.length === 0) {
      setPercentCondonation(DEFAULT_MESSAGE);
      isError = true;
    } else if (
      Number(data.percentCondonation) < 1 ||
      Number(data.percentCondonation) > 100
    ) {
      setPercentCondonation("El campo no puede ser mayor a 100 y menor que 1");
      isError = true;
    } else {
      setPercentCondonation("");
    }

    if (tempData.initialAverage.length === 0) {
      setInitialAverage(DEFAULT_MESSAGE);
      isError = true;
    } else if (
      Number(tempData.initialAverage) < 0 ||
      Number(tempData.initialAverage) > 5
    ) {
      setInitialAverage("El campo no puede ser mayor a 5 y menor que cero");
      isError = true;
    } else {
      setInitialAverage("");
    }

    if (tempData.endAverage.length === 0) {
      setEndAverage(DEFAULT_MESSAGE);
      isError = true;
    } else if (
      Number(tempData.endAverage) < 0 ||
      Number(tempData.endAverage) > 5
    ) {
      setEndAverage("El campo no puede ser mayor a 5 y menor que cero");
      isError = true;
    } else {
      setEndAverage("");
    }

    if (Number(tempData.initialAverage) > Number(tempData.endAverage)) {
      setInitialAverage(
        "El promedio inicial no puede ser mayor al promedio final"
      );
      isError = true;
    }

    if (tempData.percent.length === 0) {
      setPercent(DEFAULT_MESSAGE);
      isError = true;
    } else if (Number(tempData.percent) < 1 || Number(tempData.percent) > 100) {
      setEndAverage("El campo no puede ser mayor a 100 y menor que 1");
      isError = true;
    } else {
      setPercent("");
    }

    isError = validateRanges();

    return isError;
  };

  const deleteItem = (id: string) => {
    const copyArr = data.dataTable;
    const objWithIdIndex = copyArr.findIndex((obj) => obj.id === id);
    copyArr.splice(objWithIdIndex, 1);
    setData({ ...data, dataTable: copyArr });
    setValue(idInput, JSON.stringify(data));
  };

  const addItem = () => {
    const isError = validateFields();
    if (isError) return;
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
        JSON.stringify({
          ...data,
          dataTable: [
            ...data.dataTable,
            { ...tempData, id: new Date().toISOString() },
          ],
        })
      );
    }, 500);
  };

  const validateRanges = () => {
    let isValidRange = false;
    if (data.dataTable.length === 0) return isValidRange;
    data.dataTable.map((range) => {
      if (
        tempData.initialAverage >= range.initialAverage &&
        tempData.initialAverage <= range.endAverage
      ) {
        isValidRange = true;
        setInitialAverage(
          "No se permite agregar el promedio porque se está solapando con otro ya ingresado"
        );
      } else {
        setInitialAverage("");
      }
      if (
        tempData.endAverage >= range.initialAverage &&
        tempData.endAverage <= range.endAverage
      ) {
        isValidRange = true;
        setEndAverage(
          "No se permite agregar el promedio porque se está solapando con otro ya ingresado"
        );
      } else {
        setEndAverage("");
      }
    });
    return isValidRange;
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <div
          className="containerApplyService"
          style={{ padding: "10px 0 10px 0" }}
        >
          <InputComponent
            idInput="percentCondonation"
            typeInput="number"
            disabled={onlyView ? true : false}
            value={data.percentCondonation}
            onChange={(e) =>
              setData({ ...data, percentCondonation: e.target.value })
            }
            className="input-basic input-size"
            classNameLabel="text-black biggest text-required bold"
            label="Porcentaje de condonación"
          />
          {percentCondonation && (
            <p
              style={{ color: "red" }}
              className="error-message bold not-margin-padding"
            >
              {percentCondonation}
            </p>
          )}
          {error && (
            <p
              style={{ color: "red" }}
              className="error-message bold not-margin-padding"
            >
              {percentCondonation}
            </p>
          )}
        </div>
      </div>
      <div className="container-form-children p-24 ">
        <label className={"text-black biggest bold"}>{title}</label>
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ padding: "10px 0 10px 0" }}>
            <InputComponent
              idInput="initialAverage"
              typeInput="number"
              disabled={onlyView ? true : false}
              onChange={(e) =>
                setTempData({ ...tempData, initialAverage: e.target.value })
              }
              value={tempData.initialAverage}
              className="input-basic input-size "
              classNameLabel="text-black biggest text-required bold"
              label="Promedio inicial"
            />
            {initialAverage.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {initialAverage}
              </p>
            )}
          </div>
          <div style={{ padding: "10px 0 10px 0" }}>
            <InputComponent
              idInput="endAverage"
              typeInput="number"
              disabled={onlyView ? true : false}
              onChange={(e) =>
                setTempData({ ...tempData, endAverage: e.target.value })
              }
              value={tempData.endAverage}
              className="input-basic input-size "
              classNameLabel="text-black biggest text-required bold"
              label="Promedio final"
            />
            {endAverage.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {endAverage}
              </p>
            )}
          </div>
          <div style={{ padding: "10px 0 10px 0" }}>
            <InputComponent
              idInput="percent"
              typeInput="number"
              disabled={onlyView ? true : false}
              onChange={(e) =>
                setTempData({ ...tempData, percent: e.target.value })
              }
              value={tempData.percent}
              className="input-basic input-size "
              classNameLabel="text-black biggest text-required bold"
              label="Porcentaje"
            />
            {percent.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {percent}
              </p>
            )}
          </div>
          <ButtonComponent
            value="Siguiente"
            type="button"
            action={() => {
              if (onlyView) return;
              addItem();
            }}
            className="button-save disabled-black padding-button"
          />
        </div>
        {data.dataTable.length > 0 && (
          <div className="containerJsonTable">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold"
                >
                  Promedio Inicial
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black  biggest bold"
                >
                  Promedio Final
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black biggest bold"
                >
                  Porcentaje
                </label>

                <label
                  style={{ padding: "14px 33px 14px 33px" }}
                  className="text-black biggest  bold"
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
                {data.dataTable.map((item) => {
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
                          className="text-black  biggest bold"
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
                          className="text-black  biggest bold"
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
                          className="text-black  biggest bold"
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
                          className="text-black  biggest bold"
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
    </div>
  );
};

export default TableJson;
