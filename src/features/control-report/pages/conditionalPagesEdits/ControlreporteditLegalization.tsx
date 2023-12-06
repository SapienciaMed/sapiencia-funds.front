import React, { Fragment, useContext, useEffect, useState } from "react";
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
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

interface IProps {
  onEdit: () => void;
  data: any; // Usar el tipado
  onUpdateTotals: () => void;
}
const ControlreporteditLegalization = ({
  onEdit,
  data,
  onUpdateTotals,
}: IProps): JSX.Element => {
  const info = data;
  const resolver = useYupValidationResolver(controlEditConsolidation);
  const { put } = useCrudService(urlApiFunds);
  const [color, setColor] = useState(null);
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
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
          onEdit();
          onUpdateTotals();
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
      description: "¿Estás segur@ de guardar la información?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage({ show: false });
        updateInfo(body);
      },
      onClose: () => setMessage({ show: false }),
      onCancel: () => {
        setMessage({
          show: true,
          title: "Editar ítem",
          onOk() {
            setMessage({});
          },
          background: true,
          description: (
            <ControlreporteditLegalization
              onEdit={onEdit}
              data={data}
              onUpdateTotals={onUpdateTotals}
            />
          ),
          size: "items",
          items: true,
        });
      },
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
        setMessage((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
        setMessage({
          show: true,
          title: "Editar ítem",
          onOk() {
            setMessage({});
          },
          background: true,
          description: (
            <ControlreporteditLegalization
              onEdit={onEdit}
              data={data}
              onUpdateTotals={onUpdateTotals}
            />
          ),
          size: "items",
          items: true,
        });
      },
      onClose: () => setMessage({}),
    });
  };

  useEffect(() => {
    setValue("Preselected", info.Preselected);
    setValue("places", info.places);
    setValue("Legalized", info.Legalized);
    setValue("Granted", info.Granted);
    setValue("Availableresources", info.Availableresources);

    let Avaible = Number(info.Availableresources) - Number(info.Granted);
    setValue("Avaible", formaterNumberToCurrency(Avaible));

    let porParticipacion = Math.round(
      (Number(info.Granted) / Number(info.Availableresources)) * 100
    );

    if (
      isNaN(porParticipacion) ||
      porParticipacion == Infinity ||
      porParticipacion == undefined
    ) {
      porParticipacion = 0;
    }

    if (porParticipacion >= 90 && porParticipacion <= 98) {
      setColor("text-yellow");
    } else if (porParticipacion > 98 && porParticipacion <= 100) {
      setColor("text-red");
    }

    setValue("porParticipacion", porParticipacion + "%");
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
                  <InputNumberComponent
                    idInput={"Availableresources"}
                    className="inputNumber-basic medium"
                    label="Recurso disponible"
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

        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <Controller
              control={control}
              name={"Granted"}
              render={({ field }) => {
                return (
                  <InputNumberComponent
                    idInput={"Granted"}
                    className="inputNumber-basic medium"
                    label="Otorgado"
                    classNameLabel="text-black big text-with-colons"
                    errors={errors}
                    control={control}
                    prefix="$"
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
                    className={`input-basic medium ${color}`}
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
        <div className="button-save-container-display-items margin-right0 mr-24px">
          <ButtonComponent
            value="Cancelar"
            className="button-clean"
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
