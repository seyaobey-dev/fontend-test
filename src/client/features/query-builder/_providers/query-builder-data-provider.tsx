import { useState } from "react";
import { Combinator, FieldCondition, FieldTypeMapping, GroupQuery, SubCondition } from "../../../../types";
import { HandleAppendFieldFunction, HandleAppendGroupFunction, HandleChangeCombinatorFunction, HandleDeleteFieldFunction, HandleDeleteGroupFunction, HandleFieldValueChangeFunction, QueryBuilderDataContext } from "./query-builder-data-context";

/**
 * This component uses the context api to transform the initial data into an array of groups for better edit.
 * Then it exposes the data and the functions to update the data to the children.
 */

export const QueryBuilderDataProvider = ({ children, root, fieldsMapping }: React.PropsWithChildren<{ root: Combinator; fieldsMapping: FieldTypeMapping }>) => {

    // Convert the initial data into an array of groups
    const [data, setData] = useState<GroupQuery[]>(convertToArray(root));

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
                            let _field = {
                                ...field,
                                [key]: value,
                            };

                            if (key === "fieldName") {
                                const mapping = fieldsMapping[_field.fieldName];
                                _field = {
                                    ..._field,
                                    value: mapping.initialValue,
                                }
                            }

                            return _field;
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
                        // initially renders a name field
                        {
                            id: randomId(),
                            fieldName: "name",
                            operator: "EQUAL",
                            value: fieldsMapping.name.initialValue,
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

    const handleAppendGroup: HandleAppendGroupFunction = (props) => {
        setData((prev) => [...prev, { 
                id: randomId(), 
                parentId: props.groupId, 
                combinator: "AND", 
                fields: [
                    {
                        id: randomId(),
                        fieldName: "name",
                        operator: "EQUAL",
                        value: fieldsMapping.name.initialValue, // initially renders a name field
                    }
                ] 
            }
        ]);
    }

    const handleDeleteGroup: HandleDeleteGroupFunction = (props) => {
        setData((prev) => prev.filter((group) => group.id !== props.groupId));
    }

    return (    
        <QueryBuilderDataContext.Provider 
            value={{ 
                data, 
                fieldsMapping,
                handleFieldValueChange, 
                handleChangeCombinator,
                handleAppendField,
                handleDeleteField,
                handleAppendGroup,
                handleDeleteGroup,
            }}>
                {children}
        </QueryBuilderDataContext.Provider>
    )
}

const convertToArray = (root: Combinator) => {
    // add root group
    let groups: GroupQuery[] = [
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