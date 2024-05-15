"use client"

import React, { useEffect, useState } from "react";
import styles from "./main.module.css";

import { minimumVersion } from "./utils";

import { useSelector } from "react-redux"

import {
  selectCars
} from "../../redux/features/autoshop/autoshopSlice";

import CarCard from "../carcard/carCard";
import Link from "next/link";

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

function Main() {
  const cars = useSelector(selectCars);

  const [ontop, setOntop] = useState(true)
  const [urgentSale, setUrgentSale] = useState(true)
  const [officialDiller, setOfficialDiller] = useState(true)

  const minOntop = minimumVersion(cars, "priority", "ontop");
  const minUrgentSale = minimumVersion(cars, "priority", "urgent sale");
  const minOfficialDiller = minimumVersion(cars, "isOfficialDiller", true);

  return (
    <section className={styles.main} >
      <div className={styles.topAnnouncements}>
        <h3 className={styles.title}>Top Announcements</h3>
        <div className={styles.carsContainer}>
          {ontop ? <>
            {minOntop.length ? minOntop.map((car) => {
              return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                <CarCard
                  key={car.id}
                  img={car.img[0].imgUrl}
                  price={car.price}
                  year={car.year}
                  mark={car.brand}
                  model={car.model}
                  priority={car.priority}
                />
              </Link>
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
           <Link href="/cars/all/emphatic"><Button variant="contained">Show all top offers</Button></Link> 
          </> : <>
            {cars.length ? cars.map((car) => {
              if (car.priority === "ontop") {
                return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                  <CarCard
                    key={car.id}
                    img={car.img[0].imgUrl}
                    price={car.price}
                    year={car.year}
                    mark={car.brand}
                    model={car.model}
                    priority={car.priority}
                  />
                </Link>
              }
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            <Button variant="contained" onClick={() => setOntop(!ontop)}>Show less</Button>
          </>}
        </div>
      </div>
      <div className={styles.urgentSale} >
        <h3 className={styles.title}>Urgent Sale</h3>
        <div className={styles.carsContainer}>
          {urgentSale ? <>
            {minUrgentSale.length ? minUrgentSale.map((car) => {
              return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                <CarCard
                  key={car.id}
                  img={car.img[0].imgUrl}
                  price={car.price}
                  year={car.year}
                  mark={car.brand}
                  model={car.model}
                  priority={car.priority}
                />
              </Link>
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
           <Link href="/cars/all/urgent"><Button variant="contained">Show all urgent offers</Button></Link> 
          </> : <>
            {cars.length ? cars.map((car) => {
              if (car.priority === "urgent sale") {
                return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                  <CarCard
                    key={car.id}
                    img={car.img[0].imgUrl}
                    price={car.price}
                    year={car.year}
                    mark={car.brand}
                    model={car.model}
                    priority={car.priority}
                  />
                </Link>
              }
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            <Button variant="contained" onClick={() => setUrgentSale(!urgentSale)}>Show less</Button>
          </>
          }
        </div>
      </div>
      <div className={styles.dealersOffers}>
        <h3 className={styles.title}>Offers from dealers</h3>
        <div className={styles.carsContainer}>
          {officialDiller ? <>
            {minOfficialDiller.length ? minOfficialDiller.map((car) => {
              return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                <CarCard
                  key={car.id}
                  img={car.img[0].imgUrl}
                  price={car.price}
                  year={car.year}
                  mark={car.brand}
                  model={car.model}
                  priority={car.priority}
                />
              </Link>
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            <Button variant="contained" onClick={() => setOfficialDiller(!officialDiller)}>Show more</Button>
          </> : <>
            {cars.length ? cars.map((car) => {
              if (car.isOfficialDiller === true) {
                return <Link className={styles.SingleCarLink} href={`/cars/${car.id}`} >
                  <CarCard
                    key={car.id}
                    img={car.img[0].imgUrl}
                    price={car.price}
                    year={car.year}
                    mark={car.brand}
                    model={car.model}
                    priority={car.priority}
                  />
                </Link>
              }
            }) : <Skeleton variant="rectangular" width={1100} height={800} />}
            <Button variant="contained" onClick={() => setOfficialDiller(!officialDiller)}>Show less</Button>
          </>}
        </div>
      </div>
    </section>
  )
}

export default Main;