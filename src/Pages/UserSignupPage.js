import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import InputContainer from '../components/InputContainer'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'

// User sign up page
function UserSignupPage() {

    let navigate = useNavigate()

    // States of this page.
    // const [IDNumber, setIDNumber] = useState('');
    const [givenName, setGivenName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('')
    const [birthday, setBirthday] = useState('')
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {

        document.title = "Food Hub | Sign Up"
    }, [])

    /** Add the user to the database */
    async function addUser() {

        const res = await fetch('http://localhost:3001/add-user', {

            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({givenName, middleName, lastName, userName, mobileNumber, password, birthday})
        })

        const data = await res.json()

        if (JSON.parse(data).status === 200) {

            alert('Successfully registered!')
            navigate('/', {replace: true}) // navigate to the given url and replace the current active window.
        }  
    }

    /** Checks if the user is already registered */
    async function isAlreadyRegistered() {

        const res = await fetch('http://localhost:3001/get-user', {
                                method: 'POST', 
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({userName})
                            })
        const data = await res.json()

        if (JSON.parse(data).length > 0) {

            setErrorMessage('ID Number Already Registered')
        } 
        else if (mobileNumber.length > 11 || mobileNumber.length < 11) {
            setErrorMessage('Mobile Number is invalid. Please provide an 11-digit number starting with 09.')
        }
        else {

            if (password !== confirmationPassword)
                setErrorMessage('Password doesn\'t match');
            else
                addUser()
        }
    }

    /** Verify if the ID Number is existing at the school database. (ONLY STAFFS, STUDENTS, TEACHERS OF PNC CAN USE THIS APP) */
    async function verify_user () {

        // ROOT: http://localhost:3001/
        const res = await fetch('http://localhost:3001/verify-user', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userName})
            })
        const data = await res.json();
        
        if (JSON.parse(data).length > 0) {
            console.log(data);
            alert("Username is existing");
        } else {
            addUser();
        }
    }

    return (
        <div className="hero flex-col items-start mt-12 lg:mt-0 lg:items-center ">
            
            <div className="hero-content max-w-4xl w-full">

                <div className="card lg:p-5 lg:bordered lg:border max-w-md w-full">

                    <h1 className="card-title font-bold text-xl md:text-2xl text-foodHubColor1">Sign Up</h1>
                    
                    <form autoComplete="off"  className="form-control" onSubmit={(e) => {

                            e.preventDefault()
                            verify_user()
                        }}>
                        
                         <InputContainer name="givenName" type="text" labelContent="Given Name" value={givenName} onChange={
                            (e) => { 
                                setGivenName(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="middleName" type="text" labelContent="Middle Name" value={middleName} onChange={
                            (e) => { 
                                setMiddleName(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="lastName" type="text" labelContent="Last Name" value={lastName} onChange={
                            (e) => { 
                                setLastName(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="birthday" type="date" labelContent="birthday" value={birthday} onChange={
                            (e) => { 
                                setBirthday(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="username" type="text" labelContent="Username" value={userName} onChange={
                            (e) => { 
                                setUserName(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="mobile-number" type="number" labelContent="Mobile Number" value={mobileNumber} onChange={
                            (e) => { 
                                setMobileNumber(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="password" type="password" labelContent="Password" value={password} 
                        onChange={
                            (e) => { 
                                setPassword(e.target.value)
                                setErrorMessage('') 
                            }
                        }/>

                        <InputContainer name="confirm-password" type="password" labelContent="Confirm Password" value={confirmationPassword} 
                        onChange={(e) => {

                            setConfirmationPassword(e.target.value)
                            setErrorMessage('') 
                           }
                        }/>

                        <section>
                            <Button className="foodHubMainBtn" text="Sign Up"/>
                        </section>

                        <section className="flex justify-center mt-2">
                            <small className="text-pnc font-medium text-center sm:text-base my-3">Already have an account? <Link to="/" className="text-foodHubColor1 font-bold">Log In</Link> </small>
                        </section>
                    </form>

                    {errorMessage && <ErrorAlert errorMessage={errorMessage}/>}
                </div>
            </div>
        </div>
    )
}

export default UserSignupPage
