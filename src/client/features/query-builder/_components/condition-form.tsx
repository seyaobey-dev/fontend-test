import { useState } from "react";
import { CustomInput, CustomSelect, DeleteButton } from "./form-controls";

export const ConditionForm = () => {
    const [field, setField] = useState("Field 1");
    const [operator, setOperator] = useState("Operator 1");

    return <div className="px-1 flex flex-row items-center gap-4">
        <CustomSelect label="Field name" value={field} options={["Field 1", "Field 2", "Field 3"]} onChange={setField} />
        <CustomSelect label="Operator" value={operator} options={["Operator 1", "Operator 2", "Operator 3"]} onChange={setOperator} />
        <CustomInput label="Value" />
        <DeleteButton />
    </div>
}