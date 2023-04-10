import { Table, Button } from "react-bootstrap";
import styles from "@/styles/Promotions.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { getPromotions, Promotion } from "@/api/promotions";

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
      promotions
    }
  }
}

export default function Promotions({ promotions }: { promotions: Array<Promotion> }) {
  console.log(promotions)
  return (
    <div className="sidebar-layout">
      <Sidebar />
    
      <div className={styles.promotions_page}>
        <div className={styles.promotion_container}>
          <div className={styles.promotion_year_header}>
            <h2>2020 - 2022</h2>
            <Button variant="primary">
              Nouvelle promotion
            </Button>
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
                      role: "test_role"
                    }
                    return <PromotionRow key={promotion.id} promotion={promotionRow} />
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}