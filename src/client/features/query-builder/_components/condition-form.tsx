import { CustomInput, CustomSelect, DeleteButton } from "./form-controls";
import { FieldCondition } from "../../../../types";
import { useInsertUpdate } from "../_providers/use-insert-update";
import { ChangeEvent } from "react";

export const ConditionForm: React.FC<{ groupId: string; field: FieldCondition; }> = ({ groupId, field }) => {
    const { handleFieldValueChange, handleDeleteField } = useInsertUpdate();

    const handleFieldNameChange = (fieldId: string) => (value: string) => {
        handleFieldValueChange({ groupId, fieldId, key: "fieldName", value })
    }

    const handleOperatorChange = (fieldId: string) => (value: string) => {
        handleFieldValueChange({ groupId, fieldId, key: "operator", value })
    }

    const handleValueChange = (fieldId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        handleFieldValueChange({ groupId, fieldId, key: "value", value: e.target.value })
    }

    return <div className="px-1 flex flex-row items-center gap-4 mb-4">
        <CustomSelect 
            label="Field name" 
            value={field.fieldName} 
            options={["Field 1", "Field 2", "Field 3"]} 
            onChange={handleFieldNameChange(field.id!)} 
        />
        
        <CustomSelect label="Operator" value={field.operator} options={["Operator 1", "Operator 2", "Operator 3"]} onChange={handleOperatorChange(field.id!)} />
        
        <CustomInput label="Value" value={field.value as string} onChange={handleValueChange(field.id!)} />

        <DeleteButton onClick={() => handleDeleteField({ groupId, fieldId: field.id! })} />
    </div>
}
