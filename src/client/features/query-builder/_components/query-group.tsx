import { SelectCombinator } from "./select-combinator";
import { ConditionForm } from "./condition-form";
import { CustomButton } from "./form-controls";
import { GroupItem } from "../../../../types";
import { useInsertUpdate } from "../_providers/use-insert-update";

export const QueryGroup: React.FC<{
    group: GroupItem;
    data: GroupItem[];
}> = ({ group, data }) => {
    const { id, combinator, fields } = group;
    const subGroups = data.filter((item) => item.parentId === id);

    const { handleAppendField } = useInsertUpdate();

    return (
        <div>
            <div className="flex flex-row items-center gap-2 z-20">
                <SelectCombinator value={combinator} id={id} />
                <CustomButton onClick={() => handleAppendField({ groupId: id })}>+ Rule</CustomButton>
                <CustomButton>+ Group</CustomButton>
            </div>

            <div className="mt-1">
                {fields.map((field) => (    
                    <ConditionForm key={field.id} groupId={id} field={field} />
                ))}
            </div>

            {subGroups.length ? (
                <div className="mt-6 ml-4 pl-4 py-4 bg-[#9eafda]">
                    {subGroups.map((group) => (
                        <QueryGroup key={group.id} group={group} data={data} />
                    ))}
                </div>
            ) : null}

        </div>
    )
}