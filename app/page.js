'use client'

import React, { useEffect } from "react"
import "./global.css"

import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentUser
} from './redux/features/currentUser/currentUserSlice'
import {
  SignInToAccount
} from './redux/features/IsLoggedIn/IsLoggedInSlice'

import { getCars } from "./redux/API/autoshopAPI"

import Menu from "./components/menu/menu"
import FilterBar from './components/FilterBar/filterBar'
import HomePageCarsOffers from "./components/homePageCarsOffers/homePageCarsOffers"

export default function Home() {

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (currentUser) {
      dispatch(SignInToAccount())
    }
  }, [currentUser])

  useEffect(() => {
    dispatch(getCars())
  }, [])

  return <div className="HomePageContent" >
    <Menu />
    <FilterBar />
    <HomePageCarsOffers />
  </div>
}