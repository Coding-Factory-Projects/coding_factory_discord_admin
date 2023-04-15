import { SidebarLayout } from "@/layouts/sidebar_layout";

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
}

export default function NewPromotion() {
  return (
    <SidebarLayout title="Nouvelle promotion">
      <div>
        Page nouvelle promotion
      </div>
    </SidebarLayout>
  )
}