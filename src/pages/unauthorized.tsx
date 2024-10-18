import LoginLayout from "@/layouts/LoginLayout"

const Unauthorized = () => {
    return (
        <LoginLayout>
            <div className='flex flex-1 flex-col w-full h-screen items-center justify-center'>
                <h1 className="text-lg font-bold text-red-600">Unauthorized</h1>
                <p className="text-sm text-gray-600">NU Vision for students in web will be available soon.</p>
            </div>
        </LoginLayout>
    )
}

export default Unauthorized
