import { createContext } from "react";
import { AppStorage } from "../plugins/storage";

const storageContext = createContext<AppStorage | null>(null);

export default storageContext;