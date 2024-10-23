import { Combinator, CombinatorOperation, FieldCondition, FlattenedCombinator, FlattenedSubCondition, SubCondition } from "../types";

export const flattenCombinators = (combinator: Combinator) => {

    let _subCondition = null;

    const fields = (combinator.conditions ?? []).reduce<FlattenedCombinator>((acc, field, i) => {

        const _field = field as FieldCondition;

        if ((field as SubCondition).subConditions) {
            _subCondition = flattenSubConditions({
                level: 0,
                combinator: (field as SubCondition).combinator,
                subConditions: (field as SubCondition).subConditions as SubCondition[],
            });

            return acc;
        }

        return ({
            ...acc,
            [`field_${i}`]: {
                name: _field.fieldName,
                operator: _field.operator,
                value: _field.value,
            },
        })
    }, {} as FlattenedCombinator);

    const data = {
        "root": {
            combinator: combinator.combinator,
            fields: {
                ...fields,
            },
            subConditions: _subCondition,
        }
    };

    return data;
}

const flattenSubConditions = (props: {
    level: number;
    combinator: CombinatorOperation;
    subConditions: SubCondition[];
}) => {
    const { level, combinator, subConditions } = props;
    let _subCondition = null;

    const fields = subConditions.reduce<FlattenedSubCondition>((acc, field, i) => {
        if ((field as SubCondition).subConditions) {
            _subCondition = flattenSubConditions({
                level: level + 1,
                combinator: (field as SubCondition).combinator,
                subConditions: (field as SubCondition).subConditions as SubCondition[],
            });

            return acc;
        }

        const _field = field as unknown as FieldCondition;

        return ({
            ...acc,
            [`field_${i}`]: {
                name: _field.fieldName,
                operator: _field.operator,
                value: _field.value,
            },
        })
    }, {} as FlattenedSubCondition);

    return {
        [`sub_${level}`]: {
            combinator,
            fields: {
                ...fields,
            },
            subConditions: _subCondition,
        },
    }
}