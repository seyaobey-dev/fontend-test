import { QueryGroup } from "./_components/query-group";
import { useInsertUpdate } from "./_providers/use-insert-update";

export const QueryBuilder = () => {
    const { data } = useInsertUpdate();
    const root = data.find((item) => item.id === "root")!;

    return (
        <div className={classNames.queryBuilder}>
            <QueryGroup group={root} data={data} />
        </div>
    );
}

const classNames = {
    queryBuilder: "my-8 mx-2 p-2 border border-solid border-[gray] bg-[#ccd1e6] rounded",
}   