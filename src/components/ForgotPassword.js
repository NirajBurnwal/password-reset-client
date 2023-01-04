import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {

    const { id, token } = useParams()

    const history = useNavigate()

    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")

    const userValid = async () => {
        const res = await fetch(`https://password-reset-5onz.onrender.com/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
        })
        const data = await res.json()

        if (data.status === 201) {
            console.log("User Valid");
        } else {
            history("*")
        }
    }

    const setVal = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault()

        const res = await fetch(`https://password-reset-5onz.onrender.com/${id}/${token}`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        })

        const data = await res.json()

        if (data.status === 201) {
            setPassword("")
            setMessage(true)
        } else {
            toast.error("!Token Expired generate new link")
        }

    }


    useEffect(() => {
        userValid()
    }, [])

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password</h1>
                    </div>

                    <form>
                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                        <div className="form_input">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name='password' id='password' value={password} onChange={setVal} placeholder='Enter Your New Password' />
                        </div>
                        <button className='btn' onClick={sendpassword} >Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default ForgotPassword