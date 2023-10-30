import React, { useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import * as Icons from "react-icons/fa";

const INIT_DATA = { percentCondonation: "", dataTable: [] };
const INIT_TEMP_DATA = { initialAverage: "", endAverage: "", percent: "" };
const DEFAULT_MESSAGE = "Campo requerido";

const TableJson = ({ title, setValue, idInput }) => {
  const [data, setData] = useState(INIT_DATA);
  const [tempData, setTempData] = useState(INIT_TEMP_DATA);
  const [percentCondonation, setPercentCondonation] = useState("");
  const [initialAverage, setInitialAverage] = useState("");
  const [endAverage, setEndAverage] = useState("");
  const [percent, setPercent] = useState("");

  const validateFields = () => {
    let isError = false;
    if (data.percentCondonation.length === 0) {
      setPercentCondonation(DEFAULT_MESSAGE);
      isError = true;
    } else {
      setPercentCondonation("");
    }

    if (tempData.initialAverage.length === 0) {
      setInitialAverage(DEFAULT_MESSAGE);
      isError = true;
    } else {
      setInitialAverage("");
    }

    if (tempData.endAverage.length === 0) {
      setEndAverage(DEFAULT_MESSAGE);
      isError = true;
    } else {
      setEndAverage("");
    }

    if (tempData.percent.length === 0) {
      setPercent(DEFAULT_MESSAGE);
      isError = true;
    } else {
      setPercent("");
    }

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
    console.log(isError);
    if (isError) return;
    setData({
      ...data,
      dataTable: [
        ...data.dataTable,
        { ...tempData, id: new Date().toISOString() },
      ],
    });
    setTempData(INIT_TEMP_DATA);
    setValue(idInput, JSON.stringify(data));
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <div
          className="containerApplyService"
          style={{ flexDirection: "column" }}
        >
          <InputComponent
            idInput="percentCondonation"
            typeInput="number"
            onChange={(e) =>
              setData({ ...data, percentCondonation: e.target.value })
            }
            className="input-basic input-size"
            classNameLabel="text-black biggest text-required bold"
            label="Porcentaje de condonación"
          />
          {percentCondonation.length > 0 && (
            <p
              style={{ color: "red" }}
              className="error-message bold not-margin-padding"
            >
              {DEFAULT_MESSAGE}
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
            width: "70%",
            alignItems: "center",
          }}
        >
          <div style={{ flexDirection: "column" }}>
            <InputComponent
              idInput="initialAverage"
              typeInput="number"
              onChange={(e) =>
                setTempData({ ...tempData, initialAverage: e.target.value })
              }
              value={tempData.initialAverage}
              className="input-basic input-size"
              classNameLabel="text-black biggest text-required bold"
              label="Promedio inicial"
            />
            {initialAverage.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {DEFAULT_MESSAGE}
              </p>
            )}
          </div>
          <div style={{ flexDirection: "column" }}>
            <InputComponent
              idInput="endAverage"
              typeInput="number"
              onChange={(e) =>
                setTempData({ ...tempData, endAverage: e.target.value })
              }
              value={tempData.endAverage}
              className="input-basic input-size"
              classNameLabel="text-black biggest text-required bold"
              label="Promedio final"
            />
            {endAverage.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {DEFAULT_MESSAGE}
              </p>
            )}
          </div>
          <div style={{ flexDirection: "column" }}>
            <InputComponent
              idInput="percent"
              typeInput="number"
              onChange={(e) =>
                setTempData({ ...tempData, percent: e.target.value })
              }
              value={tempData.percent}
              className="input-basic input-size"
              classNameLabel="text-black biggest text-required bold"
              label="Porcentaje"
            />
            {percent.length > 0 && (
              <p
                style={{ color: "red" }}
                className="error-message bold not-margin-padding"
              >
                {DEFAULT_MESSAGE}
              </p>
            )}
          </div>
          <ButtonComponent
            value="Siguiente"
            action={addItem}
            className="button-save disabled-black padding-button"
          />
        </div>
        {data.dataTable.length > 0 && (
          <div style={{ width: "700px", marginTop: "24px" }}>
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
            <div>
              {data.dataTable.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#F4F4F4",
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
                        {item.percent}
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
                        onClick={() => deleteItem(item.id)}
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
        )}
      </div>
    </div>
  );
};

export default TableJson;
