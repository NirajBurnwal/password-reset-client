import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';


const PasswordReset = () => {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const inputHandler = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault()

        const res = await fetch("https://password-reset-5onz.onrender.com/sendpasswordlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        const data = await res.json()

        if (data.status === 201) {
            setEmail("")
            setMessage(true)
        } else {
            toast.error("Invalid User")
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your Email</h1>
                    </div>
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>password reset link send successfully in Your Email</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }} >Email</label>
                            <input type="email" name='email' id='email' value={email} onChange={inputHandler} placeholder='Enter Your Email Address' />
                        </div>
                        <button className='btn' onClick={sendLink} >Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default PasswordReset