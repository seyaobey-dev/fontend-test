import { Combinator, GroupQuery, SubCondition } from "../../../types";

export const transformArrayOfGroupsToJSON = (groups: GroupQuery[]): Combinator => {
    
    const root = groups.find((g) => !g.parentId)!;

    const conditions = root.fields.map((field) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = field;

        return {
            ...rest,
        };
    });

    const children = groups.filter((g) => g.parentId === root.id);

    const subConditions = rebuildSubConditions(children, groups);

    return {
        combinator: root.combinator,
        conditions: [
            ...conditions,
            ...subConditions,
        ],
    }
}

const rebuildSubConditions = (children:  GroupQuery[], allGroups: GroupQuery[]): SubCondition[] => {
    return children.map<SubCondition>((sub) => {
        let subCondition: Combinator = {
            combinator: sub.combinator,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let subConditions: any = sub.fields.map((field) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = field;
            return rest;
        });

        if (sub.combinator) {
            const nextChildren = allGroups.filter((g) => g.parentId === sub.id);
            subConditions = [
                ...subConditions,
                ...rebuildSubConditions(nextChildren, allGroups),
            ]
        }

        subCondition = {
            ...subCondition,
            subConditions,
        }

        return subCondition as SubCondition;
    });
}