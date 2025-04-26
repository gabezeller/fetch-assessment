"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaBone } from "react-icons/fa6";
import { useRouter } from 'next/navigation'



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
    setLoggingIn(true);

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
      setError(false);
      openSearch();
    } catch (error) {
      setError(true);
      
    }
    setLoggingIn(false);
    
  }

  const openSearch = () => {
    console.log("opening search page...");
    router.push('/search');
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

  const handleKeyDown = (event) => {
    console.log("handle key down");
    if (event.key === 'Enter') {
      console.log("key is enter key")
      login();
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const router = useRouter();

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
              <input className={styles.input}type="text" placeholder="Name" value={name} 
              onChange={(e) => setName(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
              
            </div>

            <div className={styles.inputSection}>
              <IoMail className={styles.icon}/>
              <input className={styles.input}type="text" placeholder="Email" value={email} 
              onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
              
              
            </div>
          

            
          </div>
          
         
            <button className={styles.loginButton} onClick={login} >
          
            
         
            
              {loggingIn ? (<p>Logging in...</p>):(<p>Log in</p>)}
            
         
            
              
            </button>
            <p className={`${styles.errorMessage} ${error ? styles.show : ''}`}>Invalid name or email</p>
          </div>
           

        {/* </div> */}
        

      </main>
      {/* <footer className={styles.footer}>
    
   
      </footer> */}
    </div>
  );
}
