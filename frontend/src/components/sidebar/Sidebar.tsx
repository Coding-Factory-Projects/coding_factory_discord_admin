import Link from 'next/link'

type SidebarProps = {};
export default function Sidebar(props: SidebarProps) {
  return (
    <section className='sidebar'>
      <ul>
        <li>
          <Link href="/promotions">Promotions</Link>
        </li>
      </ul>
    </section>
  )
}