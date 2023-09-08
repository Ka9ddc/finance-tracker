import { DotWave } from '@uiball/loaders'

export default function Loader(){

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-slate-900 grid place-items-center z-50'>
            <DotWave size={47} speed={1} color="black"/>
        </div>
    )
}