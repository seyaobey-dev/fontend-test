import { useContext } from "react";
import { InsertUpdateContext } from "./insert-update-context";

export const useInsertUpdate = () => useContext(InsertUpdateContext);