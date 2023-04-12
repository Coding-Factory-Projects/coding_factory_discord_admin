import { Table, Button } from "react-bootstrap";
import styles from "@/styles/Promotions.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { getPromotions, Promotion } from "@/api/promotions";
import { PromotionsByYear, buildYearlyPromotions } from "@/utilities/build_yearly_promotions"

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
      <td>
        <Button variant="primary">
          Edit
        </Button>
      </td>
    </tr>
  )
}

export async function getServerSideProps() {
  const promotions = await getPromotions();

  return {
    props: {
      promotionsByYear: buildYearlyPromotions(promotions)
    }
  }
}

export default function Promotions({ promotionsByYear }: { promotionsByYear: PromotionsByYear }) {
  return (
    <div className="sidebar-layout">
      <Sidebar />
    
      <div className={styles.promotions_page}>
        {promotionsByYear.map(({start_year, end_year, promotions}, index) => (
          <div key={`${start_year}-${end_year}`} className={styles.promotion_container}>
              <div className={styles.promotion_year_header}>
                <h2>{start_year} - {end_year}</h2>
                {index == 0 ? (
                  <Button variant="primary">
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
    </div>
  )
}