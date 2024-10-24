import { QueryGroup } from "./_components/query-group";
import { useQueryBuilderData } from "./_providers/use-query-builder-data";

// This component renders the root group and all its children recursively

export const QueryBuilderTree: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const { data } = useQueryBuilderData();
  
  // Find the root group
  const root = data.find((item) => item.id === "root")!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted", data);
  }

  return (
    <div>
      <h1>Query Builder</h1>

      <form onSubmit={handleSubmit}>
        
        <div className={classNames.queryBuilder}>
          {/* Render the root group first */}
          <QueryGroup group={root} data={data} />
        </div>

        <button type="submit">
          Submit
        </button>

        <button type="button" onClick={handleClick}>
          Cancel
        </button>
      </form>
    </div>
  )
}


const classNames = {
  queryBuilder: "my-8 mx-2 p-2 border border-solid border-[gray] bg-[#ccd1e6] rounded",
}   