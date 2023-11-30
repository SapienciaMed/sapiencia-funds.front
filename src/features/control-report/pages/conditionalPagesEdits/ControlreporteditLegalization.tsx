import React, { Fragment, useContext, useEffect } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { Controller, useForm } from "react-hook-form";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { controlEditConsolidation } from "./control-report-edit-consolidation";
import { AppContext } from "../../../../common/contexts/app.context";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { urlApiFunds } from "../../../../common/utils/base-url";
import useCrudService from "../../../../common/hooks/crud-service.hook";
const ControlreporteditLegalization = (data) => {
  const info = data.data;

  console.log(info);
  const resolver = useYupValidationResolver(controlEditConsolidation);
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
      Preselected: null,
      Granted: null,
      Legalized: null,
      places: null,
      Availableresources: null,
    },
  });

  const updateInfo = async (data) => {
    try {
      const endpoint = `/api/v1/controlSelect/updateInfoLegalization`;
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
  const { setMessage } = useContext(AppContext);
  const onSubmit = handleSubmit(async (dataEdit: any) => {
    console.log(dataEdit);
    const body = {
      id: info.id,
      Preselected: dataEdit.Preselected,
      Granted: dataEdit.Granted,
      Legalized: dataEdit.Legalized,
      places: dataEdit.places,
      Availableresources: dataEdit.Availableresources,
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

  useEffect(() => {
    setValue("Preselected", info.Preselected);
    setValue("places", info.places);
    setValue("Legalized", info.Legalized);
    setValue("Granted", info.Granted);
    setValue("Availableresources", info.Availableresources);

    let Avaible = Number(info.Availableresources) - Number(info.Granted);
    setValue("Avaible", Avaible);

    let porParticipacion =
      Math.round(
        (Number(info.Granted) / Number(info.Availableresources)) * 100
      ) + "%";

    setValue("porParticipacion", porParticipacion);
  }, []);
  return (
    <Fragment>
      <FormComponent id="createItemsForm" action={onSubmit}>
        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <InputComponent
              idInput=""
              label={<>Programa fondo linea</>}
              typeInput="string"
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
              value={info.program}
            />

            <Controller
              control={control}
              name={"Preselected"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"Preselected"}
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
              name={"Availableresources"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"Availableresources"}
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
              name={"Granted"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"Granted"}
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
              name={"porParticipacion"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"porParticipacion"}
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
              name={"Legalized"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={"Legalized"}
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

export default ControlreporteditLegalization;
