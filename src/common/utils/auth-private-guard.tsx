import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

const PrivateRoute = ({ element, allowedAction }) => {
  const { authorization, setMessage } = useContext(AppContext);
  const navigate = useNavigate();

  if (!authorization?.allowedActions) {
    return <div>Loading...</div>;
  }

  if (
    authorization?.allowedActions?.findIndex((i) => i == allowedAction) >= 0
  ) {
    return element;
  } else {
    setMessage({
      title: "¡Acceso no autorizado!",
      description: "Consulte con el admimistrador del sistema.",
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("/core");
        setMessage({});
      },
      cancelTitle: "Cancelar",
      background: true,
    });
    return;
  }
};

export default PrivateRoute;
