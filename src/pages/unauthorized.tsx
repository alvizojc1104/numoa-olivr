const Unauthorized = () => {
    return (
        <div className='flex flex-col w-full h-screen items-center justify-center'>
            <h1 className="text-lg font-bold text-red-600">Unauthorized</h1>
            <p className="text-xs text-gray-600">You are not authorized to access this module.</p>
        </div>
    )
}

export default Unauthorized
