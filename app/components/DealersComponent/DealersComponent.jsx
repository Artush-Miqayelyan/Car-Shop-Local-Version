'use client'

import React, { useEffect, useState } from 'react';
import styles from './DealersComponent.module.css'

import DealerCard from '../dealerCard/dealerCard';

function DelaersComponent() {

    const [dealers, setDealers] = useState(null)
    const [officialDealers, setOfficialDealers] = useState(null)

    useEffect(() => {
        fetch('http://localhost:4000/users?UserType=OfficalDiller').then(res => res.json()).then(res => setOfficialDealers(res))
    }, [])

    useEffect(() => {
        fetch('http://localhost:4000/users?UserType=Diller').then(res => res.json()).then(res => setDealers(res))
    }, [])

    return (
        <div className={styles.DealersComponent}>
            <h2>Official Dealers</h2>
            <div className={styles.currentDealerTypeContainer}>
                {officialDealers?.map((current) => {
                    return <DealerCard
                        key={current.id}
                        username={current.username}
                        AvatarUrl={current.AvatarUrl}
                    />
                })}
            </div>
            <h2>Dealers</h2>
            <div className={styles.currentDealerTypeContainer}>
                {dealers?.map((current) => {
                    return <DealerCard
                        key={current.id}
                        username={current.username}
                        AvatarUrl={current.AvatarUrl}
                    />
                })}
            </div>
        </div>
    );
}

export default DelaersComponent;