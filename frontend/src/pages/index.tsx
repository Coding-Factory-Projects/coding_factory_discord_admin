import styles from '@/styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import { login } from '@/api/auth';
import { useRouter } from 'next/router';

export default function Home() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const router = useRouter();

    const handleEmailChange = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }, [])

    const handlePasswordChange = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }, [])

    const handleSubmit = useCallback((event:FormEvent) => {
        event.preventDefault()
    
        login(email, password).then(() => {
            router.replace("/promotions")
        })
    }, [email, password, router])
    return (
        <div className='fullpage center-content'>
            <Form className={styles.form} onSubmit={handleSubmit}>
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
