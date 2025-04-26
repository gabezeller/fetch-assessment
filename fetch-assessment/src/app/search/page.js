"use client";

import styles from "./Search.module.css";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";

export default function Search() {

    const [search, setSearch] = useState("Search for a dog...");
    const [sortAsc, setSortAsc] = useState(false); // sort ascending true or false (descending)
    const [breedFilter, setBreedFilter] = useState(""); // filter by breed, default none
    const [showFavorites, setShowFavorites] = useState(false); // all results vs favorites toggle
    // const [searchParams, setSearchParams] = useState(""); // search parameters to conduct search as one string

    const [breed, setBreed] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    const [listings, setListings] = useState([]);

    async function searchDogs () {
        const params = new URLSearchParams();
        if (sortAsc) {
            params.append("sort", "breed:asc");
        } else {
            params.append("sort", "breed:desc");
        }

        if (breed.length) {
            params.append("breeds", breed);
        }
        if (zipCode.length) {
            params.append("zipCodes", zipCode);
        }
        if (minAge.length) {
            params.append("ageMin", minAge);
        }
        if (maxAge.length) {
            params.append("ageMax", maxAge);
        }

        // {
        //     breeds: breed,
        //     names: name,
        //     ageMin: minAge, 
        //     ageMax: maxAge
        //   }

        const url = "https://frontend-take-home-service.fetch.com/dogs/search?";
        console.log("searching...");
        try {
          const response = await fetch(`${url}${params}`, {
            method: "GET",
            
            headers: {
              "Content-Type": "application/json",
              
            },
            // body: JSON.stringify({breeds: searchParams, zipCodes: searchParams,
            //     ageMin: searchParams, ageMax: searchParams
            // }),
            credentials: "include",
          }
            
          );
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }
      
          const json = await response.json();
          console.log(json);
          let dogIds = json.resultIds;

          console.log(dogIds);
          dogIds.slice(0, Math.min(dogIds.length, 99));
          getDogsFromIds(dogIds);
          
        } catch (error) {
          console.log(error);
          
        }
    }

    const renderListing = (dog) => {
        const {name, breed, img, id} = dog;

        return (
            <div className={styles.dogListing} key={id}>
                <Image className={styles.listingImage} src={img} alt={name} width="50" height="50"></Image>
                <div className={styles.listingBox}>
                    {name}, the {breed}
                </div>
            </div>
        )
    }

    async function getDogsFromIds(dogIds) {
        const url = "https://frontend-take-home-service.fetch.com/dogs";
        console.log("retrieving dogs from ids...");


        try {
          const response = await fetch(url, {
            method: "POST",
            
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(dogIds),
            credentials: "include",
          }
            
          );
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }
      
          const json = await response.json();
          console.log(json);
          setListings(json);
          
        } catch (error) {
          
          
        }
        
    }



    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.searchContainer}>
                    <h1 className={styles.searchTitle}>Find your companion</h1>
                    <div className={styles.searchSection}>
                        <div className={styles.searchButtons}>

                        
                            <button className={styles.sortBy}>
                                Sort by
                                <IoIosArrowDropdown className={styles.dropArrow}/>
                            </button>
                            <button className={styles.filter}>
                            <IoFilter className={styles.filterIcon}/>
                                {/* <span className={styles.filterLine}></span>
                                <span className={styles.filterLine}></span>
                                <span className={styles.filterLine}></span> */}
                            </button>
                        </div>

                        {/* <div className={styles.searchBar}>
                            <input className={styles.searchInput} type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <FaSearch onClick={searchDogs}/>
                        </div> */}

                        <div className={styles.searchBoxes}>
                            <input className={styles.breedInput} type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)}/>
                            <input className={styles.zipCodeInput} type="text" placeholder="ZipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                            <input className={styles.minAgeInput} type="text" placeholder="Min Age" value={minAge} onChange={(e) => setMinAge(e.target.value)}/>
                            <input className={styles.maxAgeINput} type="text" placeholder="Max Age" value={maxAge} onChange={(e) => setMaxAge(e.target.value)}/>
                            <FaSearch onClick={searchDogs}/>
                        </div>

                    

                    </div>

                    <div className={styles.toggleButtons}>
                        <button className={styles.resultsButton}>Results</button>
                        <button className={styles.favoritesButton}>Favorites</button>
                    </div>

                    <div className={styles.resultsBox}>
                        {listings.length ? (sortAsc ? listings.map((dog) => renderListing(dog)) : listings.reverse().map((dog) => renderListing(dog))) : <>No results</> }
                    
                    
                    </div>

                    <button className={styles.matchButton}>Generate match</button>

                </div>
            </main>
        </div>
    );
}