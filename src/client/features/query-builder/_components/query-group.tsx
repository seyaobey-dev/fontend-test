import { SelectCombinator } from "./select-combinator";
import { ConditionForm } from "./condition-form";
import { CustomButton } from "./form-controls";
import { GroupItem } from "../../../../types";

export const QueryGroup: React.FC<{
    group: GroupItem;
    data: GroupItem[];
}> = ({ group, data }) => {
    const { id, combinator, fields } = group;
    const subGroups = data.filter((item) => item.parentId === id);

    return (
        <div>
            <div className="flex flex-row items-center gap-2 z-20">
                <SelectCombinator value={combinator} id={id} />
                <CustomButton>+ Rule</CustomButton>
                <CustomButton>+ Group</CustomButton>
            </div>

            <div className="mt-1">
                {fields.map((field) => (    
                    <ConditionForm key={field.fieldName} groupId={id} field={field}  />
                ))}
            </div>

            {subGroups.length ? (
                <div className="mt-6 ml-4 pl-4 py-4 bg-[#9eafda]">
                    {subGroups.map((group) => (
                        <QueryGroup key={group.id} group={group} data={data} />
                    ))}
                </div>
            ) : null}

            {/* {subConditions.length ? (
                <div className="mt-6 ml-4 pl-4 py-4 bg-[#9eafda]">
                    {subConditions.map((sub, i) => {
                        const fields = (sub.subConditions ?? []).filter((cond) => !(cond as SubCondition).combinator) as FieldCondition[];
                        const subConditions = (sub.subConditions ?? []).filter((cond) => (cond as SubCondition).combinator) as SubCondition[];  

                        console.log(toFormPath(formPath, `subConditions:${i}`), sub.combinator);

                        return (
                            <QueryGroup 
                                key={i} 
                                formPath={toFormPath(formPath, `subConditions:${i}`)} 
                                combinator={sub.combinator} 
                                fields={fields} 
                                subConditions={subConditions} 
                            />
                        )
                    })}
                </div>
            ) : null} */}

        </div>
    )
}