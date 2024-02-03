import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import GeneralForm from "./components/GeneralForm/GeneralForm";

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <GeneralForm />
      </div >
    </BrowserRouter >
  );
}

export default App;