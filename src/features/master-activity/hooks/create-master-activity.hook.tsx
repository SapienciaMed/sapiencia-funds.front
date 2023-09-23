import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
//import { createLicenceSchema } from "../../../common/schemas";
//import {
  //ILicence,
  //ILicenceType,
//} from "../../../common/interfaces/payroll.interfaces";
import { useContext, useEffect, useState } from "react";
//import useLicencesService from "../../../common/hooks/licences-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import {
  calculateBusinessDays,
  calculateDifferenceDays,
} from "../../../common/utils/helpers";

export default function useCreateMasterActivity() {
    

}