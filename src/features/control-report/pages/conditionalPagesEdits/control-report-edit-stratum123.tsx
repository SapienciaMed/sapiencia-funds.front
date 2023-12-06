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
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { AppContext } from "../../../../common/contexts/app.context";
import { urlApiFunds } from "../../../../common/utils/base-url";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";

export const controlEditStratum123 = yup.object({
  consolidatedPreselected: yup.number().optional(),
  places: yup.number().optional(),
  consolidatedResourceAvailable: yup.number().optional(),
  consolidatedGranted: yup.number().optional(),
  consolidatedLegalized: yup.number().optional(),
  consolidatedFinancialReturns: yup.number().optional(),
});

interface IProps {
  onEdit: () => void;
  data: any; // Usar el tipado
  onUpdateTotals: () => void;
}
const ControlreporteditStratum123 = ({
  onEdit,
  data,
  onUpdateTotals,
}: IProps): JSX.Element => {
  const resolver = useYupValidationResolver(controlEditStratum123);
  const { setMessage } = useContext(AppContext);
  const { put } = useCrudService(urlApiFunds);
  const [color, setColor] = useState(null);
  const {
    handleSubmit,
    register,
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
            <ControlreporteditStratum123
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
  const info = data;

  useEffect(() => {
    setValue("legalized", info.legalized);
    setValue("resourceAvailable", info.resourceAvailable);
    setValue("granted", info.granted);
    let porParticipacion = Math.round(
      (Number(info.granted) / Number(info.resourceAvailable)) * 100
    );
    if (
      isNaN(porParticipacion) ||
      porParticipacion == Infinity ||
      porParticipacion == undefined
    ) {
      porParticipacion = 0;
    }
    if (porParticipacion >= 90 && porParticipacion <= 98) {
      setColor("text-orange");
    } else if (porParticipacion > 98 && porParticipacion <= 100) {
      setColor("text-red");
    }
    setValue("porPorcent", porParticipacion + "%");
    setValue(
      "Avaible",
      formaterNumberToCurrency(info.resourceAvailable - info.granted)
    );
  }, []);

  const updateInfo = async (data) => {
    try {
      const endpoint = `/api/v1/controlSelect/updateStratum123`;
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

  const onSubmit = handleSubmit(async (dataEdit: any) => {
    const body = {
      id: info.id,
      resourceAvailable: dataEdit.resourceAvailable,
      granted: dataEdit.granted,
      legalized: dataEdit.legalized,
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
      onCancel: () => {
        setMessage({
          show: true,
          title: "Editar ítem",
          onOk() {
            setMessage({});
          },
          background: true,
          description: (
            <ControlreporteditStratum123
              onEdit={onEdit}
              data={data}
              onUpdateTotals={onUpdateTotals}
            />
          ),
          size: "items",
          items: true,
        });
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
                  <InputNumberComponent
                    idInput={"resourceAvailable"}
                    className="inputNumber-basic medium"
                    control={control}
                    label="Recurso disponible"
                    classNameLabel="text-black big text-with-colons"
                    errors={errors}
                    placeholder={""}
                    prefix="$"
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
                  <InputNumberComponent
                    idInput={"granted"}
                    className="inputNumber-basic medium"
                    control={control}
                    label="Otorgado"
                    classNameLabel="text-black big text-with-colons"
                    errors={errors}
                    placeholder={""}
                    prefix="$"
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

export default React.memo(ControlreporteditStratum123);
