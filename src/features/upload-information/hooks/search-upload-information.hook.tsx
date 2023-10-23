import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ITableAction, ITableElement, } from "../../../common/interfaces/table.interfaces";
import { IUploadInformation } from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import useUploadService from "../../../common/hooks/upload-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterUploadInformationSchema } from "../../../common/schemas/upload-information";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { DataItem, ResponsiveTable, } from "../../../common/components/Form/table-detail.component";
import { IFiles } from "../../../common/interfaces/storage.interfaces";
import { DateTime } from "luxon";


export default function useSearchUploadHook() {

  const { setMessage, authorization } = useContext(AppContext);
  const { getUpload, GetInformationFiles } = useUploadService();
  const [showTable, setshowTable] = useState(false);
  const [commune, setcommune] = useState<IDropdownProps[]>([]);
  const [validity, setvalidity] = useState<IDropdownProps[]>([]);
  const [information, setinformation] = useState<IDropdownProps[]>([]);
  const { getListByGrouper } = useGenericListService();
  const tableComponentRef = useRef(null);
  const [fileData, setFileData] = useState<IFiles[]>([]);
  const navigate = useNavigate();

  //borrar loadDropdown vigencias
  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getUpload();
    if (operation.code === EResponseCodes.OK) {
      const validityList = data.map((item) => {
        return {
          name: item.validity,
          value: item.validity,
        };
      });
      setvalidity(validityList);
    } else {
      setvalidity([]);
    }
  };


  useEffect(() => {
    getListByGrouper("COMUNA_CORREGIMIENTO").then(response => {
      if (response.operation.code === EResponseCodes.OK) {
        const data: IDropdownProps[] = response.data.map(data => {
          return { name: data.itemDescription, value: data.itemDescription }
        })
        setcommune(data);
      }
    })
    getListByGrouper("INFORMACION_COMUNA").then(response => {
      if (response.operation.code === EResponseCodes.OK) {
        const data: IDropdownProps[] = response.data.map(data => {
          return { name: data.itemDescription, value: data.itemDescription }
        })
        setinformation(data);
      }
    })
  }, []);

  const resolver = useYupValidationResolver(filterUploadInformationSchema);

  const { register, handleSubmit, formState, control, watch } =
    useForm<IUploadInformation>({ resolver });


  const loadTable = async (id: any) => {
    const { data, operation } = await GetInformationFiles(id);
    if (operation.code === EResponseCodes.OK) {
      if (data[0] === undefined) {
        setMessage({
          title: "Descarga de archivo",
          description: "El archivo no pudo ser descargado con éxito, Vuelve a intentarlo",
          show: true,
          background: true,
          OkTitle: "Aceptar"
        });
      } else {
        downloadFile(data);
      }

    } else {
      setMessage({
        title: "Ha ocurrido un problema...",
        description: operation.message,
        show: true,
        background: true,
        OkTitle: "Aceptar"
      });
    }

  }

  const downloadFile = (data: any) => {
    const authToken = localStorage.getItem("token");
    fetch(`${process.env.urlApiFunds}/api/v1/uploadInformation/files/get-file`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`,
        Accept: "application/json",
        permissions: authorization.encryptedAccess,
      },
      body: JSON.stringify({ fileName: data[0].path }),
    }).then(async response => {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data[0].name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage({
        title: "Descarga de archivo",
        description: "El archivo fue descargado con éxito ",
        show: true,
        background: true,
        OkTitle: "Aceptar"
      });
    }).catch(err => {
      setMessage({
        title: "Ha ocurrido un error...",
        description: String(err),
        show: true,
        background: true,
        OkTitle: "Aceptar",
        onOk: () => {
          setMessage({});
        }
      })
    })
  }

  const showDownloadInformation = (row: IUploadInformation) => {
    if (row) {
      const Informationname: DataItem[] = [
        {
          title: <span className="text-left"> Nombre del archivo </span>,
          value: row.fileName,
        }
      ];
      const dateTime = DateTime.fromISO(row.dateUpload);
    const formattedDateTime = dateTime.toLocaleString({
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
      const InformationValue: DataItem[] = [
        {
          title: <span className="text-left"> Fecha </span>,
          value: formattedDateTime,
        },
      ];
      return setMessage({
        title: "Descargar archivo",
        description: (
          <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <ResponsiveTable data={Informationname} />
            <ResponsiveTable data={InformationValue} />
          </div>
        </>
        ),
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          loadTable(row.id)
          navigate("../consultar");
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        cancelTitle: "Cancelar",
        background: true,
      });
    } else {
      return;
    }
  };

  const tableColumns: ITableElement<IUploadInformation>[] = [
    {
      fieldName: "row.upload.filename",
      header: "Nombre del archivo",
      renderCell: (row) => {
        return <>{row.fileName}</>;
      },
    },
    {
      fieldName: "row.upload.date",
      header: "Fecha y hora de carga",
      renderCell: (row) => {
        const dateTime = DateTime.fromISO(row.dateUpload);
        const formattedDateTime = dateTime.toLocaleString({
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        return <>{formattedDateTime}</>;
      },
    },

  ];

  const tableActions: ITableAction<IUploadInformation>[] = [
    {
      icon: "download",
      onClick: (row) => {
        showDownloadInformation(row);
      },
    },

  ];


  const redirectCreate = () => {
    navigate("../crear");
  };

  const formValues = watch();

  const onSubmit = handleSubmit(async (data: IUploadInformation) => {
    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(data);
    }
  });

  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    tableComponentRef,
    commune,
    validity,
    information,
    tableColumns,
    tableActions,
  };
}

