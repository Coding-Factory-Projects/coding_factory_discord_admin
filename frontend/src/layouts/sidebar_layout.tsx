import styles from "@/styles/layout/sidebar.module.css";
import Sidebar from "@/components/sidebar/Sidebar"
import { ReactElement, useEffect, useState } from "react"
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useRouter } from "next/router";

type SidebarLayoutProps = {
  title: string,
  children: ReactElement
}

export function SidebarLayout({ title, children }: SidebarLayoutProps) {
  const router = useRouter();

  const [path, setPath] = useState<Array<string>>([])

  useEffect(() => {
    const pathArray = router.asPath
      .split("/")
      .slice(1); // We slice here to remove the first element (which is always empty)
    setPath(pathArray);
  }, [router]);

  return (
    <main className="sidebar-layout">
      <Sidebar />

      <section>
        <h1 className={styles.sidebar__title}>{title}</h1>
        <Breadcrumb path={path} />

        <div className={styles.sidebar__content}>
          {children}
        </div>
      </section>
    </main>
  )
}