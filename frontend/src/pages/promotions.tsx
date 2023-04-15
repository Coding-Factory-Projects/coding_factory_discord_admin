import { Table, Button } from "react-bootstrap";
import styles from "@/styles/Promotions.module.css";
import { getPromotions, Promotion } from "@/api/promotions";
import { PromotionsByYear, buildYearlyPromotions } from "@/utilities/build_yearly_promotions"
import { SidebarLayout } from "@/layouts/sidebar_layout";
import { useCallback } from "react";
import { useRouter } from "next/router";

type PromotionRow = {
  id: string;
  name: string;
  moderator: string;
  role: string;
}

type PromotionRowProps = {
  promotion: PromotionRow
}

function PromotionRow(props: PromotionRowProps) {
  return (
    <tr>
      <td>{props.promotion.name}</td>
      <td>{props.promotion.moderator}</td>
      <td>{props.promotion.role}</td>
      <td className={styles.promotions_table__actions_cell}>
        <Button variant="primary" style={{ padding: '10px !important' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 30, height: 30 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </Button>
      </td>
    </tr>
  )
}

export async function getServerSideProps(context: any) {
  const token = context.req.cookies['token'];
  const promotions = await getPromotions(token);

  return {
    props: {
      promotionsByYear: buildYearlyPromotions(promotions)
    }
  }
}

export default function Promotions({ promotionsByYear }: { promotionsByYear: PromotionsByYear }) {
  const router = useRouter()

  const onNewPromotionClicked = useCallback(() => {
    router.push("/new-promotion");
  }, [router])

  return (
    <SidebarLayout title="Promotions">
      <div className={styles.promotions_page}>
        {promotionsByYear.map(({start_year, end_year, promotions}, index) => (
          <div key={`${start_year}-${end_year}`} className={styles.promotion_container}>
              <div className={styles.promotion_year_header}>
                <h2>{start_year} - {end_year}</h2>
                {index == 0 ? (
                  <Button variant="primary" onClick={onNewPromotionClicked}>
                    Nouvelle promotion
                  </Button>
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
                        return <PromotionRow key={promotion.id} promotion={promotionRow} />
                      })}
                  </tbody>
                </Table>
              </div>
          </div>
        ))}
      </div>
    </SidebarLayout>
  )
}