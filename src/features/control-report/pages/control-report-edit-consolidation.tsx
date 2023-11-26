import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";

export interface IcontrolReport {
  consolidatedPreselected: number;
  consolidatedResourceAvailable: number;
  consolidatedGranted: number;
  consolidatedLegalized: number;
  consolidatedFinancialReturns: number;
  Stratum123Granted: number;
  Stratum123Legalized: number;
  Stratum123ResourceAvailable: null;
  Stratum456Granted: null;
  Stratum456Legalized: null;
  Stratum456ResourceAvailable: null;
  announcement: string;
  id: number;
  idResourcePrioritization: number;
  resourcePrioritization: resourcePrioritization;
  places: number;
}

interface resourcePrioritization {
  id: number;
  places: number;
}
export const controlEditConsolidation = yup.object({
  consolidatedPreselected: yup.number().optional(),
  places: yup.number().optional(),
  consolidatedResourceAvailable: yup.number().optional(),
  consolidatedGranted: yup.number().optional(),
  consolidatedLegalized: yup.number().optional(),
  consolidatedFinancialReturns: yup.number().optional(),
});

const Controlreporteditconsolidation = (data) => {
  console.log(data);
  const [comuna, setComuna] = useState(null);
  const [disponible, setDisponible] = useState(null);
  const [porParcipacion, setPorParticipacon] = useState(null);
  const info = data.data;
  const resolver = useYupValidationResolver(controlEditConsolidation);
  const { setMessage } = useContext(AppContext);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { put } = useCrudService(urlApiFunds);
  const {
    handleSubmit,
    watch,
    register,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver,
    mode: "all",
    defaultValues: {
      consolidatedPreselected: null,
      consolidatedResourceAvailable: null,
      consolidatedGranted: null,
      consolidatedLegalized: null,
      consolidatedFinancialReturns: null,
      places: null,
    },
  });

  // const places = watch("resourcePrioritization.places");
  useEffect(() => {
    setValue("consolidatedPreselected", info.consolidatedPreselected);
    setValue(
      "consolidatedResourceAvailable",
      info.consolidatedResourceAvailable
    );
    setValue("consolidatedGranted", info.consolidatedGranted);
    setValue("consolidatedLegalized", info.consolidatedLegalized);
    setValue("consolidatedFinancialReturns", info.consolidatedFinancialReturns);
    setValue("places", info.places);
  }, []);
  const updateInfo = async (data) => {
    try {
      const endpoint = `/api/v1/controlSelect/updateInfoConsolidado`;
      const resp = await put(endpoint, data);

      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Guardar",
          description: resp.operation.message,
          show: true,
          OkTitle: "Cerrar",
          onOk: () => {
            setMessage({ show: false });
          },
          background: true,
        });
      }
      setMessage({
        title: "Guardar",
        description: "¡Guardado exitosamente!",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
        },

        background: true,
      });
    } catch (error) {
      console.error(error);
      setMessage({
        title: "Guardar",
        description: "Error, por favor intente más tarde",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    }
  };

  const onSubmit = handleSubmit(async (dataEdit: IcontrolReport) => {
    const body = {
      id: info.id,
      consolidatedPreselected: dataEdit.consolidatedPreselected,
      consolidatedResourceAvailable: dataEdit.consolidatedResourceAvailable,
      consolidatedGranted: dataEdit.consolidatedGranted,
      consolidatedLegalized: dataEdit.consolidatedLegalized,
      consolidatedFinancialReturns: 40048000,
      ResourcePrioritization: [
        {
          id: info.idResourcePrioritization,
          place: dataEdit.places,
        },
      ],
    };

    setMessage({
      title: "Guardar",
      description: "¿Está segur@ de guardar la informacion?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateInfo(body);
      },
      onClose: () => setMessage({ show: false }),
      background: true,
    });
  });
  const handleCancel = () => {
    setMessage({
      title: "Cancelar edición activo",
      description: "¿Esta segur@ de cancelar la edición del activo?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
  };

  const setInfo = async (data) => {
    setDisponible(
      Number(data.consolidatedResourceAvailable) -
        Number(data.consolidatedGranted)
    );
    setPorParticipacon(
      Math.round(
        (data.consolidatedGranted / data.consolidatedResourceAvailable) * 100
      )
    );
  };

  useEffect(() => {
    setInfo(info);
  }, []);

  return (
    <Fragment>
      <FormComponent id="createItemsForm" action={onSubmit}>
        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <InputComponent
              idInput=""
              label={<>Comuna o corregimiento</>}
              typeInput="string"
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
              value={info.commune}
            />
            <Controller
              control={control}
              name={"consolidatedPreselected"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"consolidatedPreselected"}
                    className="input-basic medium"
                    typeInput="number"
                    label="Nro de preseleccionados"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    maxLength={9}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name={"places"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"places"}
                    className="input-basic medium"
                    typeInput="number"
                    label="Cupos"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    maxLength={9}
                    {...field}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name={"consolidatedResourceAvailable"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"consolidatedResourceAvailable"}
                    className="input-basic medium"
                    typeInput="text"
                    label="Recurso disponible"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </section>

        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <Controller
              control={control}
              name={"consolidatedGranted"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"consolidatedGranted"}
                    className="input-basic medium"
                    typeInput="text"
                    label="Otorgado"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    {...field}
                  />
                );
              }}
            />
            <InputComponent
              idInput=""
              label={<>Disponible</>}
              typeInput="text"
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
              value={info.Available}
            />
            <InputComponent
              idInput=""
              label={<>%Participacion</>}
              typeInput="text"
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
              value={String(info.porcentParticipacion) + "%"}
            />
            <Controller
              control={control}
              name={"consolidatedLegalized"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"consolidatedLegalized"}
                    className="input-basic medium"
                    typeInput="text"
                    label="No. Legalizados"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    maxLength={9}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </section>
        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <Controller
              control={control}
              name={"consolidatedFinancialReturns"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"consolidatedFinancialReturns"}
                    className="input-basic medium"
                    typeInput="text"
                    label="Rendimientos financieros"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </section>
        <div
          style={{
            height: "1px",
            margin: "32px 20px 0",
            backgroundColor: "#e0e0e0",
          }}
        ></div>
        <div className="button-save-container-display mr-24px">
          <ButtonComponent
            value="Cancelar"
            className="button-clean bold"
            type="button"
            action={handleCancel}
          />
          <ButtonComponent
            value="Guardar"
            className={`button-save big`}
            type="submit"
          />
        </div>
      </FormComponent>
    </Fragment>
  );
};

export default React.memo(Controlreporteditconsolidation);
