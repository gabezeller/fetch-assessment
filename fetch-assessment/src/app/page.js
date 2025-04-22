"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";




// Color Pallete
/* Amber
#fbb80f

Yellow
#fbee0f

Mauve
#c598af

Purple
#7f4aa4 */

export default function Home() {

  async function login() {
    const url = "https://frontend-take-home-service.fetch.com/auth/login";
    console.log("logging in...");
    try {
      const response = await fetch(url, {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name: name, email: email}),
        credentials: "include",
      }
        
      );
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response;
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  // async function getData() {
  //   const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
  //   console.log("testing getData in...");
  //   try {
  //     const response = await fetch(url
  //       , {
  //       method: "GET",
        
  //       headers: {
  //         "Content-Type": "application/json",
          
  //       },
        
  //       credentials: "include",
  //     }
        
  //     );
      
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
  const [name, setName] = useState("Enter Name");
  const [email, setEmail] = useState("Enter email");

  // console.log("test");
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h1 className={styles.loginHeader}>
            Login with email
          </h1>
          <div className={styles.inputsContainer}>
            <div className={styles.inputSection}>
              <FaUser className={styles.icon}/>
              <input className={styles.input}type="text" value={name} 
              onChange={(e) => setName(e.target.value)} />
              
            </div>

            <div className={styles.inputSection}>
              <IoMail className={styles.icon}/>
              <input className={styles.input}type="text" value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
              
              
            </div>
          

            
          </div>

          <button className={styles.loginButton} onClick={login}>
            Login
          </button>

        </div>

      </main>
      {/* <footer className={styles.footer}>
    
   
      </footer> */}
    </div>
  );
}
