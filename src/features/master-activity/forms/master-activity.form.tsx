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
  const { createMasterActivity, editMasterActivity, getProgramTypes} = useMasterActivityApi();
  const navigate = useNavigate();
  const { setMessage } = useContext(AppContext);
  const form = useForm<IMasterActivity>({
    mode: "all",
    resolver: useYupValidationResolver(createmasterActivity),
  });

  // States
  const [sending, setSending] = useState<boolean>(false);
  const [typeProgram, setTypeProgram] = useState([]);

  //Effect que inicializa el Tipo de Porgrama
    
  // carga Tipo de Porgrama
    useEffect(() => {
      ProgramType();
    }, []);
  
    //functions
    const ProgramType = async () => {
      //Tipo de Porgrama
      const { data, operation } = await getProgramTypes();
      if (operation.code === EResponseCodes.OK) {
        const programList = data.map((item) => {
          return {
            name: item.name,
            value: item.id,
          };
        });
        setTypeProgram(programList);
      } else {
        setTypeProgram([]);
      }
    };

  // Effect que inicialicia los datos iniciales
  useEffect(() => {

    if (initData) {
      form.setValue("name", initData.name);
      form.setValue("description", initData.description);
      form.setValue("totalValue", initData.totalValue);
      form.setValue("typesProgram", initData.typesProgram);
      form.setValue("codProgramCode", initData.codProgramCode);
    }
  }, [initData]);

  // Metodo que ejecuta el submit del formulario
  function onSubmitForm(data: IMasterActivity) {
    setMessage({
      show: true,
      title: "Guardar cambios",
      description: `¿Estás segur@ de 
      guardar los cambios?`,
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

// Metodo que ejecuta el redirectCancel del formulario
  const redirectCancel = () => {
    setMessage({
      title: "Cancelar",
      description: `¿Estás segur@ que deseas 
      cancelar los cambios?`,
      show: true,
      okTitle: "Aceptar",
      onOk: () => {
        navigate("../consultar");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  };

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
            <div className="grid-form-4-container gap-25">
              <InputComponent
                register={form.register}
                idInput="name"
                className="input-basic medium input-disabled"
                typeInput="text"
                label="Actividad"
                classNameLabel="text-black big text-required"
                errors={form.formState.errors}
                disabled={initData ? true : false} 
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
                data={typeProgram}
                label="Programa"
                className="select-basic medium select-disabled-list"
                classNameLabel="text-black big bold"
                filter={true}
                placeholder="Seleccione."
                disabled={initData ? true : false} 
              />

              <InputComponent
                register={form.register}
                idInput="description"
                className="input-basic medium input-disabled"
                typeInput="text"
                label="Descripcion"
                classNameLabel="text-black big text-required"
                errors={form.formState.errors}
                disabled={initData ? true : false} 
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
          action={redirectCancel}
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
