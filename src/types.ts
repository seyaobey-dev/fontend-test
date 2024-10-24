export type CombinatorOperation = "AND" | "OR";

export type FieldOperator = "EQUAL" | "NOT_EQUAL" | "LESS_THAN" | "GREATER_THAN";

export type FieldName = "amount" | "name" | "id" | "transaction_state" | "device_id" | "installments";

export type FieldType = "string" | "number" | "currency" | "enum";

export type TransactionState = "SUCCEEDED" | "REJECTED" | "ERROR" | "TIMEOUT" | "CANCELLED" | "FAILED" | "ABORTED";

export type Currency = "USD" | "EUR";

export type CurrencyValue = {
    amount?: number;
    currency: Currency;
};

export type FieldTypeMapping = {
    [key in FieldName]: {
        type: FieldType;
        label: string;
        initialValue?: string | number | CurrencyValue;
        options?: { value: string; label: string }[];
    };
}

export type OperatorMapping = {
    [key in FieldType]: FieldOperator[];
}

export type FieldCondition = {
    id?: string;
    fieldName: FieldName;
    operator: FieldOperator;
    value: CurrencyValue | string | number | null | undefined;
};

export type SubCondition = {
    id?: string;
    parentId?: string;
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

export type GroupQuery = {
    id: string;
    parentId: string | null;
    combinator: CombinatorOperation;
    fields: FieldCondition[];
};