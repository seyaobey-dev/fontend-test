import { Combinator, FieldTypeMapping } from "../types";

export const mockData: Combinator = {
    combinator: "AND",  
    conditions: [
        {
            fieldName: "name",
            operator: "EQUAL",
            value: ""
        }, 
        // {
        //     fieldName: "installments",
        //     operator: "GREATER_THAN",
        //     value: "11111"
        // },
        // {
        //     combinator: "AND",
        //     subConditions: [
        //         {
        //             fieldName: "id",
        //             operator: "EQUAL",
        //             value: "1234567890"
        //         }, 
        //         {
        //             fieldName: "amount",
        //             operator: "LESS_THAN",
        //             value: { amount: 100, currency: "USD" }
        //         },
        //         {
        //             combinator: "OR",
        //             subConditions: [
        //                 {
        //                     fieldName: "amount",
        //                     operator: "GREATER_THAN",
        //                     value: { amount: 100, currency: "USD" }
        //                 }
        //             ],
        //         }
        //     ],
        // }
    ],
};

// This configuration allows us to dynamically render input value components for
export const fieldsMapping: FieldTypeMapping = {
    name: { type: "string", label: "Name", initialValue: "" },
    
    amount: { type: "currency", label: "Amount", initialValue: { currency: "USD" } },
    
    id: { type: "string", label: "ID", initialValue: "" },
    
    device_id: { type: "string", label: "Device ID", initialValue: "" },
    
    installments: { type: "number", label: "Installments" },

    transaction_state: { 
        type: "enum", 
        label: "Transaction state", 
        initialValue: "SUCCEEDED", 
        options: [
            {
                value: "SUCCEEDED",
                label: "Succeeded"
            },
            {
                value: "REJECTED",
                label: "Rejected"
            },
            {
                value: "ERROR",
                label: "Error"
            },
            {
                value: "TIMEOUT",
                label: "Timeout"
            },
            {
                value: "CANCELLED",
                label: "Cancelled"
            },
            {
                value: "FAILED",
                label: "Failed"
            },
            {
                value: "ABORTED",
                label: "Aborted"
            }
        ] 
    },
}