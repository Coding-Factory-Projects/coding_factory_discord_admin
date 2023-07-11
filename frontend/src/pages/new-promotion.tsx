import { createPromotion } from "@/api/promotions";
import { SidebarLayout } from "@/layouts/sidebar_layout";
import styles from '@/styles/new-promotion.module.css'
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, ReactElement, useCallback, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
}

function generateYearOptions(): ReactElement[] {
  const from = new Date().getFullYear()
  const to = from + 5;

  const elements: ReactElement[] = [];

  for(let i = from; i <= to; i++) {
    elements.push(
      <option value={i}>{i}</option>
    )
  }

  return elements;
}

export default function NewPromotion() {
  const router = useRouter();
  const [promotionName, setPromotionName] = useState("");
  const [campus, setCampus] = useState<string>('cergy');
  const [start_year, setStartYear] = useState(new Date().getFullYear());
  const [end_year, setEndYear] = useState(new Date().getFullYear() + 1);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const [hasFile, setHasFile] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null || e.target.files!.length > 0) {
      setHasFile(true)
      setCurrentFile(e.target.files![0])
    } else {
      setHasFile(false)
      setCurrentFile(null)
    }
  }, []);

  const onCampusChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCampus(e.target.value);
  }, []);

  const onYearChange = useCallback((date_type: 'start' | 'end') => {
    return (e: ChangeEvent<HTMLSelectElement>) => {
      if (date_type === 'start') {
        setStartYear(parseInt(e.target.value))
      } else {
        setEndYear(parseInt(e.target.value))
      }
    }
  }, [])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()
    
    setIsLoading(true);    
    const token = Cookies.get('token')!;

    // TODO: validate the inputs with a lib like zod

    createPromotion(token, promotionName, campus!, start_year, end_year, currentFile!)
        .then(() => {
            router.replace("/promotions")
        })
        .catch((e) => {
            // setError(buildErrorObjectFromStatus(e.status))
        })
        .finally(() => {
            setIsLoading(false);
        })
  }, [router, campus, currentFile, end_year, promotionName, start_year]);

  return (
    <SidebarLayout title="Nouvelle promotion">
      <div className={styles.new_promotion__content}>
        <div className={styles.new_promotion__form_container}>
          <Form className={styles.new_promotion__form} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nom de la promotion (*)</Form.Label>
              <Form.Control onChange={(e: ChangeEvent<HTMLInputElement>) => setPromotionName(e.target.value)} type="text" placeholder="ex. M2 Gaming Paris" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Campus (*)</Form.Label>
              <Form.Select value={start_year} onChange={onCampusChange} aria-label="Default select example">
                <option value="cergy">Cergy</option>
                <option value="paris">Paris</option>
              </Form.Select>
            </Form.Group>

            <Container style={{ padding: 0 }}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Année de début (*)</Form.Label>
                    <Form.Select onChange={onYearChange('start')} aria-label="Année de début de la formation">
                      {generateYearOptions()}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Année de fin (*)</Form.Label>
                    <Form.Select onChange={onYearChange('end')} aria-label="Année de fin de la formation">
                      {generateYearOptions()}
                    </Form.Select> 
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            <Form.Group>
              <Form.Label>Etudiants</Form.Label>
              <Form.Label className={styles.new_promotion__students_input} htmlFor="students-file">
                <Image
                  className={styles.csv_image}
                  alt="CSV icon"
                  width={150}
                  height={150}
                  src="/icons/csv.png"
                  />
                  {currentFile !== null ? currentFile.name: "Importer un fichier CSV"}
              </Form.Label>
              <Form.Control id="students-file" type="file" accept="text/csv" hidden onChange={handleFileChange} />
            </Form.Group>
            
            <Button className={styles.new_promotion__submit_btn} variant="primary" type="submit" disabled={isLoading}>
              {!isLoading?
                "Créer la promotion":
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className='mx-1'
                  />
                  <span className='mx-1'>Création de la promotion...</span>
                </>
              }
            </Button>
          </Form>
        </div>
      </div>
    </SidebarLayout>
  )
}