import { Toaster } from "react-hot-toast";
import { Router } from "./config";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      <Router />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
