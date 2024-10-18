import { useEffect, useState } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import QRCode from "react-qr-code";
import moment from "moment";
import { Lock, Mail } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const timeInURL = import.meta.env.VITE_TIME_IN_URL
const timeOutURL = import.meta.env.VITE_TIME_OUT_URL

const AttendanceTracker = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inOrOut, setInOrOut] = useState(false);
    const uuid = uuidv4()

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000"); // Update with your server data

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "CHECK_IN") {
                alert(`Time in successful!: ${data.email}`);
                window.location.reload()
                // Optionally, you can refresh the QR code or any other state here
                // setData(""); // Uncomment if you want to reset the data or any other state
            }
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const handleLogin = async () => {
        // Call API to authenticate user and time in/out
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-800 to-cyan-600">

            {
                !inOrOut ?
                    <Card className="max-w-xl w-full p-6 bg-white shadow-lg rounded-lg">
                        <h1 className="text-4xl text-center font-bold text-gray-800 mb-1">NU Vision</h1>
                        <p className="text-center text-sm text-gray-600">
                            {moment().format('dddd MMMM D YYYY')}
                        </p>
                        <div className="flex flex-col justify-center items-center gap-1 my-4">
                            <h2 className="font-bold text-lg text-center text-gray-800">Time in</h2>
                            <QRCode value={JSON.stringify({ url: timeInURL, accessToken: uuid })} size={300} />
                        </div>
                        <h2 className="font-normal text-xs text-center text-gray-800 mb-6">Use NU Vision app to scan the QR Code.</h2>

                        <div className="flex flex-col gap-4">
                            <Input
                                variant="bordered"
                                label="Email Address"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                startContent={<Mail size={16} />}
                            />
                            <Input
                                variant="bordered"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                startContent={<Lock size={16} />}
                            />
                            <Button onPress={handleLogin} className="w-full" color="primary" size="lg">
                                Time in
                            </Button>
                            <p className="cursor-pointer hover:underline text-md self-center transition-colors-opacity" onClick={() => setInOrOut(!inOrOut)}>Already done? Time Out</p>
                        </div>
                    </Card>
                    :
                    <Card className="max-w-xl w-full p-6 bg-white shadow-lg rounded-lg">
                        <h1 className="text-4xl text-center font-bold text-gray-800 mb-1">NU Vision</h1>
                        <p className="text-center text-sm text-gray-600">
                            {moment().format('dddd MMMM D YYYY')}
                        </p>
                        <div className="flex flex-col justify-center items-center gap-1 my-4">
                            <h2 className="font-bold text-lg text-center text-gray-800">Time Out</h2>
                            <QRCode value={JSON.stringify({ url: timeOutURL, accessToken: uuid })} size={300} />
                        </div>
                        <h2 className="font-normal text-xs text-center text-gray-800 mb-6">Use NU Vision app to scan the QR Code.</h2>

                        <div className="flex flex-col gap-4">
                            <Input
                                variant="bordered"
                                label="Email Address"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                startContent={<Mail size={16} />}
                            />
                            <Input
                                variant="bordered"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                startContent={<Lock size={16} />}
                            />
                            <Button onPress={handleLogin} className="w-full" color="danger" size="lg">
                                Time out
                            </Button>
                            <p className="cursor-pointer hover:underline text-md self-center transition-colors-opacity" onClick={() => setInOrOut(!inOrOut)}>Switch to Time In</p>
                        </div>
                    </Card>
            }
        </div>
    );
};

export default AttendanceTracker;