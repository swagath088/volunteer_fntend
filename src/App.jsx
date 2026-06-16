import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import List from "./Components/List";
function App(){
  return(
    <Routes>
      <Route path="/Register" element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path="/List" element={<List/>}/>
    </Routes>
  );
}
export default App;