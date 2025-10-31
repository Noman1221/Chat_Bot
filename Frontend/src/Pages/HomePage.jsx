import { authContext } from "../Context/AuthContext"
import { useContext } from "react"
function HomePage() {
    const value = useContext(authContext);
    console.log(value);

    return (
        <div>HomePage</div>
    )
}

export default HomePage