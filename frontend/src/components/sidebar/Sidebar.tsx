import Link from 'next/link'

type SidebarProps = {};
export default function Sidebar(props: SidebarProps) {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <Link href="/promotions">Promotions</Link>
        </li>
      </ul>
    </div>
  )
}