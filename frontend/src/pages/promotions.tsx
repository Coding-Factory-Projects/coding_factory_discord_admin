import { Table, Button } from "react-bootstrap";
import styles from "@/styles/Promotions.module.css";
import { archivePromotion, getPromotions, makePromotionsNewYear, Promotion } from "@/api/promotions";
import { PromotionsByYear, buildYearlyPromotions } from "@/utilities/build_yearly_promotions"
import { SidebarLayout } from "@/layouts/sidebar_layout";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { ConfirmNextYearDialog } from "@/components/dialogs/ConfirmDialog";
import Cookies from "js-cookie";
import { useDialog } from "@/components/dialogs/hooks";

type PromotionRow = {
  id: string;
  name: string;
  moderator: string;
  role: string;
}

type PromotionRowProps = {
  promotion: PromotionRow,
  onDeleteClicked: (id: string) => void
}

function PromotionRow(props: PromotionRowProps) {
  return (
    <tr>
      <td>{props.promotion.name}</td>
      <td>{props.promotion.moderator}</td>
      <td>{props.promotion.role}</td>
      <td className={styles.promotions_table__actions_cell}>
        <Button variant="primary" style={{ padding: '5px !important' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 30, height: 30 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </Button>
        <Button variant="primary" style={{ padding: '5px !important', marginInlineStart: 5 }} onClick={() => props.onDeleteClicked(props.promotion.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 30, height: 30 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </Button>
      </td>
    </tr>
  )
}

export async function getServerSideProps(context: any) {
  const token = context.req.cookies['token'];
  
  try {
    const promotions = await getPromotions(token);
    return {
      props: {
        promotionsByYear: buildYearlyPromotions(promotions),
        apiUrl: process.env.API_URL
      }
    }
  } catch (exception) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    } 
  }
}

export default function Promotions({ promotionsByYear, apiUrl }: { promotionsByYear: PromotionsByYear, apiUrl: string }) {
  const router = useRouter()
  const confirmDialogHook = useDialog()

  const onNewPromotionClicked = useCallback(() => {
    router.push("/new-promotion");
  }, [router])

  const onDelete = useCallback(async (id: string) => {
    const token = Cookies.get('token')!;
    await archivePromotion(apiUrl, token, id);
    router.reload()
  }, [apiUrl, router])

  const onNewYearConfirmed = useCallback(async () => {
    try {
      const token = Cookies.get('token')!;
      await makePromotionsNewYear(apiUrl, token);
      router.reload()
    } finally {
      confirmDialogHook.close()
    }

  }, [router, apiUrl, confirmDialogHook]);

  return (
    <SidebarLayout title="Promotions">
      <div className={styles.promotions_page}>
        {promotionsByYear.map(({start_year, end_year, promotions}, index) => (
          <div key={`${start_year}-${end_year}`} className={styles.promotion_container}>
              <div className={styles.promotion_year_header}>
                <h2>{start_year} - {end_year}</h2>
                {index == 0 ? (
                  <div className={styles.promotions__buttons_container}>
                    <Button variant="secondary" onClick={() => confirmDialogHook.open()}>
                      Nouvelle année
                    </Button>
                    <Button variant="primary" onClick={onNewPromotionClicked}>
                      Nouvelle promotion
                    </Button>
                  </div>
                ): null}
              </div>
              <div className={styles.table_container}>
                <Table className={styles.promotions_table}>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Modérateur</th>
                      <th>Rôle</th>
                      <th></th> {/* Actions row */}
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map(
                      (promotion: Promotion) => {
                        const moderator = promotion.students? promotion.students.find((student: any) => student.is_moderator): null;
                        const promotionRow: PromotionRow = {
                          id: promotion.id.toString(),
                          moderator: moderator? moderator: "Aucun modérateur",
                          name: promotion.name,
                          role: promotion.discord_role_id
                        }
                        return <PromotionRow key={promotion.id} promotion={promotionRow} onDeleteClicked={(id: string) => onDelete(id)} />
                      })}
                  </tbody>
                </Table>
              </div>
          </div>
        ))}
        <ConfirmNextYearDialog show={confirmDialogHook.show} onConfirm={onNewYearConfirmed} handleClose={confirmDialogHook.close} />
      </div>
    </SidebarLayout>
  )
}