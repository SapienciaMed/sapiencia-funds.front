import React, { Fragment, useContext, useEffect } from "react";
import { useForm, useFormState, useWatch } from "react-hook-form";
import useCreateUploadHook from "../hooks/upload-create-update.hook";
import { ButtonComponent } from "../../../common/components/Form";
import { UploadComponent } from "../../../common/components/Form";
import { FormComponent, SelectComponent, } from "../../../common/components/Form";
//borrar
import useSearchUploadHook from "../hooks/search-upload-information.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useListData from "../hooks/list.hook";
import BasicTableComponent from "../../../common/components/basic-table.component";
import {ITableAction,ITableElement,} from "../../../common/interfaces/table.interfaces";
import { IUser } from "../../../common/interfaces/auth.interfaces";


const UploadCreatePage = (): React.JSX.Element => {
  const {
    control,
    formState,
    register,
    //setValue,
    tableComponentRef,
    showTable,
    //tableActions,
    //setShowTable,
    onSubmit,
    redirectCancel,
    setFilesUploadData,
    uploadFiles,
    activeUserList,
    dataGridEmails,
    setUploadedFileName,
  } = useCreateUploadHook();
  const { errors, isValid } = formState;

  const { commune, validity, information } = useSearchUploadHook()

  const { setMessage } = useContext(AppContext);

  const handleFileNameChange = (fileName) => {
    setUploadedFileName(fileName);
  };

  const {vigencias} = useListData();

  const tableColumns: ITableElement<IUser>[] = [
    {
      fieldName: "Email",
      header: "Correo electronico",
    }
  ];

  const tableActions: ITableAction<IUser>[] = [
    {
      icon: "Delete",
      onClick: (row) => {
        console.log("row ", row);
          setMessage({
            show: true,
            title: "Eliminar registro",
            description: "Estás segur@ de eliminar este registro?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
              if (dataGridEmails.find((obj) => obj.email == row.names)) {
                const position = dataGridEmails.findIndex(
                  (obj) => obj.email === row.names
                );
                dataGridEmails.splice(position, 1);
                setMessage({})
              }
            },
            background: true,
          });
      },
    },
  ];

  return (
    <Fragment>
      <div className="main-page">
        <div className="card-table">
          <div className="title-area">
            <label className="text-black extra-large bold">
              Cargar archivo
            </label>
          </div>

          <div className="container-sections-forms">

            <FormComponent
              id="uploadCreate"
              className="form-signIn"
              action={onSubmit}
            >
              <div className="grid-form-4-container gap-25">

                <SelectComponent
                  idInput={"commune"}
                  control={control}
                  errors={errors}
                  data={commune}
                  label={
                    <>
                      Comuna y/o corregimiento <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"validity"}
                  control={control}
                  errors={errors}
                  data={vigencias}
                  label={
                    <>
                      Vigencia <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"information"}
                  control={control}
                  errors={errors}
                  data={information}
                  label={
                    <>
                      información <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                //disabled={action === "edit" ? true : false} 
                />

              </div>
            </FormComponent>
          </div>


          <div>
            <br />
            <h3>Si tienes más de un documento, se deben unir en un solo archivo para ser cargados.</h3>
          </div>

          {/* Cargar documento PDF */}
          <div className="container-sections-forms" >
            <UploadComponent
              id="fileList"
              setFilesData={setFilesUploadData}
              filesAccept="application/pdf"
              maxSize={1048576}
              dropboxMessage="Arrastra y suelta el archivo aquí"
              multiple={false}
              onFileChange={handleFileNameChange} 
            />
          </div>

          {/* Seleccionar a usuario para notificar*/}
          <div className="title-area">
            <label className="text-black extra-large medium">
              Usuarios a notificar
            </label>
          </div>

          <div className="container-sections-forms">
            <FormComponent
              id="uploadCreate"
              className="form-signIn"
              action={onSubmit}
            >
              <div className="grid-form-3-container gap-25">
                <SelectComponent
                  idInput={"codEmployment"}
                  control={control}
                  errors={errors}
                  data={activeUserList}
                  label={<>Notificar a</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                />
              </div>
            </FormComponent>
          </div>
          
          <div
              // style={
              //   dataGridEmails.length > 0 ? { display: "block" } : { display: "none" }
              // }
            >
              <div className="container-form-grid mt-24px">
                <div className="container-form padding-form">
                  <BasicTableComponent
                    ref={tableComponentRef}
                    data={dataGridEmails}
                    columns={tableColumns}
                    actions={tableActions}
                    titleMessageModalNoResult="Registro no existente"
                    isShowModal={true}
                  />
                </div>
              </div>
              </div>
          <div className="button-save-container-display m-top-20">
            <ButtonComponent
              form="uploadCreate"
              value={"Cancelar"}
              className="button-clean medium"
              type="button"
              action={redirectCancel}
            />
            <ButtonComponent
              form="uploadCreate"
              value={"Guardar"}
              className="button-save disabled-black big"
            //disabled={!name}
            />
          </div>

        </div>
      </div>

    </Fragment>
    
  );
};

export default React.memo(UploadCreatePage);
