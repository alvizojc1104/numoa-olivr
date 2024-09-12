import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Link } from "@nextui-org/react";
import { title } from "../components/primitives";
import LoginLayout from "../layouts/LoginLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css"

interface Account {
    emailAddress: string,
    password: string
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Account>({
        defaultValues: {
            emailAddress: "",
            password: ""
        }
    });
    const [loading, setLoading] = useState<boolean>(false)
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useAuth()
    const navigate = useNavigate();

    if (isSignedIn && isLoaded) {
        navigate("/")
    }


    const notify = (error: string) => toast.error(error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
    });


    const onSubmit = async (data: Account) => {
        setLoading(true);
        try {
            const onSignIn = await signIn?.create({
                identifier: data.emailAddress,
                password: data.password
            });

            await setActive!({ session: onSignIn?.createdSessionId });

            setLoading(false);
            navigate("/")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            notify(error.errors[0].message);
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <div className="flex basis-2/3 justify-center items-center pl-20">
                <Image
                    alt="NU MOA School of Optometry Facility"
                    className="object-cover rounded-none self-center"
                    isZoomed
                    src="https://national-u.edu.ph/wp-content/uploads/2022/03/IMG_6380.jpg"
                />
            </div>
            <div className="flex basis-1/3 justify-center items-center h-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="flex flex-col px-6 py-8 min-w-[350px] max-w-[450px]">
                        <CardHeader className="flex flex-col items-start">
                            <h1 className={title({ size: "sm" })}>NU OLIVR</h1>
                            <p className="text-sm">Login to continue.</p>
                        </CardHeader>
                        <CardBody className="gap-3">
                            <div>
                                <Input
                                    color={errors.emailAddress ? "danger" : "default"}
                                    label="Email"
                                    size="sm"
                                    variant="flat"
                                    type="email"
                                    {...register("emailAddress", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                />
                                {errors.emailAddress && <p className="text-red-600 text-xs">{errors.emailAddress.message}</p>}
                            </div>

                            {/* Password Input with validation */}
                            <div>
                                <Input
                                    color={errors.password ? "danger" : "default"}
                                    label="Password"
                                    size="sm"
                                    variant="flat"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
                            </div>

                            <Link href="#" className="text-sm text-blue-600 self-end">Forgot Password</Link>
                        </CardBody>
                        <CardFooter className="flex flex-col items-center">
                            <Button className="w-full" color="primary" isLoading={loading} type="submit" size="lg" variant="solid">Login</Button>
                        </CardFooter>
                        <div className="flex flex-row items-center justify-center h-fit mt-4">
                            <p className="text-xs text-gray-600">Made for&nbsp;</p>
                            <Link className="text-xs text-blue-700" isExternal href="https://national-u.edu.ph/nu-moa/nu-moa-college-of-optometry/" title="National University - School of Optometry">National University</Link>
                        </div>
                    </Card>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                limit={3}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Flip}
            />
        </LoginLayout>
    );
};

export default SignIn;
