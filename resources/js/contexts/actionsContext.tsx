import { createContext } from "react";
import { StoreActions } from "../store";

const actionsContext = createContext<StoreActions | null>(null);

export default actionsContext;