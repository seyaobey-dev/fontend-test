import { useContext } from "react";
import { QueryBuilderDataContext } from "./query-builder-data-context";

/**
 * exposes the context as a reusable custom hook
 */
export const useQueryBuilderData = () => useContext(QueryBuilderDataContext);