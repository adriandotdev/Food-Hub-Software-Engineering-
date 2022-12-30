import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import InputContainer from '../components/InputContainer'
import Button from '../components/Button'
import ErrorAlert from '../components/ErrorAlert'
import InputMainContainer from '../components/InputMainContainer'

// User sign up page
function UserSignupPage() {

    let navigate = useNavigate()

    // States of this page.
    // const [IDNumber, setIDNumber] = useState('');
    const [givenName, setGivenName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // ERROR MESSAGES STATES
    const [givenNameError, setGivenNameError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [middleNameError, setMiddleNameError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [lastNameError, setLastNameError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [birthdayError, setBirthdayError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [usernameError, setUsernameError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [mobileNumberError, setMobileNumberError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [passwordError, setPasswordError] = useState({toShow: false, errorMessage: 'This field is required'});
    const [confirmPasswordError, setConfirmPasswordError] = useState({toShow: false, errorMessage: 'This field is required'});

    const [isAllRequirementsMet, setIsAllRequirementsMet] = useState(false);

    const usernameValidPattern = /\w{8,}/;
    const mobileNumberValidPattern = /09\d{9,9}/;

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
            console.log('IT IS EXISTISNG')
            alert("Username is existing");
        } else {
            addUser();
        }
    }

    function HideErrorMessages(setInputError, error, e) {

        setErrorMessage('');
        setInputError({errorMessage: 'This field is required.', toShow: false});
        e.target.classList.remove('onBlur');
    }

    function ShowErrorMessage(setInputError, error, e) {
        e.target.classList.add('onBlur');
        setInputError({...error, toShow: true});
    }

    return (
        <div className="hero flex-col items-start mt-12 lg:mt-0 lg:items-center ">
            
            <div className="hero-content max-w-4xl w-full">

                <div className="card lg:p-5 lg:bordered lg:border max-w-md w-full">

                    <h1 className="card-title font-bold text-xl md:text-2xl text-foodHubColor1">Sign Up</h1>
                    
                    <form autoComplete="off"  className="form-control" onSubmit={(e) => {

                            e.preventDefault()

                            if (isAllRequirementsMet)
                                verify_user();
                        }}>
                        
                        {/* Given Name */}
                        <InputMainContainer name="givenName" type="text" labelContent="Given Name" value={givenName} setValue={setGivenName} error={givenNameError} setError={setGivenNameError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />
                        
                        {/* Middle Name */}
                        <InputMainContainer name="middleName" type="text" labelContent="Middle Name" value={middleName} setValue={setMiddleName} error={middleNameError} setError={setMiddleNameError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />

                        {/* Last Name */}
                        <InputMainContainer name="lastName" type="text" labelContent="Last Name" value={lastName} setValue={setLastName} error={lastNameError} setError={setLastNameError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />

                        {/* Date of Birth */}
                        <InputMainContainer name="birthday" type="date" labelContent="Date of Birth" value={birthday} setValue={setBirthday} error={birthdayError} setError={setBirthdayError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />

                        {/* Mobile Number */}
                        <InputMainContainer name="mobile-number" type="tel" labelContent="Mobile Number" value={mobileNumber} setValue={setMobileNumber} error={mobileNumberError} setError={setMobileNumberError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                            onChange={(e) => {
                                
                                setMobileNumber(e.target.value);
                                HideErrorMessages(setMobileNumberError, mobileNumberError, e);
                            }}
                        />

                        {/* Username */}
                        <InputMainContainer name="username" type="text" labelContent="Username" value={userName} setValue={setUserName} error={usernameError} setError={setUsernameError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                            onChange={(e) => {

                                setUserName(e.target.value);
                                HideErrorMessages(setUsernameError, usernameError, e);
                            }}
                        />

                        {/* Password */}
                        <InputMainContainer name="password" type="password" labelContent="Password" value={password} setValue={setPassword} error={passwordError} setError={setPasswordError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />

                        {/* Confirmation Password */}
                         <InputMainContainer name="confirm-password" type="password" labelContent="Confirm Password" value={confirmationPassword} setValue={setConfirmationPassword} error={confirmPasswordError} setError={setConfirmPasswordError}
                            HideErrorMessages={HideErrorMessages} ShowErrorMessage={ShowErrorMessage}
                        />
 
                        <section>
                            <Button className="foodHubMainBtn mt-4" text="Sign Up" onClick={(e) => {
                                
                                if (userName && !String(userName).match(usernameValidPattern)) {
                                    
                                    setUsernameError({toShow: true, errorMessage: 'Username is invalid. It must only consist alphanumeric characters such as letters, numbers, and underscore (_). Username must be atleast 8 characters long.'});
                                    document.getElementById('username').classList.add('onBlur');
                                }

                                if (password && confirmationPassword && password !== confirmationPassword) {

                                    setConfirmPasswordError({toShow: true, errorMessage: 'Password does not match. Make sure that confirmation password is matched.'});
                                    document.getElementById('confirm-password').classList.add('onBlur');
                                }

                                if (mobileNumber && (!String(mobileNumber).match(mobileNumberValidPattern) || mobileNumber.length > 11)) {
                                    setMobileNumberError({toShow: true, errorMessage: 'You must enter a valid mobile number. It must be start in 09 and have a length of 11. Example format: 09123451234'});
                                    document.getElementById('mobile-number').classList.add('onBlur');
                                }

                                if (!givenName || !middleName || !lastName || !birthday)
                                    return; 
                                
                                if (String(userName).match(usernameValidPattern) && mobileNumber.length === 11 && password === confirmationPassword
                                    && String(mobileNumber).match(mobileNumberValidPattern)) {
                                        console.log("IT IS MET")
                                    setIsAllRequirementsMet(true);
                                    // e.target.disabled = true;
                                }

                                
                            }}/>
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
