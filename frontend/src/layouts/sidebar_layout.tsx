import styles from "@/styles/layout/sidebar.module.css";
import Sidebar from "@/components/sidebar/Sidebar"
import { ReactElement } from "react"
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

type SidebarLayoutProps = {
  title: string,
  children: ReactElement
}

export function SidebarLayout({ title, children }: SidebarLayoutProps) {
  return (
    <main className="sidebar-layout">
      <Sidebar />

      <section>
        <h1 className={styles.sidebar__title}>{title}</h1>
        <Breadcrumb path={[ "promotions" ]} />

        <div className={styles.sidebar__content}>
          {children}
        </div>
      </section>
    </main>
  )
}