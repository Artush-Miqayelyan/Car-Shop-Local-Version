"use client"

import React, { useState, useEffect } from "react";
import styles from "./homePageCarsOffers.module.css"

import { minimumVersion } from "./utils";

import { useSelector } from "react-redux";
import {
    selectCars
} from "@/app/redux/features/autoshop/autoshopSlice";
import {
    selectCurrentUser
} from '@/app/redux/features/currentUser/currentUserSlice'

import CarCard from "@/app/components/carcard/carCard";

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Link from "next/link";
import SavedOffers from "../SavedOffersComponent/SavedOffers";

function HomePageCarsOffers() {
    const cars = useSelector(selectCars);
    const currentUser = useSelector(selectCurrentUser)

    const [ontopOffers, setOntopOffers] = useState(null)
    const [urgentSaleOffers, setUrgentSaleOffers] = useState(null)
    const [officialDillerOffers, setOfficialDillerOffers] = useState(null)

    useEffect(() => {
        fetch('http://localhost:4000/cars?priority=ontop&_limit=15').then(res => res.json()).then(res => setOntopOffers(res))
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/cars?priority=urgent%20sale&_limit=15').then(res => res.json()).then(res => setUrgentSaleOffers(res))
    }, [])

    useEffect(() => {
        setOfficialDillerOffers(minimumVersion(cars, "isOfficialDiller", true))
    }, [])

    return <div className={styles.homePageCarsOffers}>
        <div className={styles.currentPriorityContainer}>
            <h3 className={styles.title}>Top Announcements</h3>
            <div className={styles.currentContainerContent}>
                {ontopOffers ? ontopOffers.map((currentOffer) => {
                    const isSaved = Boolean(currentUser.SavedOffers?.find(savedOffer => savedOffer.id === currentOffer.id))

                    return <CarCard
                        key={currentOffer.id}
                        isSaved={isSaved}
                        car={currentOffer}
                    />
                }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            </div>
            <Link href="/cars/all/ontop"><Button variant="contained" className={styles.showMoreButton}>Show all top offers</Button></Link>
        </div>
        <div className={styles.currentPriorityContainer}>
            <h3 className={styles.title}>Urgent Sale</h3>
            <div className={styles.currentContainerContent}>
                {urgentSaleOffers ? urgentSaleOffers.map((currentOffer) => {
                    const isSaved = Boolean(currentUser.SavedOffers?.find(savedOffer => savedOffer.id === currentOffer.id))

                    return <CarCard
                        key={currentOffer.id}
                        isSaved={isSaved}
                        car={currentOffer}
                    />
                }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            </div>
            <Link href="/cars/all/urgent"><Button variant="contained" className={styles.showMoreButton}>Show all urgent offers</Button></Link>
        </div>
    </div>
}

export default HomePageCarsOffers