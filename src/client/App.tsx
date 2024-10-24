import axios from "axios";
import { fieldsMapping, mockData } from "./constants";

import { QueryBuilderDataProvider } from "./features/query-builder/_providers/query-builder-data-provider";
import { QueryBuilderTree } from "./features/query-builder/query-builder-tree";

function App() {
  const handleClick = async () => {
    try {
      await axios.post("/api/save-rules", {});
      alert("Submitted");
    } catch {
      alert("Error");
    }
  };

  return (
    <QueryBuilderDataProvider root={mockData} fieldsMapping={fieldsMapping}>

      <QueryBuilderTree handleClick={handleClick} />
    
    </QueryBuilderDataProvider>
  );
}

export default App;
