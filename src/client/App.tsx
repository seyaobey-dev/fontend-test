import axios from "axios";
import { fieldsMapping } from "./constants";

import { QueryBuilderDataProvider } from "./features/query-builder/_providers/query-builder-data-provider";
import { QueryBuilderTree } from "./features/query-builder/query-builder-tree";
import { useState } from "react";
import { Combinator, GroupQuery } from "../types";
import { transformArrayOfGroupsToJSON } from "./features/query-builder/utils";

function App() {
  const [result, setResult] = useState<Combinator | null>();

  const handleSubmit = async (arrayOfGroups: GroupQuery[]) => {
    const combinator: Combinator = transformArrayOfGroupsToJSON(arrayOfGroups);

    try {
      await axios.post("/api/save-rules", combinator);
      setResult(combinator);
      alert("Submitted");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="flex flex-col items-start">
      <QueryBuilderDataProvider fieldsMapping={fieldsMapping}>

        <QueryBuilderTree onSubmit={handleSubmit} onCancel={() => {
          setResult(null);
        }} />
        
      </QueryBuilderDataProvider>

      <div>
        <p className="mt-5 pl-4">{result ? JSON.stringify(result, null, 2) : null}</p>
      </div>
    </div>
  );
}

export default App;
