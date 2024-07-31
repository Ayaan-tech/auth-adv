import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";


export const ErrorCard =() =>{
    return(
       <CardWrapper
       headerlabel="Oops! Something Went wrong"
       backbuttonhref ="/auth/login"
       backbuttonlabel="Back to Login">
        <div className="w-full flex justify-center flex-col items-center">
            <ExclamationTriangleIcon className="text-destructive"/>
        </div>
       </CardWrapper>
    );
}