import styles from '@/styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import {ChangeEvent, FormEvent, useState} from "react";

export default function Home() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function handleEmailChange(event:ChangeEvent<HTMLInputElement>){
        setEmail(event.currentTarget.value)
    }
    function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.currentTarget.value)
    }
    function handleSubmit(event:FormEvent){
        event.preventDefault()
        console.log(email)
        console.log(password)
    }
  return (
    <div className='fullpage center-content'>
        <Form className={styles.form} onClick={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="email" className={styles.input} onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="mot de passe" className={styles.input} onChange={handlePasswordChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" className={styles.button}>
                Submit
            </Button>
        </Form>
    </div>
  )
}
