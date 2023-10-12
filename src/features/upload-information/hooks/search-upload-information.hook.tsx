import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {IUploadInformation} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import useUploadService from "../../../common/hooks/upload-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {filterUploadInformationSchema} from "../../../common/schemas/upload-information";
import {
  DataItem,
  ResponsiveTable,
} from "../../../common/components/Form/table-detail.component";
import { filtermasterActivity } from "../../../common/schemas/master-schema";

export default function useSearchUploadHook() {
    // Context
    const { setMessage } = useContext(AppContext);
    //custom hooks
    const { getUpload } = useUploadService();
    //states
    const [showTable, setshowTable] = useState(false);
    const [commune, setcommune] = useState<IDropdownProps[]>([]);
    const [validity, setvalidity] = useState<IDropdownProps[]>([]);
    const [information, setinformation] = useState<IDropdownProps[]>([]);
    //ref
    const tableComponentRef = useRef(null);
    //react-router-dom
    const navigate = useNavigate();


  // carga combos
  useEffect(() => {
    loadDropdown();
  }, []);

  //functions
  const loadDropdown = async () => {
    //charges
    const { data, operation } = await getUpload();
    if (operation.code === EResponseCodes.OK) {
      const communeList = data.map((item) => {
        return {
          name: item.commune,
          value: item.commune,
        };
      });
      const validityList = data.map((item) => {
        return {
          name: item.validity,
          value: item.validity,
        };
      });
      const informationList = data.map((item) => {
        return {
          name: item.information,
          value: item.information,
        };
      });
      setcommune(communeList);
      setvalidity(validityList);
      setinformation(informationList);
    } else {
      setcommune([]);
      setvalidity([]);
    }
  };

  
    const resolver = useYupValidationResolver(filterUploadInformationSchema);

    const { register, handleSubmit, formState, control, watch } =
      useForm<IUploadInformation>({ resolver });



      const showDownloadInformation = (row: IUploadInformation) => {
        if (row) {
          const InformationValue: DataItem[] = [
           
            {
              title: <span className="text-left">Nombre del archivo</span>,
              value: row.fileName,
            },
            {
              title: <span className="text-left">Fecha</span>,
              value: row.commune,
            },
          ];
    
          return setMessage({
            title: "Descargar archivo",
            description: (
              <div className="">
                <>
                  <ResponsiveTable data={InformationValue} />
                </>
              </div>
              ),
            show: true,
            OkTitle: "Aceptar",
            onOk: () => {
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
            return <>{row.information}</>;
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

