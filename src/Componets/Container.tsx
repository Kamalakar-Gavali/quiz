import { useEffect, useState, MouseEvent } from 'react';
import { getAllJSDocTags } from 'typescript';
import { setFlagsFromString } from 'v8';
import frontLogo from '../Resources/frontLogo.svg';
import Resultpage from './ResultPage';

const Container = () => {
    const [countries, setCountries] = useState<any>([]);
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<any>([]);
    const [answer, setAnswer] = useState<string>('');
    const [flag, setFlag] = useState<string>('')
    const [answered, setAnswered] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [endGame, setEndGame] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const getData = async () => {
        await fetch('https://restcountries.com/v2/all').then((res) => res.json()).then((data) => setCountries(data));
        console.log('cs');
    }


    const getRandomOptions = (answerIndex: number, noOfOptions: number, availableOptionsLength: number) => {
        let arr = [];
        arr.push(countries[answerIndex].name);
        for (let i = 1; i < noOfOptions; i++) {
            let index = Math.round(Math.random() * availableOptionsLength);
            let randomOptionIndex: number = arr.includes(countries[index].name) ? (index + 1) : index;
            arr.push(countries[randomOptionIndex].name)

        }
        arr.sort((data) => Math.random() - 0.5);
        setOptions(arr);

    }
    const getRandomQuestion = () => {
        setAnswered(false);
        if (endGame == false) {

            if (answer == selectedValue) {
                if (countries) {
                    let maxLength: number = countries?.length;

                    let rNum = Math.round(Math.random() * maxLength)

                    let questionType = Math.round(Math.random());
                    console.log('a', rNum)
                    console.log('b', rNum)
                    if (questionType == 0)//capital
                    {

                        setQuestion(`${countries[rNum].capital} is the capital of`);
                        setAnswer(`${countries[rNum].name}`)
                        setFlag('');
                        getRandomOptions(rNum, 4, maxLength)
                    }
                    else { //flag
                        setQuestion(`Which country does this flag belong to?`);
                        setFlag(`${countries[rNum].flag}`);
                        setAnswer(`${countries[rNum].name}`)
                        getRandomOptions(rNum, 4, maxLength)

                    }


                }
            }
            else {
                setEndGame(true)
            }
        }
    }
    const checkAnswer = (value: string) => {
        setAnswered(true);
        setSelectedValue(value);
        if (value == answer) {
            setScore((prev) => prev + 1)
        }

    }
    const restart = async () => {
        console.log('jj');
        // debugger;

        await setSelectedValue('');
        await setAnswer('');
        console.log('answer', answer);
        console.log('selectedva', selectedValue);
        setEndGame(false);
        setScore(0)


    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (countries.length > 0) {
            getRandomQuestion();
        }
    }, [countries, endGame])


    return (
        <div className="w-screen h-screen  bg-cover bg-no-repeat bg-back p-5 flex flex-col justify-center items-center" >
            <div className='w-full h-full sm:w-1/2 flex flex-col justify-center items-center max-w-sm'>
                <h1 className={`font-bold font-Poppins text-white text-4xl w-full  mb-5 ${ endGame?'text-center':'text-left'}`}>Country Quiz</h1>


                <div className='w-full sm:w-1.5/2 flex-col justify-between bg-white  rounded-xl p-5'>
                    {endGame == false ? <>
                        <div className='flex justify-end'>

                            <img className='w-1/3  bg-no-repeat h-1/3 -mt-20' src={frontLogo} />
                        </div>
                        <div className='mt-2'>
                            {flag &&
                                <img src={flag} className='h-16' style={{ aspectRatio: '1.3' }} />
                            }
                            <p className='text-2xl font-bold font-Poppins text-left text-primary mt-1'>{question}</p>
                            <ol className='flex flex-col justify-evenly h-60' style={{ counterReset: 'item', listStyleType: 'none' }}>
                                {
                                    options.map((option: string) => {

                                        return <li key={option} className={`olStyle p-2 text-left hover:text-white hover:bg-hover hover:border-hover cursor-pointer ${answered && (selectedValue == option) && 'incorrect'} ${answered && (answer == option) && 'correct'} ${answered && 'pointer-events-none'}`} onClick={(e) => checkAnswer(option)}>
                                            <span className='inline-flex justify-between w-11/12'>
                                                <span className='ml-5'>{option}</span>
                                                {
                                                    answered && ((answer == option) ? (
                                                        <span className="material-icons">
                                                            done
                                                        </span>
                                                    ) : ((option == selectedValue) && (option != answer) ? <span className="material-icons">
                                                        clear
                                                    </span> : ''
                                                    )
                                                    )
                                                }
                                            </span>
                                        </li>
                                    })
                                }
                            </ol>
                            {
                                answered &&
                                <div className='flex justify-end w-full'>
                                    <button className='bg-hover border-hover rounded-lg p-2 w-28 text-white' onClick={getRandomQuestion}>Next</button>
                                </div>
                            }
                        </div>
                    </>
                        : <Resultpage score={score} fn={() => restart()} />





                    }
                </div>

                

            </div>
            <footer className='font-Poppins text-white '>Built with <span className="material-icons align-middle text-red-600">favorite</span> by Kamalakar Gavali</footer>
        </div>
    )

}
export default Container;