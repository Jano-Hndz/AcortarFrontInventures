import { useLocation} from "react-router-dom";


export const getData = ()=>{
    const location = useLocation();
    const data = location.state;
    return data;
}