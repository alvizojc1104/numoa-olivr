import { title } from '../components/primitives'

const PageNotFound = () => {
    return (
        <div className='flex w-full h-screen items-center justify-center'>
            <h1 className={title({ size: "md" })}>404 Page Not Found</h1>
        </div>
    )
}

export default PageNotFound
