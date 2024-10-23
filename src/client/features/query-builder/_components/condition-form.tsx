import { CustomInput, CustomSelect, DeleteButton } from "./form-controls";
import { FieldCondition } from "../../../../types";

export const ConditionForm: React.FC<{ field: FieldCondition }> = ({ field }) => {
    return <div className="px-1 flex flex-row items-center gap-4 mb-4">
        <CustomSelect label="Field name" value={field.fieldName} options={["Field 1", "Field 2", "Field 3"]} onChange={(value) => {
            console.log(value);
        }} />
        <CustomSelect label="Operator" value={field.operator} options={["Operator 1", "Operator 2", "Operator 3"]} onChange={(value) => {
            console.log(value)
        }} />
        <CustomInput label="Value" />
        <DeleteButton />
    </div>
}
