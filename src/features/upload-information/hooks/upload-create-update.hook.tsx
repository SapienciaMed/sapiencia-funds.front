import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {IUploadInformation, IWorker} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import useFundsService from "../../../common/hooks/upload-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {filterUploadInformationSchema} from "../../../common/schemas/upload-information";
//import { filtermasterActivity } from "../../../common/schemas/master-schema";

export default function useCreateUploadHook() {
    // Context
    const { setMessage } = useContext(AppContext);
    //states
    const [showTable, setshowTable] = useState(false);
    const [activeWorkerList, setActiveWorkerList] = useState([]);
    const [workerInfo, setWorkerInfo] = useState([]);
    //ref
    const tableComponentRef = useRef(null);
    //react-router-dom
    const navigate = useNavigate();
    //Servicios
    //const {getWorkers} = useFundsService();


    
    // const getWorkersActive = () => {
    //   getWorkers()
    //     .then((response: ApiResponse<IWorker[]>) => {
    //       if (response && response?.operation?.code === EResponseCodes.OK) {
    //         setWorkerInfo(response.data);
    //         setActiveWorkerList(
    //           response.data.map((item) => {
    //             const list = {
    //               name: `${
    //                 item.numberDocument +
    //                 " - " +
    //                 item.firstName +
    //                 " " +
    //                 item.surname
    //               }`,
    //               value: item.id,
    //             };
    //             return list;
    //           })
    //         );
    //       }
    //     })
    //     .catch((err) => {});
    // };

    // useEffect(() => {
    //   getWorkersActive();
    // }, []);
    

    const resolver = useYupValidationResolver(filterUploadInformationSchema);
    const { register, handleSubmit, formState, control, watch } =
      useForm<IUploadInformation>({ resolver });


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
    //tableColumns,
    //tableActions,
    activeWorkerList
  };
}

