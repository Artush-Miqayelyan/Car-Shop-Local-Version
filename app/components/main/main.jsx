"use client"
import styles from "./main.module.css";
import { selectCars } from "../../redux/features/autoshop/autoshopSlice";
import { useSelector, useDispatch} from "react-redux"
import CarCard from "../carcard/carCard";
import { minimumVersion } from "./utils";
import { useState } from "react";
 
function Main(){
    const cars = useSelector(selectCars);
     const [ontop, setOntop] = useState(true)
     const [urgentSale, setUrgentSale] = useState(true)
     const [officialDiller, setOfficialDiller] = useState(true)
   
     const minOntop = minimumVersion(cars, "priority", "ontop");
     const minUrgentSale = minimumVersion(cars, "priority", "urgent sale");
     const minOfficialDiller = minimumVersion(cars, "isOfficialDiller", true);
    
    return(
        
        <section className={styles.main} >

        <div className ={styles.topAnnouncements}>
          <h3 className = {styles.title}>Top Announcements</h3>
          <div className = {styles.carsContainer}>
           {ontop? <>
            {minOntop.length > 0 && minOntop.map((car) =>{
             
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
                 priority = {car.priority}
                />
             
          })}
            <button onClick = {() => setOntop(!ontop)}> Show more </button>
           </> : <>
           {cars.length > 0 && cars.map((car) =>{
             if(car.priority === "ontop" ){
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
                
                 />
             }
          })}
             <button onClick = {() => setOntop(!ontop)}> Show less </button>
         </>}
           
          </div>
            
        </div>
        <div className ={styles.urgentSale} >
          <h3 className = {styles.title}>Urgent Sale</h3>
          <div className = {styles.carsContainer}>
           {urgentSale? <>
            {minUrgentSale.length > 0 && minUrgentSale.map((car) =>{
            
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
                 
                />
             
          })}
            <button onClick = {() => setUrgentSale(!urgentSale)}> Show more </button>
           </> : <>
           {cars.length > 0 && cars.map((car) =>{
             if(car.priority === "urgent sale" ){
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
                
                 />
             }
          })}
             <button onClick = {() => setUrgentSale(!urgentSale)}> Show less </button>
         </>
          }
          </div>
        </div>
        <div className = {styles.dealersOffers}>
          <h3 className = {styles.title}>Offers from dealers</h3>
          <div className = {styles.carsContainer}>
           {officialDiller? <>
            {minOfficialDiller.length > 0 && minOfficialDiller.map((car) =>{
             
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
               
                />
             
          })}
            <button onClick = {() => setOfficialDiller(!officialDiller)}> Show more </button>
           </> : <>
           {cars.length > 0 && cars.map((car) =>{
             if(car.isOfficialDiller === true ){
                 return <CarCard  
                 img = {car.img[0]} 
                 price = {car.price} 
                 year = {car.year}
                 mark = {car.brand}
                 model = {car.model}
               
                 />
             }
          })}
             <button onClick = {() => setOfficialDiller(!officialDiller)}> Show less </button>
         </>}
           
          </div>
            
        </div>
          
    </section>
    )
}

export default  Main;
