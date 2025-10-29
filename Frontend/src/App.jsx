import { BrowserRouter, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
function App() {
  return (
    <>
      <BrowserRouter>
        <HomePage />
        <Routes>
          {/* <Route path="" /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App