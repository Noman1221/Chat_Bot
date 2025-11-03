import { useContext } from "react";
import AuthChat from "../component/AuthChat";
import GuestChat from "../component/GuestChat";
import { authContext } from "../Context/AuthContext";
function HomePage() {
    const { value, user, setUser } = useContext(authContext);


    return (
        <>
            {!user ? <GuestChat /> : <AuthChat />}

        </>
    )
}

export default HomePage