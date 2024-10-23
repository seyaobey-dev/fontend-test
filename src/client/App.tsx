import axios from "axios";
import { QueryBuilder } from "./features/query-builder";
import { mockData } from "./mock-data";

import { InsertUpdateProvider } from "./features/query-builder/_providers/insert-update-provider";

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
    <div>
      <h1>Query Builder</h1>
      <form>
        
        <InsertUpdateProvider root={mockData}>
          <QueryBuilder />  
        </InsertUpdateProvider>

        <button type="button" onClick={handleClick}>
          Submit
        </button>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default App;
