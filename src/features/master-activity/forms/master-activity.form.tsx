import React, { useContext, useEffect, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import { createmasterActivity } from "../../../common/schemas/master-schema";
import useMasterActivityApi from "../hooks/master-activity-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";

interface IProps {
  initData?: IMasterActivity;
}

function MasterActivityForm({ initData }: IProps): React.JSX.Element {
  // Servicios
  const { createMasterActivity, editMasterActivity } = useMasterActivityApi();
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const form = useForm<IMasterActivity>({
    mode: "all",
    resolver: useYupValidationResolver(createmasterActivity),
  });

  // States
  const [sending, setSending] = useState<boolean>(false);

  // Effect que inicialicia los datos iniciales
  useEffect(() => {
    console.log(initData);

    if (initData) {
      form.setValue("name", initData.name);
      form.setValue("description", initData.description);
      form.setValue("totalValue", initData.totalValue);
      form.setValue("codProgramCode", initData.codProgramCode);
    }
  }, [initData]);

  // Metodo que ejecuta el submit del formulario
  function onSubmitForm(data: IMasterActivity) {
    setMessage({
      show: true,
      title: "Guardar actividad maestra",
      description: "¿Esta seguro de crear esta actividad maestra?",
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        setSending(true);

        if (initData) {
          editMasterActivity(initData.id, data)
            .then((res) => {
              setMessage({
                show: true,
                background: true,
                title: "Actividad Mestro",
                description: res.operation.message,
                okTitle: "Aceptar",
                onOk() {
                  if (res.operation.code == EResponseCodes.OK) {
                    navigate("/fondos/maestro/consultar");
                    setMessage({});
                  } else {
                    setMessage({});
                  }
                },
              });
            })
            .finally(() => setSending(false));
        } else {
          createMasterActivity(data)
            .then((res) => {
              setMessage({
                show: true,
                background: true,
                title: "Actividad Mestro",
                description: res.operation.message,
                okTitle: "Aceptar",
                onOk() {
                  if (res.operation.code == EResponseCodes.OK) {
                    navigate("/fondos/maestro/consultar");
                    setMessage({});
                  } else {
                    setMessage({});
                  }
                },
              });
            })
            .finally(() => setSending(false));
        }
      },
      background: true,
    });
  }

  return (
    <>
      <FormComponent
        id="createMaster"
        className="form-signIn"
        action={() => {}}
      >
        <div className="container-sections-forms">
          <div className="title-area">
            <label className="text-black extra-large bold">
              Maestro Actividad
            </label>
          </div>

          <div>
            <div className="grid-form-2-container gap-25">
              <InputComponent
                register={form.register}
                idInput="name"
                className="input-basic medium"
                typeInput="text"
                label="Actividad"
                classNameLabel="text-black big text-required"
                errors={form.formState.errors}
              />

              <InputComponent
                register={form.register}
                idInput="totalValue"
                className="input-basic medium"
                typeInput="text"
                label="Valor Total"
                classNameLabel="text-black big text-required"
                errors={form.formState.errors}
              />

              <SelectComponent
                idInput={"codProgramCode"}
                control={form.control}
                errors={form.formState.errors}
                data={[
                  {
                    name: "test",
                    value: "1",
                  },
                ]}
                label="Programa"
                className="select-basic medium"
                classNameLabel="text-black big bold"
                filter={true}
                placeholder="Seleccione."
              />

              <InputComponent
                register={form.register}
                idInput="description"
                className="input-basic medium"
                typeInput="text"
                label="Descripcion"
                classNameLabel="text-black big text-required"
                errors={form.formState.errors}
              />
            </div>
          </div>
        </div>
      </FormComponent>
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={() => {}}
        />
        <ButtonComponent
          //   form="createMaster"
          value="Guardar"
          //   type="submit"
          className="button-save large hover-three disabled-black"
          disabled={sending}
          action={() => onSubmitForm(form.getValues())}
        />
      </div>
    </>
  );
}

export default React.memo(MasterActivityForm);
