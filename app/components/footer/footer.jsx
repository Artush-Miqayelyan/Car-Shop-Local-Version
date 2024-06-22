"use client"

import styles from './footer.module.css'

import Logo from "@/public/logo.png"

import Link from 'next/link'
import Image from "next/image"
import { usePathname } from 'next/navigation'

import { isDefinedPathForfooter } from "@/app/helpers/helperFunctions"

function Footer() {
    const currentPath = usePathname()

    return <>
        {
            isDefinedPathForfooter(currentPath) || currentPath.includes('/cars/') || currentPath.includes("/dealers/")
                ? <div className={styles.footer}>
                    <Link href='/' className={styles.logo}>
                        <Image
                            priority
                            style={{ objectFit: "cover" }}
                            fill
                            src={Logo}
                            color="black"
                            alt="Logo"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                    <div className={styles.footerContent}>
                        <Link href="/about" > About project </Link>
                        <Link href="/rules" > Rules of use </Link>
                        <Link href="/advertisement" > Advertisement </Link>
                        <Link href="/contact" > Contact </Link>
                        <Link href="/help" > Help </Link>
                    </div>
                </div>
                : null
        }
    </>
}

export default Footer