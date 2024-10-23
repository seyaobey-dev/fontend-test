import { useState } from "react";
import { Combinator, FieldCondition, GroupItem, SubCondition } from "../../../../types";
import { HandleAppendFieldFunction, HandleChangeCombinatorFunction, HandleDeleteFieldFunction, HandleFieldValueChangeFunction, InsertUpdateContext } from "./insert-update-context";

/**
 * This component uses the context api to transform the initial data into an array of groups for better edit.
 * Then it exposes the data and the functions to update the data to the children.
 */

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

    const handleAppendField: HandleAppendFieldFunction = (props) => {
        setData((prev) => prev.map((group) => {
            if (group.id === props.groupId) {
                return {
                    ...group,
                    fields: [
                        ...group.fields, 
                        {
                            id: randomId(),
                            fieldName: "name",
                            operator: "EQUAL",
                            value: "",
                        }
                    ]
                }
            }

            return group;
        }));    
    };

    const handleDeleteField: HandleDeleteFieldFunction = (props) => {
        setData((prev) => prev.map((group) => {
            if (group.id === props.groupId) {
                return { ...group, fields: group.fields.filter((field) => field.id !== props.fieldId) };
            }
            return group;
        }));
    }

    return (
        <InsertUpdateContext.Provider 
            value={{ 
                data, 
                handleFieldValueChange, 
                handleChangeCombinator,
                handleAppendField,
                handleDeleteField,
            }}>
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
            combinator: root.combinator ?? "AND",
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


const randomId = () => {
    const timestamp = Date.now();
    let randomString = timestamp.toString(36);
    randomString += Math.random().toString(36).substring(2);
    return randomString;
}