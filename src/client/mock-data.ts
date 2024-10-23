import { Combinator } from "../types";

export const mockData: Combinator = {
    combinator: "AND",
    conditions: [
        {
            fieldName: "name",
            operator: "EQUAL",
            value: "John Doe"
        }, 
        {
            fieldName: "installments",
            operator: "GREATER_THAN",
            value: "11111"
        },
        {
            combinator: "AND",
            subConditions: [
                {
                    fieldName: "id",
                    operator: "EQUAL",
                    value: "1234567890"
                }, 
                {
                    fieldName: "amount",
                    operator: "LESS_THAN",
                    value: { amount: 100, currency: "USD" }
                },
                {
                    combinator: "OR",
                    subConditions: [
                        {
                            fieldName: "amount",
                            operator: "GREATER_THAN",
                            value: { amount: 100, currency: "USD" }
                        }
                    ],
                }
            ],
        }
    ],
};