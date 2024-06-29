import { useAppContext } from '../appContext/JobSearchProvider'
import Lottie from 'react-lottie';
import loadAnimation from '../assets/images/loadAnimation.json'
function SpinnerLoader() {
    const { loading } = useAppContext()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        loading ?
            <div className='fixed inset-0 z-50 bg-black/20 flex items-center justify-center '>
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                />
            </div> : <></>
    )
}

export default SpinnerLoader