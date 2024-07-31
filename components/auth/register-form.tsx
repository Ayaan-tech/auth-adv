"use client";
import { CardWrapper } from "./card-wrapper";
import {set, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { FormSucces } from "../form-succes";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
export const RegisterForm=() =>{
    const [isPending,startTransition] = useTransition();
    const[error,seterror] = useState<string | undefined>();
    const[success,setsuccess] = useState<string | undefined>();
    const form = useForm<z.infer<typeof RegisterSchema>>(
        {
            resolver: zodResolver(RegisterSchema),
            defaultValues: {
                email:"",
                password:"",
                name:"",
            },
        }
    );
    const onSubmit = (values:z.infer<typeof RegisterSchema>) => {
        seterror("");
        setsuccess("");
        startTransition(() => {
            register(values)
            .then((data) =>{
                seterror(data.error);
                setsuccess(data.success);
            })
        });
        
    };
    return(
        <CardWrapper 
        headerlabel="Create an account"
        backbuttonlabel="Already have an account?"
        backbuttonhref="/auth/login"
        showSocial><Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <div className="space-y-4">
                    <FormField 
                    control={form.control}
                    name="email"
                    render= {({field}) =>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl><Input
                             {...field}
                             disabled={isPending}
                             placeholder="john.doe@example.com"
                             type="email"/></FormControl>
                             <FormMessage/>
                        </FormItem>
                    )}/>
                     <FormField 
                    control={form.control}
                    name="password"
                    render= {({field}) =>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl><Input
                             {...field}
                             disabled={isPending}
                             placeholder="********"
                             type="password"/></FormControl>
                             <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="name"
                    render= {({field}) =>(
                        <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl><Input
                             {...field}
                             disabled={isPending}
                             placeholder="John Doe"
                            /></FormControl>
                             <FormMessage/>
                        </FormItem>
                    )}/>
                </div>
                <FormError message={error}/>
                <FormSucces message={success}/>
                <Button disabled={isPending}
                type ="submit" className="w-full"> Create an Account</Button>

                </form>
        </Form>
        </CardWrapper>

    );

}