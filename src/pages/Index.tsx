import { Home } from "./Home";
import Auth from "../features/authentication/Auth"


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



export function Index(){
    return(
      
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                        <Route path="auth" element={<Auth/>}/>
                </Routes>
            </BrowserRouter>
    
    )
}
