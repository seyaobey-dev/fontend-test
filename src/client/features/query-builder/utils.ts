import { FieldName, FieldOperator } from "../../../types";

export const fieldOptions: {[name in FieldName]: string} = {
    amount: "Amount",
    name: "Name",
    id: "ID",
    transaction_state: "Transaction State",
    device_id: "Device ID",
    installments: "Installments",
};

export const operatorOptions: {[operator in FieldOperator]: FieldOperator} = {
    EQUAL: "EQUAL",
    NOT_EQUAL: "NOT_EQUAL",
    LESS_THAN: "LESS_THAN",
    GREATER_THAN: "GREATER_THAN",
};

export const resolveOperatorByFieldName = (fieldName: FieldName): FieldOperator[] => {
    // numeric fields
    if (["amount", "installments"].includes(fieldName)) return [ "EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"];

    // default text/enum fields
    return ["EQUAL", "NOT_EQUAL"];
}