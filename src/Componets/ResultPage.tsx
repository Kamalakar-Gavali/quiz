import winLogo from '../Resources/winLogo.svg';

interface propT{
    score:number,
    fn:any
}
const Resultpage=({score,fn}:propT)=>{

    return (

<div className='flex flex-col justify-between items-center h-96'>
<img src={winLogo} className='w-64'/>
<div>
<h3 className='text-5xl font-bold font-Poppins text-primary'>Results</h3>
<p className='text-primary text-lg font-Poppins mt-4'>You got <span className='text-parrot text-4xl font-Poppins font-bold'>{score}</span> correct answers</p>
</div>
<button className='rounded-lg bg-white border-solid border-2 border-primary p-2 w-28 self-center hover:bg-hover hover:border-hover hover:text-white' onClick={()=>fn()} >Try Again</button>


</div>
    )
}

export default  Resultpage;