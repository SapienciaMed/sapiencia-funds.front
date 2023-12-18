import { useParams } from "react-router-dom";
import { IManagePage } from "../interface/pacc";
import TabsManageTechnical from "../components/tabs-manage-technical";
import { usePaccServices } from "./pacc-serviceshook";
import { useEffect, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";

export const useManage = () => {
  const { id, typeState } = useParams();
  const { GeBeneficiaryById } = usePaccServices(parseInt(typeState));
  const [dataManager, setDataManager] = useState<IManagePage>({
    title: "",
    beneficiaryInformationValues: {
      idCredit: "",
      document: "",
      name: "",
      contactNumber: "",
      email: "",
      program: "",
      draftsProjected: "",
      draftsPerformed: "",
      dateInput: "",
      reasonCompletion: "",
    },
    component: <></>,
  });
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    GeBeneficiaryById(id).then((response) => {
      if (response.operation.code === EResponseCodes.OK) {
        const date = new Date(response.data.dateIncome);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        setDataManager({
          title: "Consolidación del crédito",
          beneficiaryInformationValues: {
            idCredit: String(response.data.creditId),
            document: response.data.document,
            name: response.data.fullName,
            contactNumber: response.data.contactNumber,
            email: response.data.email,
            program: response.data.program,
            draftsProjected: String(response.data.countSpinProjected),
            draftsPerformed: String(response.data.countSpins),
            dateInput: `${day < 10 ? "0" + day : day}/${
              month < 10 ? "0" + month : month
            }/${year}`,
            reasonCompletion: response.data.reason,
          },
          component: (
            <TabsManageTechnical
              document={response.data.document}
              typeState={typeState}
            />
          ),
        });

        setShowSpinner(false);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      setDataManager({
        title: "",
        beneficiaryInformationValues: {
          idCredit: "",
          document: "",
          name: "",
          contactNumber: "",
          email: "",
          program: "",
          draftsProjected: "",
          draftsPerformed: "",
          dateInput: "",
          reasonCompletion: "",
        },
        component: <></>,
      });
    };
  }, []);

  return {
    dataManager,
    showSpinner,
  };
};
