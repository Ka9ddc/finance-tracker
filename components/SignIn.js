import React, {useContext} from "react";

import { authContext } from "@/lib/store/auth-context";

import { FcGoogle } from 'react-icons/fc'

export default function SignIn() {

    const {googleLoginHandler} = useContext(authContext);
    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-6xl font-bold text-center">Welcome!🙌</h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
                <div className="h-52">
                    <img className="object-cover w-full h-full" src="https://upload-os-bbs.mihoyo.com/upload/2021/01/06/5481824/5d703ec2befb2e30fd41c7e11913252d_1052675723287965703.png"/>
                </div>

                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center">Please sign in to continue</h3>

                    <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
                        <FcGoogle className="text-2xl"/>Google
                    </button>
                </div>
            </div>
        </main>
    )
}