import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { AppContext } from "../../../../common/contexts/app.context";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../../common/utils/base-url";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const controlEditConsolidation = yup.object({
  consolidatedPreselected: yup.number().optional(),
  places: yup.number().optional(),
  consolidatedResourceAvailable: yup.number().optional(),
  consolidatedGranted: yup.number().optional(),
  consolidatedLegalized: yup.number().optional(),
  consolidatedFinancialReturns: yup.number().optional(),
});

const Controlreporteditconsolidation = (data) => {
  const info = data.data;
  const resolver = useYupValidationResolver(controlEditConsolidation);
  const { setMessage } = useContext(AppContext);
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
    let Available =
      info.consolidatedResourceAvailable - info.consolidatedGranted;

    setValue("Avaible", formaterNumberToCurrency(Available));

    let porParticipacion =
      Math.round(
        (Number(info.consolidatedGranted) /
          Number(info.consolidatedResourceAvailable)) *
          100
      ) + "%";

    setValue("porPorcent", porParticipacion);
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
          window.location.reload();
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

  const onSubmit = handleSubmit(async (dataEdit: any) => {
    console.log(dataEdit);
    const body = {
      id: info.id,
      consolidatedPreselected: dataEdit.consolidatedPreselected,
      consolidatedResourceAvailable: dataEdit.consolidatedResourceAvailable,
      consolidatedGranted: dataEdit.consolidatedGranted,
      consolidatedLegalized: dataEdit.consolidatedLegalized,
      consolidatedFinancialReturns: dataEdit.consolidatedFinancialReturns,
      places: dataEdit.places,
    };
    setMessage({
      title: "Guardar",
      description: "¿Estás segur@ de guardar la información?",
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
      description: "¿Estas segur@ de cancelar la edición?",
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
              value={info.resourcePrioritization.communeId}
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
                  <InputNumberComponent
                    idInput={"consolidatedResourceAvailable"}
                    className="inputNumber-basic medium"
                    label="Recurso disponible"
                    errors={errors}
                    classNameLabel="text-black big text-with-colons"
                    placeholder={""}
                    control={control}
                    prefix="$"
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
                  <InputNumberComponent
                    idInput={"consolidatedGranted"}
                    className="inputNumber-basic medium"
                    label="Otorgado"
                    classNameLabel="text-black big text-with-colons"
                    errors={errors}
                    placeholder={""}
                    control={control}
                    prefix="$"
                    {...field}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name={"Avaible"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"Avaible"}
                    className="input-basic medium"
                    typeInput="text"
                    label="Disponibles"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    maxLength={9}
                    {...field}
                    disabled
                  />
                );
              }}
            />
            <Controller
              control={control}
              name={"porPorcent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"porPorcent"}
                    className="input-basic medium"
                    typeInput="text"
                    label="%Participacion"
                    register={register}
                    classNameLabel="text-black biggest text-required"
                    errors={errors}
                    placeholder={""}
                    maxLength={9}
                    {...field}
                    disabled
                  />
                );
              }}
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
                  <InputNumberComponent
                    idInput={"consolidatedFinancialReturns"}
                    className="inputNumber-basic medium"
                    label="Rendimientos financieros"
                    classNameLabel="text-black big text-with-colons"
                    errors={errors}
                    placeholder={""}
                    control={control}
                    prefix="$"
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
