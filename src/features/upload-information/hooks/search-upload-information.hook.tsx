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
//import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {filterUploadInformationSchema} from "../../../common/schemas/upload-information";
//import { filtermasterActivity } from "../../../common/schemas/master-schema";

export default function useSearchUploadHook() {
    // Context
    const { setMessage } = useContext(AppContext);
    //states
    const [showTable, setshowTable] = useState(false);
    //ref
    const tableComponentRef = useRef(null);
    //react-router-dom
    const navigate = useNavigate();

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
  };
}

