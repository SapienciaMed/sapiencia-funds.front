import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IMasterActivityFilter,
  IMasterActivity,
} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createmasterActivity } from "../../../common/schemas/master-schema";
import useMasterActivityApi from "./master-activity-api.hook";

export default function useCreateMasterHook() {
    // Context
    const { setMessage } = useContext(AppContext);
  
    //states
    const [showTable, setshowTable] = useState(false);
    const [typeProgram, setTypeProgram] = useState([]);
  
    //ref
    const tableComponentRef = useRef(null);

    // Servicios
    const { createMasterActivity, editMasterActivity, getProgramTypes} = useMasterActivityApi();

      // carga Tipo de Porgrama
      useEffect(() => {
        ProgramType();
      }, []);
    
      //Effect que inicializa el Tipo de Porgrama
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

    const resolver = useYupValidationResolver(createmasterActivity);

    const { register, handleSubmit, formState, control, watch } =
      useForm<IMasterActivityFilter>({resolver});

      const formValues = watch();

    const onSubmit = handleSubmit(async (data: IMasterActivity) => {
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
        formValues,
        showTable,
        typeProgram,
        tableComponentRef,

      };


}