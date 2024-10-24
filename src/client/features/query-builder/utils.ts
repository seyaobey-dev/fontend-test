import { GroupQuery } from "../../../types";

export const rebuildJson = (props: { groups: GroupQuery[] }) => {
    const { groups } = props;
    
    const root = groups.find((g) => !g.parentId)!;

    const conditions = root.fields.map((field) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = field;

        return {
            ...rest,
        };
    });

    const children = groups.filter((g) => g.parentId === root.id);

    const subConditions = children.map((sub) => {
        const combinator = sub.combinator;
    
        const subConditions = sub.fields.map((field) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = field;

            // this is a sub condition
            if (field.operator) {

            }

            return rest;
        });

        return {
            combinator,
            subConditions,
        };
    })

    return {
        combinator: root.combinator,
        conditions: [
            ...conditions,
            ...subConditions,
        ],
    }
}

const rebuildSubConditions = (children:  GroupQuery[]) => {
    const subConditions = children.map((sub) => {
        const combinator = sub.combinator;

        const fields = sub.fields.map((field) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = field;

            return rest;
        });

        return {
            combinator,
            co,
        };
    });
}