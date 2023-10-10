import React from 'react'
import Link from 'next/link'

type Props = {
    href: string
    name: string
    active?: boolean
}

export default function NavItem(props: Props) {
    return (
        <li className={
            props.active
                ? 'nav-item active'
                : 'nav-item'
        }>
            <Link href={props.href}>
                {props.name}
            </Link>
        </li>
    )
}
