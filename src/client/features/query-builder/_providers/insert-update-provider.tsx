import { useState } from "react";
import { Combinator, FieldCondition, GroupItem, SubCondition } from "../../../../types";
import { HandleChangeCombinatorFunction, HandleFieldValueChangeFunction, InsertUpdateContext } from "./insert-update-context";

export const InsertUpdateProvider = ({ children, root }: React.PropsWithChildren<{ root: Combinator }>) => {
    const [data, setData] = useState<GroupItem[]>(convertToArray(root));

    const handleChangeCombinator: HandleChangeCombinatorFunction = (props) => {
        setData((prev) => prev.map((group) => {
            if (group.id === props.groupId) {
                return { ...group, combinator: props.value };
            }
            return group;
        }));
    }

    const handleFieldValueChange: HandleFieldValueChangeFunction = (props) => {
        const { groupId, fieldId, key, value } = props;

        setData((prev) => prev.map((group) => {
            if (group.id === groupId) {
                return {
                    ...group,
                    fields:  group.fields.map((field) => {
                        if (field.id === fieldId) {
                            return {
                                ...field,
                                [key]: value,
                            }
                        }

                        return field;
                    })
                }
            }
            return group;
        }));
    }

    return (
        <InsertUpdateContext.Provider 
            value={{ data, handleFieldValueChange, handleChangeCombinator }}>
                {children}
        </InsertUpdateContext.Provider>
    )
}

const convertToArray = (root: Combinator) => {
    // add root group
    let groups: GroupItem[] = [
        {
            id: "root",
            parentId: null,
            combinator: root.combinator,
            fields: ((root.conditions ?? []) as FieldCondition[])
                        .map((f) => ({...f, id: randomId()})),
        }
    ];

    let parentId = "root";
    let stack = (root.conditions ?? []).filter((cond) => (cond as SubCondition).combinator) as SubCondition[];

    while (stack.length > 0) {
        const id = randomId();
        const sub = stack.shift()!;
        const fields = (sub.subConditions.filter((cond) => !(cond as SubCondition).combinator) as FieldCondition[])
                         .map((f) => ({...f, id: randomId()}));
        
        groups = [
            ...groups,
            {
                id,
                parentId,
                combinator: sub.combinator,
                fields,
            }
        ];

        parentId = id;
        
        const nextStack = sub.subConditions.filter((cond) => (cond as SubCondition).combinator) as SubCondition[];
        
        stack = [...stack, ...nextStack];
    }

    return groups;
};


const randomId = () => Math.random().toString(36).substring(2, 15);