import styles from "@/styles/layout/sidebar.module.css";

type BreadcrumbProps = {
  path: Array<string>
};

export default function Breadcrumb({ path }: BreadcrumbProps) {
  return <div className={styles.sidebar__breadcrumb}>
    {path.map(part => (
      <>
        <span className="text-capitalize">{part}</span>
        <span className="color-accent mx-2 font-weight-bold">/</span>
      </>
    ))}
  </div>
}