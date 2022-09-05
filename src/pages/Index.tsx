import { Home } from "./Home";
import Auth from "../features/authentication/Auth"
import { About } from "./About";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Contact } from "./Contact";
import ListForm from "../features/listings/ListForm";

export function Index(){
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="listings" element={<Auth/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="contact" element={<Contact/>}/>
                    <Route path="form" element={<ListForm/>}/>
                </Routes>
            </BrowserRouter>
    )
}
