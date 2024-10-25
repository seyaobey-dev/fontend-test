import { useState } from "react";
import { FieldTypeMapping, GroupQuery } from "../../../../types";
import { HandleAppendFieldFunction, HandleAppendGroupFunction, HandleChangeCombinatorFunction, HandleDeleteFieldFunction, HandleDeleteGroupFunction, HandleFieldValueChangeFunction, QueryBuilderDataContext } from "./query-builder-data-context";

/**
 * This component uses the context api to the whole application:
 * the array of parent-child groups of query fiels
 * methods to append/delete fields and groups
 */

export const QueryBuilderDataProvider = ({ children, fieldsMapping }: React.PropsWithChildren<{ fieldsMapping: FieldTypeMapping }>) => {

    // Initialize the data with a root group and a name field
    const [data, setData] = useState<GroupQuery[]>([{
        id: "root",
        parentId: null,
        combinator: "AND",
        fields: [
            {
                id: randomId(),
                fieldName: "name",
                operator: "EQUAL",
                value: fieldsMapping.name.initialValue,
            }
        ],
    }]);

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

const randomId = () => {
    const timestamp = Date.now();
    let randomString = timestamp.toString(36);
    randomString += Math.random().toString(36).substring(2);
    return randomString;
}