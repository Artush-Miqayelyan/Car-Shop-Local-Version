"use client"

import { useEffect, useState } from "react";
import SingleCar from "@/app/components/allPage/singlCar/singlCar";
import { Pagination } from "@mui/material";
import styles from './page.module.css'

function Page({ params }) {

    useEffect(() => {
        fetch(`http://localhost:4000/users?username=${params.username}`).then(res => res.json()).then(res =>
            setUserOffers(res[0].offers)
        )
    }, [])

    const [userOffers, setUserOffers] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const handleOnChange = (e, p) => setCurrentPage(p)

    const perPage = 50
    const countPages = Math.ceil(userOffers?.length / perPage)
    const firstIndex = (currentPage - 1) * perPage
    const lastIndex = firstIndex + perPage
    const currentData = userOffers?.slice(firstIndex, lastIndex)

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [currentPage])

    return <div className={styles.offersContainer}>
        {currentData?.map(offer => <SingleCar
            key={offer.id}
            isSaved={false}
            car={offer}
        />)}
        <Pagination sx={{ marginTop: "25px" }} onChange={handleOnChange} page={currentPage} count={countPages} variant="outlined" shape="rounded" size='large' color='primary'/>
    </div>
}

export default Page;