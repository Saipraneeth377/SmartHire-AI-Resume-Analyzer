import { useState } from "react";

import ResumeUpload from "./components/ResumeUpload";
import AnalysisResult from "./components/AnalysisResult";

import "./App.css";

function App() {

  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="app">

      <ResumeUpload
        setAnalysis={setAnalysis}
      />

      <AnalysisResult
        analysis={analysis}
      />

    </div>
  );
}

export default App;