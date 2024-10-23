import { QueryGroup } from "./_components/query-group";
import { mockData } from "../../mock-data";
import { FieldCondition, SubCondition } from "../../../types";

export const QueryBuilder = () => {
    const fields = (mockData.conditions ?? []).filter((cond) => !(cond as SubCondition).combinator) as FieldCondition[];
    const subConditions = (mockData.conditions ?? []).filter((cond) => (cond as SubCondition).combinator) as SubCondition[];            
    
    return (
        <div className={classNames.queryBuilder}>
            <QueryGroup formPath={undefined} combinator={mockData.combinator} fields={fields} subConditions={subConditions} />
        </div>
    );
}

const classNames = {
    queryBuilder: "my-8 mx-2 p-2 border border-solid border-[gray] bg-[#ccd1e6] rounded",
}   