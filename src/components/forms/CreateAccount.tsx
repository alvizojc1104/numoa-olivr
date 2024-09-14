import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Autocomplete,
    AutocompleteItem,
    DateInput,
} from "@nextui-org/react";
import { CopyPlus, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { title } from "../primitives";
import axios from "axios";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { toast } from "sonner";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL

const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
];

const accountTypes = [
    { label: "Faculty", value: "faculty" },
    { label: "Student", value: "student" },
    { label: "Patient", value: "patient" },
    // Add more account types as needed
];

interface AccountRequirements {
    emailAddress: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthdate: Date | DateValue | null
    gender: string;
    role: string
}

export default function CreateAccount() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedAccount, setSelectedAccount] = useState<string | undefined>();
    const [password, setPassword] = useState<string>("");
    const [, setSelectedGender] = useState<React.Key>("male")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [birthdate, setBirthdate] = React.useState<DateValue>();
    const [emailError, setEmailError] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<AccountRequirements>({
        defaultValues: {
            emailAddress: "",
            password: "",
            firstName: "",
            middleName: "",
            lastName: "",
            birthdate: null,
            gender: "",
            role: ""
        },
    });
    const formatter = useDateFormatter({ dateStyle: "long" });

    const generateStrongPassword = (length: number = 10): string => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleGeneratePassword = () => {
        const newPassword = generateStrongPassword(); // Generate password
        setValue("password", newPassword); // Update password in the form
        setPassword(newPassword);
    };

    const onCreateAccount = async (data: AccountRequirements) => {
        if (birthdate) {
            const dateObject = birthdate.toDate(getLocalTimeZone());
            data.birthdate = dateObject; // Assign the converted date to the form data
        }

        if (selectedAccount) {
            data.role = selectedAccount;
        }
        setIsLoading(true)
        setEmailError("")

        console.log(data)
        await axios.post(`${BACKEND_API_URL}/api/create-account`, data)
            .then((response) => {
                if (response.data.clerkError) {
                    setEmailError(response.data.errors[0].message)
                } else {
                    toast.success("Account created successfully!")
                    onClose()
                    setPassword("")
                    reset()
                }
                console.log(response.data)
            })
            .catch((error) => {
                setEmailError(error.response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <>
            <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
                Add account
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="2xl">
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <p className={title({ size: "xs" })}>Create Account</p>
                            <p className="text-sm">Please double check the account information before submitting.</p>
                        </ModalHeader>
                        <form onSubmit={handleSubmit(onCreateAccount)}>
                            <ModalBody className="flex flex-col gap-8">
                                <div className="flex-1">
                                    <Autocomplete
                                        errorMessage={errors.role?.message}
                                        isInvalid={errors.role ? true : false}
                                        label="Account Type"
                                        labelPlacement="outside"
                                        placeholder="Select account type"
                                        variant="bordered"
                                        defaultItems={accountTypes}
                                        onSelectionChange={(value) => {
                                            setSelectedAccount(value as string);
                                        }}
                                        {...register("role", {
                                            required: "Account Type is required",
                                            onChange: setSelectedAccount
                                        })}

                                    >
                                        {(item) => (
                                            <AutocompleteItem key={item.value}>
                                                {item.label}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                </div>
                                <div className="flex flex-row gap-4 w-full">
                                    <div className="flex-1">
                                        <Input
                                            errorMessage={"First name is required"}
                                            label="First Name"
                                            labelPlacement="outside"
                                            placeholder="Enter first name"
                                            variant="bordered"
                                            isInvalid={errors.firstName ? true : false}
                                            {...register("firstName", {
                                                required: "First name is required",
                                            })}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Middle Name"
                                            labelPlacement="outside"
                                            placeholder="Enter middle name"
                                            variant="bordered"
                                            {...register("middleName")}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            errorMessage="Last name is required"
                                            label="Last Name"
                                            labelPlacement="outside"
                                            placeholder="Enter last name"
                                            variant="bordered"
                                            isInvalid={errors.lastName ? true : false}
                                            {...register("lastName", {
                                                required: "Last name is required",
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 w-full">
                                    <div className="flex-1">
                                        <DateInput
                                            isInvalid={errors.birthdate ? true : false}
                                            label="Birth Date"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            value={birthdate}
                                            onChange={(date) => {
                                                setBirthdate(date);
                                                setValue("birthdate", date);
                                            }}
                                        />
                                        <p className="text-default-500 text-sm">
                                            Selected date: {birthdate ? formatter.format(birthdate.toDate(getLocalTimeZone())) : "--"}
                                        </p>
                                    </div>

                                    <div className="flex-1">
                                        <Autocomplete
                                            errorMessage="Gender is required"
                                            isInvalid={errors.gender ? true : false}
                                            label="Gender"
                                            labelPlacement="outside"
                                            placeholder="Select gender"
                                            defaultItems={gender}
                                            variant="bordered"
                                            {...register("gender", {
                                                required: "Gender is required",
                                                onChange: setSelectedGender
                                            })}
                                        >
                                            {(item) => (
                                                <AutocompleteItem key={item.value}>
                                                    {item.label}
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-4 w-full">
                                    <div className="flex-1">
                                        <Input
                                            isInvalid={errors.emailAddress ? true : emailError ? true : false}
                                            label="Email Address"
                                            labelPlacement="outside"
                                            placeholder="Enter email address"
                                            variant="bordered"
                                            onClick={() => setEmailError("")}
                                            color={errors.emailAddress ? "danger" : "default"}
                                            {...register("emailAddress", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                    message: "Invalid email format",
                                                },
                                            })}
                                        />
                                        {errors.emailAddress ? <p className="text-red-600 text-xs">{errors.emailAddress.message}</p> : emailError ? <p className="text-red-600 text-xs">{emailError}</p> : null}
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            isInvalid={errors.password ? true : false}
                                            label="Password"
                                            labelPlacement="outside"
                                            placeholder="Enter password"
                                            type="password"
                                            variant="bordered"
                                            value={password}
                                            endContent={
                                                <Button isIconOnly onPress={handleGeneratePassword} size="sm" variant="flat" color="primary">
                                                    <CopyPlus className="text-primary" size="15" />
                                                </Button>
                                            }
                                            color={errors.password ? "danger" : "default"}
                                            {...register("password", {
                                                required: "Password is required",
                                                onChange: setPassword
                                            })}
                                        />
                                        {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="mt-8">
                                <Button className="w-[150px] min-w-fit max-w-md" color="danger" variant="light" type="reset" size="md" >
                                    Reset
                                </Button>
                                <Button className="w-[150px] min-w-fit max-w-md" color="primary" size="md" type="submit" isLoading={isLoading}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
