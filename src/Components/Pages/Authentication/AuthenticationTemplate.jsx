const AuthenticationTemplate = ({children}) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 min-h-[5rem]">
            </div>
            <div className="bg-gray-200 h-full flex justify-center align-center">
                <div className="flex flex-col justify-center align-center gap-6 min-w-[30rem]">
                    {children}
                </div>
            </div>
            <div className="bg-gray-900 min-h-[5rem]">
            </div>
        </div>
    )
}
export default AuthenticationTemplate;