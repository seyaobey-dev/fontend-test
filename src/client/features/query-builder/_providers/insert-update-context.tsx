import { createContext } from "react";
import { CombinatorOperation, GroupItem } from "../../../../types";

export type HandleFieldValueChangeFunction = (props: { 
    groupId: string, 
    fieldId: string, 
    key: "fieldName" | "operator" | "value"; 
    value: string 
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

export const InsertUpdateContext = createContext<{ 
    data: GroupItem[]; 
    handleFieldValueChange: HandleFieldValueChangeFunction;
    handleChangeCombinator: HandleChangeCombinatorFunction;
    handleAppendField: HandleAppendFieldFunction;
    handleDeleteField: HandleDeleteFieldFunction;
}>({} as never);
