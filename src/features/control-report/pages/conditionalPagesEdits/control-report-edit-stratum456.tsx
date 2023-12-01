import React, { Fragment, useContext, useEffect, useState } from "react";
import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../../common/utils/api-response";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { AppContext } from "../../../../common/contexts/app.context";
import { urlApiFunds } from "../../../../common/utils/base-url";
import useCrudService from "../../../../common/hooks/crud-service.hook";

export const controlEditStratum456 = yup.object({
  consolidatedPreselected: yup.number().optional(),
  places: yup.number().optional(),
  consolidatedResourceAvailable: yup.number().optional(),
  consolidatedGranted: yup.number().optional(),
  consolidatedLegalized: yup.number().optional(),
  consolidatedFinancialReturns: yup.number().optional(),
});
const ControlreporteditStratum456 = (data) => {
  console.log(data);
  const resolver = useYupValidationResolver(controlEditStratum456);
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
      resourceAvailable: null,
      granted: null,
      legalized: null,
      porPorcent: null,
      Avaible: null,
    },
  });

  const handleCancel = () => {
    setMessage({
      title: "Cancelar edición activo",
      description: "¿Esta segur@ de cancelar la edición",
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

  const info = data.data;

  useEffect(() => {
    setValue("legalized", info.legalized);
    setValue("resourceAvailable", info.resourceAvailable);
    setValue("granted", info.granted);
    setValue(
      "porPorcent",
      Math.round((info.granted / info.resourceAvailable) * 100) + "%"
    );
    setValue("Avaible", info.resourceAvailable - info.granted);
  }, []);

  const updateInfo = async (data) => {
    try {
      const endpoint = `/api/v1/controlSelect/updateEstrato456`;
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
      resourceAvailable: dataEdit.resourceAvailable,
      granted: dataEdit.granted,
      legalized: dataEdit.legalized,
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
  return (
    <Fragment>
      <FormComponent id="createItemsForm" action={onSubmit}>
        <section>
          <div className="grid-form-3-container gap-25 mt-24px">
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
              name={"resourceAvailable"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"resourceAvailable"}
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
            <Controller
              control={control}
              name={"granted"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"granted"}
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
          </div>
        </section>
        <section>
          <div className="grid-form-3-container gap-25 mt-24px">
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
              name={"legalized"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"legalized"}
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

export default React.memo(ControlreporteditStratum456);
