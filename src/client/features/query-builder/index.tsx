import { useForm } from "react-hook-form";
import { QueryRule } from "./_components/query-rule";
import { mockData } from "../../mock-data";
import { FieldCondition, SubCondition } from "../../../types";

export const QueryBuilder = () => {
    useForm({
        defaultValues: mockData,
    });

    const fields = (mockData.conditions ?? []).filter((cond) => !(cond as SubCondition).combinator) as FieldCondition[];                
    
    return (
        <div className={classNames.queryBuilder}>
            <QueryRule combinator={mockData.combinator} fields={fields} />
        </div>
    );
}

const classNames = {
    queryBuilder: "my-8 mx-2 p-2 border border-solid border-[gray] bg-[#ccd1e6] rounded",
}   