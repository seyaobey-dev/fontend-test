import { CurrencyInput, CustomInput, CustomSelect, DeleteButton } from "./query-form-controls";
import { CurrencyValue, FieldCondition, FieldName, FieldType, OperatorMapping, TransactionState } from "../../../../types";
import { useQueryBuilderData } from "../_providers/use-query-builder-data";
import { ChangeEvent } from "react";

/**
 * This component dynamically renders the value input based on the field type and updates the value in the query builder state
 */
export const QueryFieldForm: React.FC<{ groupId: string; field: FieldCondition; }> = ({ groupId, field }) => {
    const { fieldsMapping, handleFieldValueChange, handleDeleteField } = useQueryBuilderData();

    if (typeof fieldsMapping !== "object") {
        console.log("fieldsMapping is not an object", typeof fieldsMapping);
    }

    if (!fieldsMapping) {
        console.log("fieldsMapping is not defined", {
            fieldsMapping,
        })

        // throw new Error("fieldsMapping is not defined");
    }
    
    const fieldMapping = fieldsMapping[field.fieldName];

    const handleFieldNameChange = (fieldId: string) => (value: string) => {
        handleFieldValueChange({ groupId, fieldId, key: "fieldName", value })
    }

    const handleOperatorChange = (fieldId: string) => (value: string) => {
        handleFieldValueChange({ groupId, fieldId, key: "operator", value })
    }

    /**
     * This function handles the value change for the field
     */
    const handleValueChange = (fieldId: string) => (value: unknown) => {
        switch(fieldMapping.type) {
            
            case "string": 
                return handleFieldValueChange({ 
                    groupId, fieldId, 
                    key: "value", 
                value: (value as ChangeEvent<HTMLInputElement>).target.value 
            })
            default: 
                return handleFieldValueChange({ groupId, fieldId, key: "value", value: value as never })
        }
    };

    /**
     * This function renders the value input based on the field type
     */
    const renderValueInput = () => {

        switch (fieldMapping.type) {

            case "enum":
                return <CustomSelect 
                        id={field.id!}
                        label={fieldMapping.label}
                        value={field.value as TransactionState}
                        onChange={handleValueChange(field.id!)}
                        options={fieldMapping.options!}
                    />

            case "currency":
                return <CurrencyInput 
                        id={field.id!}
                        value={field.value as CurrencyValue} 
                        onChange={handleValueChange(field.id!)} 
                     />

            default:
                return <CustomInput 
                        id={field.id!}
                        label="Value" 
                        value={field.value as string} 
                        onChange={handleValueChange(field.id!)} 
                    />

        }
    };

    return <div className="px-1 flex flex-row items-center gap-4 mb-4">
        <CustomSelect 
            id={`field-name-${field.id}`}
            label="Field name" 
            value={field.fieldName}  
            onChange={handleFieldNameChange(field.id!)} 
            options={Object.keys(fieldsMapping).map((key) => ({ 
                value: key, 
                label: fieldsMapping[key as FieldName].label 
            }))}
        />
        
        <CustomSelect 
            label="Operator" 
            value={field.operator}  
            id={`field-operator-${field.id}`}
            onChange={handleOperatorChange(field.id!)} 
            options={mapOperation(fieldMapping.type).map(operator => ({ value: operator, label: operator }))}
        />

        {renderValueInput()}

        <DeleteButton className="mt-6" onClick={() => handleDeleteField({ groupId, fieldId: field.id! })} />
    </div>
}

const mapOperation = (fieldType: FieldType) => {
    
    const operatorsMapping: OperatorMapping = {
        string: ["EQUAL", "NOT_EQUAL"],
        number: ["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"],
        currency: ["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"],
        enum: ["EQUAL", "NOT_EQUAL"],
    }

    return operatorsMapping[fieldType];
};