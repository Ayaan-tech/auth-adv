"use client";
import { FaMicrosoft  } from "react-icons/fa"; 
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import {signIn} from "next-auth/react";
export const Social = () =>{
    const onClick = (provider: "Github") =>{
        signIn(provider,{
            callbackUrl:DEFAULT_LOGIN_REDIRECT
        })
    }
    return(
        <div className="flex items-center w-full gao-x-4">
            <Button size="lg" className="w-full" variant="outline" onClick={() =>{}}>
                <FaMicrosoft  className="h-5 w-5"/></Button>
                <Button size="lg"className="w-full" variant="outline" onClick={() =>onClick("Github")}>
                    <FaGithub className="h-5 w-5"/></Button></div>
    );
}