"use client"
//react
import { useState, useEffect } from "react";
import styles from "./header.module.css"

import Logo from '@/public/logo.png'
//Material Icons
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import MessageIcon from '@mui/icons-material/Message';
//Material Components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
//next
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from "next/navigation";
//my components
import Modal from "@/app/components/modal/modal";
import MenuSide from "@/app/components/modalMenuSide/menuSide";
import MessengesSide from "@/app/components/modalMessengesSide/messengesSide";
import SignIn from "@/app/login/page";
//redux
import { useSelector } from "react-redux";
import {
    selectIsLoggedIn
} from '@/app/redux/features/IsLoggedIn/IsLoggedInSlice'
import {
    selectCurrentUser
} from '@/app/redux/features/currentUser/currentUserSlice'
//helpers
import { excludedPath, isDefinedPathForHeader } from "@/app/helpers/helperFunctions";

function Header() {

    const [modalPosition, setModalPosition] = useState("")

    const closeModal = () => setModalPosition("")
    const openSignInModal = () => setModalPosition("middle")
    const openMenuModal = () => setModalPosition("left")
    const openMessagesModal = () => setModalPosition("right")

    const IsLoggedIn = useSelector(selectIsLoggedIn)
    const currentUser = useSelector(selectCurrentUser)

    const pathname = usePathname()

    useEffect(() => {
        if (modalPosition) {
            document.body.classList.add("hideOverflowContentOnModalOpen")
        }
        return () => document.body.classList.remove("hideOverflowContentOnModalOpen")
    }, [modalPosition])

    return (
        <>
            {modalPosition &&
                <Modal position={modalPosition} closeModal={closeModal}>
                    {modalPosition === "left" ? <MenuSide closeModal={closeModal} /> : modalPosition === "right" ? <MessengesSide closeModal={closeModal} /> : modalPosition === "middle" ? <SignIn closeModal={closeModal} /> : null}
                </Modal>}

            {isDefinedPathForHeader(pathname) || pathname.includes('/cars/') || pathname.includes("/dealers/")
                ?
                <header className={styles.header}>
                    <IconButton className={styles.MenuButton} onClick={openMenuModal}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                    <Link href="/" className={styles.Logo}>
                        <Image
                            priority
                            src={Logo}
                            fill
                            alt="Logo"
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                    <div className={styles.serachInput}>
                        <TextField fullWidth size="small" id="outlined-basic" label="mark , model , year" variant="outlined" />
                    </div>
                    <div className={styles.delaers_messages_login_sell}>
                        <Link href="/dealers" className={styles.dealers}>
                            <DirectionsCarFilledIcon fontSize="large" color="primary" />
                            <p>Dealers</p>
                        </Link>

                        <Link onClick={IsLoggedIn ? null : openMessagesModal} href={IsLoggedIn ? '/messages' : pathname} className={styles.messages}>
                            <MessageIcon fontSize="large" color="primary" />
                            <p>Messages</p>
                        </Link>
                        {IsLoggedIn
                            ? <div onClick={openMenuModal} className={styles.LoggedInInterface}>
                                <Avatar sx={{ backgroundColor: '#1976D2' }} alt="Remy Sharp" src={currentUser.AvatarUrl} />
                                <p>My Account</p>
                            </div>
                            :
                            <div className={styles.NotLoggedInAInterface}>
                                <Button className={styles.signInBtn} variant="text" onClick={openSignInModal}>Sign In</Button>
                                <Link href='/sign-up'>
                                    <Button className={styles.signUpBtn} variant="outlined">Sign Up</Button>
                                </Link>
                            </div>
                        }
                        <Link href={IsLoggedIn === true ? '/sell' : '/'} className={styles.sell}>
                            <Button variant="contained">Sell</Button>
                        </Link>
                    </div>
                </header>
                :
                excludedPath(pathname)
                    ?
                    <header className={styles.headerWithOnlyIconVariant}>
                        <div className={styles.Logo}>
                            <Link href="/">
                                <Image
                                    priority
                                    src={Logo}
                                    fill
                                    alt="Logo"
                                    style={{ objectFit: "cover" }}
                                />
                            </Link>
                        </div>
                    </header>
                    : null
            }
        </>
    )
}

export default Header