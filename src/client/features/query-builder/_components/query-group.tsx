import { CombinatorDropDown } from "./combinator-dropdown";
import { QueryFieldForm } from "./query-field-form";
import { CustomButton, DeleteButton } from "./query-form-controls";
import { GroupQuery } from "../../../../types";
import { useQueryBuilderData } from "../_providers/use-query-builder-data";

/**
 * This component renders a group and all its fields and sub-groups recursively
 */

export const QueryGroup: React.FC<{
    group: GroupQuery;
    data: GroupQuery[];
    deletable?: boolean;
}> = ({ group, data, deletable }) => {
    const { id, combinator, fields } = group;

    const subGroups = data.filter((item) => item.parentId === id);

    const { handleAppendField, handleAppendGroup, handleDeleteGroup } = useQueryBuilderData();
    // bg-[#9eafda]
    return (
        <div>
            <div className={`${deletable ? "p-4 mb-4 bg-[#9eafda]" : ""}`}>
                <div className="flex flex-row items-center gap-2 z-20">
                    {/** select AND or OR */}
                    <CombinatorDropDown value={combinator} id={id} />

                    {/** add rule */}
                    <CustomButton role="add-field" onClick={() => handleAppendField({ groupId: id })}>+ Rule</CustomButton>
                    
                    {/** add group */}
                    <CustomButton role="add-group" onClick={() => handleAppendGroup({ groupId: id })}>+ Group</CustomButton>
                    
                    {/** delete group */}
                    {deletable && (
                        <div className="flex flex-col justify-center">
                            <DeleteButton role="delete-group" className="ml-2 h-6" onClick={() => handleDeleteGroup({ groupId: id })}>Delete</DeleteButton>
                        </div>
                    )}
                </div>

                {/** render fields of current group */}
                <div className="mt-1">
                    {fields.map((field) => (    
                        <QueryFieldForm key={field.id} groupId={id} field={field} />
                        ))}
                    </div>
                </div>

            {/** recursively render sub groups */}
            {subGroups.length ? (
                <div className="ml-4 pl-4 py-2">
                    {subGroups.map((group) => (
                        <QueryGroup key={group.id} group={group} data={data} deletable />
                    ))}
                </div>
            ) : null}

        </div>
    )
}