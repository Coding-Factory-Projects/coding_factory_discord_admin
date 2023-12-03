import styles from "@/styles/layout/sidebar.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useRouter } from "next/router";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Cookies from "js-cookie";

type SidebarLayoutProps = {
    title: string;
    children: ReactElement;
};

const CSVFile = "http://localhost:3000/templates/sample.csv";

export function SidebarLayout({ title, children }: SidebarLayoutProps) {
    const router = useRouter();

    const [path, setPath] = useState<Array<string>>([]);

    useEffect(() => {
        const pathArray = router.asPath.split("/").slice(1); // We slice here to remove the first element (which is always empty)
        setPath(pathArray);
    }, [router]);

    const onClickLogout = useCallback(() => {
        Cookies.remove("token");
        router.replace("/");
    }, [router]);

    const downloadCSVFile = (url: string) => {
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute("download", fileName || "sample.csv");
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };

    return (
        <main className={styles.sidebar_layout}>
            <Sidebar />

            <section>
                <div className={styles.sidebar__content_header}>
                    <h1 className={styles.sidebar__title}>{title}</h1>

                    <div>
                        <Button
                            className={styles.btn_link}
                            variant="secondary"
                            onClick={() => downloadCSVFile(CSVFile)}
                        >
                            Télécharger le fichier CSV
                        </Button>
                    </div>

                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                            <Popover>
                                <Popover.Body>
                                    <Button
                                        className={styles.btn_link}
                                        variant="secondary"
                                        onClick={onClickLogout}
                                    >
                                        Se déconnecter
                                    </Button>
                                </Popover.Body>
                            </Popover>
                        }
                    >
                        <div className={styles.user_icon}></div>
                    </OverlayTrigger>
                </div>
                <Breadcrumb path={path} />

                <div className={styles.sidebar__content}>{children}</div>
            </section>
        </main>
    );
}
