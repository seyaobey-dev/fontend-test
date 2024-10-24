import { createContext } from "react";
import { CombinatorOperation, CurrencyValue, FieldTypeMapping, GroupQuery } from "../../../../types";

/**
 * context for the query builder data, exposed to the whole app
 */

export type HandleFieldValueChangeFunction = (props: { 
    groupId: string, 
    fieldId: string, 
    key: "fieldName" | "operator" | "value"; 
    value: CurrencyValue | string | number
}) => void;

export type HandleChangeCombinatorFunction = (props: {
    groupId: string;
    value: CombinatorOperation;
}) => void;

export type HandleAppendFieldFunction = (props: {
    groupId: string;
}) => void;

export type HandleDeleteFieldFunction = (props: {
    groupId: string;
    fieldId: string;
}) => void;

export type HandleAppendGroupFunction = (props: {
    groupId: string;
}) => void;

export type HandleDeleteGroupFunction = (props: {
    groupId: string;
}) => void;

export const QueryBuilderDataContext = createContext<{ 
    data: GroupQuery[]; 
    fieldsMapping: FieldTypeMapping;
    handleFieldValueChange: HandleFieldValueChangeFunction;
    handleChangeCombinator: HandleChangeCombinatorFunction;
    handleAppendField: HandleAppendFieldFunction;
    handleDeleteField: HandleDeleteFieldFunction;
    handleAppendGroup: HandleAppendGroupFunction;
    handleDeleteGroup: HandleDeleteGroupFunction;
}>({} as never);
