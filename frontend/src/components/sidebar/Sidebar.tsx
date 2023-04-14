import styles from "@/styles/layout/sidebar.module.css";
import Image from 'next/image';
import Link from 'next/link'
import ListIcon from "../icons/list-icon";

type SidebarProps = {};
export default function Sidebar(props: SidebarProps) {
  return (
    <section className='sidebar'>
      <div className={styles.sidebar__header}>
        <Image
          className={`${styles.sidebar__logo} rounded-circle`}
          width={70}
          height={70}
          src="/coding_factory_icon.svg"
          alt="Coding factory icon" />

        <h2 className={styles.sidebar__app_title}>Coding factory admin</h2>
      </div>

      <span className={styles.sidebar__separator} />

      <ul>
        <li>
          <ListIcon width={20} height={15} />
          <Link className="ms-2" href="/promotions">Promotions</Link>
        </li>
      </ul>
    </section>
  )
}