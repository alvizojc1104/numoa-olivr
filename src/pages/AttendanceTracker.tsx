import { Button } from "@nextui-org/react";
import moment from "moment";
import { useState } from "react";
import QRCode from "react-qr-code";
const AttendanceTracker = () => {
    const [selectAttendanceEntry, setSelectAttendanceEntry] = useState<string | null>(null)
    const url = `https://nuolivr.netlify.app/attendance/${moment(new Date).format("MM-DD-yyyy-hh:mm:s")}/user_iddquih21o8yjae/true`; // URL that users will be redirected to

    return !selectAttendanceEntry ? (
        <div className="flex flex-col h-screen justify-center items-center">
            <Button onPress={() => setSelectAttendanceEntry("time-in")} color="success">Time In</Button>
            <Button onPress={() => setSelectAttendanceEntry("time-in")} color="danger">Time Out</Button>
        </div>
    ) : (
        <div className="flex flex-col h-screen justify-center items-center">
            <QRCode value={url} size={200} />
            <p>Scan to open: {url}</p>
        </div>
    )
}

export default AttendanceTracker
