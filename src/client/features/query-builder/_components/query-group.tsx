import { SelectCombinator } from "./select-combinator";
import { ConditionForm } from "./condition-form";
import { CustomButton } from "./form-controls";
import { CombinatorOperation, FieldCondition, SubCondition } from "../../../../types";
import { toFormPath } from "../../../toFormPath";

export const QueryGroup: React.FC<{
    formPath: string | undefined;
    combinator: CombinatorOperation;
    fields: FieldCondition[];
    subConditions: SubCondition[];
}> = ({ combinator, fields, formPath, subConditions }) => {
    return (
        <div>
            <div className="flex flex-row items-center gap-2 z-20">
                <SelectCombinator value={combinator} formPath={formPath} />
                <CustomButton>+ Rule</CustomButton>
                <CustomButton>+ Group</CustomButton>
            </div>

            <div className="mt-1">
                {fields.map((field, index) => (    
                    <ConditionForm key={field.fieldName} field={field} formPath={toFormPath(formPath, `conditions[${index}]`)} />
                ))}
            </div>

            {subConditions.length ? (
                <div className="mt-6 ml-4 pl-4 py-4 bg-[#9eafda]">
                    {subConditions.map((sub, i) => {
                        const fields = (sub.subConditions ?? []).filter((cond) => !(cond as SubCondition).combinator) as FieldCondition[];
                            const subConditions = (sub.subConditions ?? []).filter((cond) => (cond as SubCondition).combinator) as SubCondition[];  

                            return (
                                <QueryGroup 
                                    key={i} 
                                    formPath={toFormPath(formPath, `subConditions[${i}]`)} 
                                    combinator={sub.combinator} 
                                    fields={fields} 
                                    subConditions={subConditions} 
                                />
                            )
                    })}
                </div>
            ) : null}

        </div>
    )
}