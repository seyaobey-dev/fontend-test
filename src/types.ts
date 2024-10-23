export type CombinatorOperation = "AND" | "OR";

export type FieldOperator = "EQUAL" | "NOT_EQUAL" | "LESS_THAN" | "GREATER_THAN";

export type FieldName = "amount" | "name" | "id" | "transaction_state" | "device_id" | "installments";

export type TransactionState = "SUCCEEDED" | "REJECTED" | "ERROR" | "TIMEOUT" | "CANCELLED" | "FAILED" | "ABORTED";

export type Currency = {
    amount: number;
    currency: "USD" | "EUR";
};

export type FieldCondition = {
    fieldName: FieldName;
    operator: FieldOperator;
    value: Currency| string;
};

export type SubCondition = {
    combinator: CombinatorOperation;
    subConditions: (FieldCondition | SubCondition)[];
};

export type Combinator = {
    combinator: CombinatorOperation;
    conditions?: (FieldCondition | {
        combinator: CombinatorOperation;
        subConditions: (FieldCondition | SubCondition)[];
    })[];
};

export type FlattenedCombinator = {
    root: Combinator;
    fields: Record<string, FieldCondition>;
    subConditions: Record<string, FlattenedSubCondition>;
};

export type FlattenedSubCondition = {
    combinator: CombinatorOperation;
    fields: Record<string, FieldCondition>;
    subConditions: Record<string, FlattenedSubCondition>;
};
