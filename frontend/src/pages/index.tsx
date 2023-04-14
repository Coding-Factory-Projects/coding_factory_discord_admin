import styles from '@/styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import {Form, Spinner, ToastContainer} from "react-bootstrap";
import {ChangeEvent, FormEvent, useCallback, useState} from "react";
import { login } from '@/api/auth';
import { useRouter } from 'next/router';
import { ErrorToast } from '@/components/toasts';
import { buildErrorObjectFromStatus } from '@/utilities/build_error_object';

export default function Home() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ title: string, message: string } | null>(null);

    const router = useRouter();

    const handleEmailChange = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }, [])

    const handlePasswordChange = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }, [])

    const handleSubmit = useCallback((event:FormEvent) => {
        event.preventDefault()
    
        setIsLoading(true);    
        login(email, password)
            .then(() => {
                router.replace("/promotions")
            })
            .catch((e) => {
                setError(buildErrorObjectFromStatus(e.status))
            })
            .finally(() => {
                setIsLoading(false);
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
                <Button variant="primary" type="submit" disabled={isLoading} className={styles.button}>
                    {!isLoading?
                        "Submit":
                        <>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className='mx-1'
                            />
                            <span className='mx-1'>Connexion...</span>
                        </>
                    }
                </Button>
                <ToastContainer position="bottom-end">
                    <ErrorToast
                        show={error !== null} 
                        onClose={() => setError(null)} 
                        title={error?.title ?? ""} 
                        message={error?.message ?? ""} />
                </ToastContainer>
            </Form>
        </div>
    )
}
