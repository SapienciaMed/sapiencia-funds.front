import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { IAuthorization } from "../interfaces/auth.interfaces";
import { IMessage } from "../interfaces/global.interface";
import {IVotingResultGrid} from "../interfaces/voting.interfaces"

interface IAppContext {
  authorization: IAuthorization;
  setAuthorization: Dispatch<SetStateAction<IAuthorization>>;
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
  validateActionAccess: (indicator: string) => boolean;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  disabledFields: boolean;
  setDisabledFields: Dispatch<SetStateAction<boolean>>;
  dataGrid: Array<IVotingResultGrid>;
  setDataGrid: Dispatch<SetStateAction<Array<IVotingResultGrid>>>;
}
interface IProps {
  children: ReactElement | ReactElement[];
}

export const AppContext = createContext<IAppContext>({
  authorization: {} as IAuthorization,
  setAuthorization: () => {},
  message: {} as IMessage,
  setMessage: () => {},
  validateActionAccess: () => true,
  step: {} as number,
  setStep: () => {},
  disabledFields: {} as boolean,
  setDisabledFields: () => {},
  dataGrid: {} as Array<IVotingResultGrid>,
  setDataGrid: () => {},
});

export function AppContextProvider({ children }: IProps) {
  // States
  const [message, setMessage] = useState<IMessage>({} as IMessage);
  const [authorization, setAuthorization] = useState<IAuthorization>(
    {} as IAuthorization
  );

  const [step, setStep] = useState<number>(0);
  const [disabledFields, setDisabledFields] = useState<boolean>(false);
  const [dataGrid, setDataGrid] = useState(Array<IVotingResultGrid>);

  // Metodo que verifica si el usuario posee permisos sobre un accion
  function validateActionAccess(indicator: string): boolean {
    return authorization.allowedActions?.findIndex((i) => i === indicator) >= 0;
  }

  const values = useMemo<IAppContext>(() => {
    return {
      authorization,
      setAuthorization,
      message,
      setMessage,
      validateActionAccess,
      step,
      setStep,
      disabledFields,
      setDisabledFields,
      setDataGrid,
      dataGrid,
    };
  }, [
    message,
    setMessage,
    authorization,
    setAuthorization,
    step,
    setStep,
    disabledFields,
    setDisabledFields,
    dataGrid,
  ]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
