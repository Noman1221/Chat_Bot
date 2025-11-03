import { useContext, useState } from "react";
import { authContext } from "../Context/AuthContext";

function GuestChat() {
    const { guestPrompt } = useContext(authContext);
    const [respone, getResponse] = useState([]);
    const [userGuestPrompt, setUserGuestPrompt] = useState();
    const genGuestResponse = async () => {

        let data = await guestPrompt(userGuestPrompt)
        console.log("lets see what here comes", data.data);
        getResponse(prev => [...prev, { data: data.data }])
        setUserGuestPrompt("");

    }

    return (
        <>
            <section className="w-full h-screen bg-gray-500 text-white">
                <div className="flex justify-between" >
                    <h1 className="text-xl mt-3 ml-3">ChatGPT</h1>
                    <div className="flex gap-5 mr-4 mt-3">
                        <p className="bg-black pt-1 pb-1.5 px-2 rounded-2xl cursor-pointer">Login</p>
                        <p className=" text-black border pt-1 pb-1.5 px-2 rounded-2xl hover:bg-amber-100 hover:border-white cursor-pointer" >Sign up for free</p>
                    </div>
                </div>
                {/* input handling for Guest  */}
                <div className="flex justify-center items-center h-[80vh]">
                    <div className="w-1/3 border rounded-md flex shadow-2xl">
                        <input
                            className=" flex-1 p-6 outline-none  resize-none "
                            placeholder="Ask Anything"
                            value={userGuestPrompt}
                            onChange={e => setUserGuestPrompt(e.target.value)}
                        ></input>

                        <button onClick={genGuestResponse} className=" px-4 rounded cursor-pointer">
                            Get
                        </button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default GuestChat
