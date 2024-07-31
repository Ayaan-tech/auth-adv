"use client";

import { Card, CardContent,CardFooter,CardHeader} from "../ui/card";
import { Header } from "./header";
import { Social } from "./Social";
import { BackButton } from "./back-button";
interface CardWrapperProps{
    children:React.ReactNode;
    headerlabel:string;
    backbuttonlabel:string;
    backbuttonhref:string;
    showSocial?:boolean;
};
export const CardWrapper = ({
    children,
    headerlabel,
    backbuttonlabel,
    backbuttonhref,
    showSocial
} : CardWrapperProps) =>{
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader> 
                <Header label = {headerlabel}></Header>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (<CardFooter>
                <Social/>
            </CardFooter>)}
            <CardFooter>
                <BackButton 
                label = {backbuttonlabel}
                href = {backbuttonhref}/>
            </CardFooter>

            
        </Card>
    );
};