"use client";

import styles from "./Search.module.css";
import Image from "next/image";
import { FaSearch, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Search() {

    const [breedSearch, setBreedSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true); // sort ascending true or false (descending)
    const [breedFilter, setBreedFilter] = useState(""); // filter by breed, default none
    const [showFavorites, setShowFavorites] = useState(false); // all results vs favorites toggle
    // const [searchParams, setSearchParams] = useState(""); // search parameters to conduct search as one string

    const [breed, setBreed] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    const [favorites, setFavorites] = useState([]);


    const [sortOpen, setSortOpen ] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const [listings, setListings] = useState([]);
    const [allBreeds, setAllBreeds] = useState([]);

    const [filteredBreeds, setFilteredBreeds] = useState([]);

    const [previewDog, setPreviewDog] = useState(null);
    const [matchDog, setMatchDog] = useState(null);

    const [searching, setSearching] = useState(false);
    const [matching, setMatching] = useState(false);

    const [loggingOut, setLoggingOut] = useState(false);

    async function searchDogs () {
        setSearching(true);
        const params = new URLSearchParams();
        if (sortAsc) {
            params.append("sort", "breed:asc");
        } else {
            params.append("sort", "breed:desc");
        }

        if (breed.length) {
            // setFilteredBreeds([breed]);
            params.append("breeds", breed);
            
        } else if (filteredBreeds.length) {
            params.append("breeds", filteredBreeds);
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

          setSearching(false);
          
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


    const appendFavorites = (dog) => {
        console.log("adding to favorites...");
        setFavorites(prevFavorites => [...prevFavorites, dog]);
        

    }

    useEffect(() => {
        console.log(listings);
    }, [listings]);

    const removeFavorites = (dog) => {
        console.log("removing from favorites...");
        setFavorites(favorites.filter(favDog => favDog.id !== dog.id));
    }

    // const renderListing = (dog) => {
    //     const {name, breed, img, id} = dog;
        
    //     let liked = favorites.includes(id);
        
    //         return (
            
    //             <div className={styles.dogListing} key={id}>
    //                 <Image className={styles.listingImage} src={img} alt={name} width="50" height="50"></Image>
    //                 <div className={styles.listingBox}>
    //                     {name}, the {breed}
    //                 </div>
    //                 {liked ? <FaHeart className={styles.heartFull} onClick={() => removeFavorites(dog)} /> : <FaRegHeart className={styles.heartIcon} onClick={() => appendFavorites(dog)}/> }


    //                 {/* <FaHeart className={styles.heartFull} />
    //                 <FaRegHeart className={styles.heartIcon} /> */}
                    
    //             </div>
    //         );
        
    // }

    

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
    async function getDogFromId(dogId) {
        const url = "https://frontend-take-home-service.fetch.com/dogs";
        console.log("retrieving one dog from id...");


        try {
          const response = await fetch(url, {
            method: "POST",
            
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify([dogId]),
            credentials: "include",
          }
            
          );
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }
      
          const json = await response.json();
          console.log(json);
          return json[0];
          
          
        } catch (error) {
          
          
        }
        return null;
        
    }

    // Fetch breeds
    useEffect(() => {
        const fetchBreeds = async () => {
            const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
            console.log("fetching breeds from ids...");
    
    
            try {
              const response = await fetch(url, {
                method: "GET",
                
                headers: {
                  "Content-Type": "application/json",
                  
                },
                
                credentials: "include",
              }
                
              );
              
              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                
              }
          
              const json = await response.json();
              console.log(json);
              setAllBreeds(json);
              
            } catch (error) {
              
              
            }
        };
    
        fetchBreeds();
    
        
      }, []);


    async function logout() {
        setLoggingOut(true);
        
    
        const url = "https://frontend-take-home-service.fetch.com/auth/logout";
        console.log("logging out...");
        try {
          const response = await fetch(url, {
            method: "POST",
            
            headers: {
              "Content-Type": "application/json",
              
            },
            // body: JSON.stringify({name: name, email: email}),
            credentials: "include",
          }
            
          );
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }
      
          const json = await response;
          console.log(json);
          openHome();
         
        } catch (error) {
          
          
        }
        setLoggingOut(false);
    }

    const router = useRouter();

    const openHome = () => {
        console.log("opening home page...");
        router.push('/');
      }

    const toggleSortBy = () => {
        console.log("toggling sort open...");
        setSortOpen(!sortOpen);
    }

    const toggleFilter = () => {
        console.log("toggling filter open...");
        setFilterOpen(!filterOpen);
    }

    useEffect(() => {
        const fetchData = async () => {
            await searchDogs();
        };
    
        fetchData();
    }, [filteredBreeds, sortAsc]);

    const renderBreed = (breed) => {
        if (!(breed.toLowerCase().includes(breedSearch.toLowerCase()))) {
            return;
        }

        const handleCheck = (event) => {
            console.log("handling check...");
            console.log(event.target.checked);
            setBreed("");
            if (event.target.checked) {
                //filteredBreeds.push(breed);
                setFilteredBreeds(prevFilteredBreeds => [...prevFilteredBreeds, breed]);

                
            } else {
                console.log("find index = ", filteredBreeds.indexOf(breed));
                // filteredBreeds.splice(filteredBreeds.indexOf(breed), 1);


                setFilteredBreeds(filteredBreeds.filter(filtBreed => filtBreed !== breed));
            }
            // searchDogs();
            
        }

       


        
        return (
            <li className={styles.breedListing} key={breed}>
                <input type="checkbox" id={breed} onChange={handleCheck} defaultChecked={filteredBreeds.includes(breed)} />
                <label htmlFor={breed}>{breed}</label>
                
            </li>
        );
    }

    async function generateMatch() {
        setMatching(true);
        const url = "https://frontend-take-home-service.fetch.com/dogs/match";
        console.log("generating match...");

        

        try {
          const response = await fetch(url, {
            method: "POST",
            
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(favorites.map(dog => dog.id)),
            credentials: "include",
          }
            
          );

          setMatching(false);
          
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            
          }

          
      
          const json = await response.json();
          console.log(json);

          
          const match = getDogFromId(json.match);
          match.then(value => {
            // Use the value here
            console.log(value);
            setMatchDog(value);
          })
          .catch(error => {
            // Handle errors here
            console.error(error);
          });

        //   console.log("match = ", match);

          
          

          
        } catch (error) {
          
          
        }

    }

    const handleKeyDown = (event) => {
        console.log("handle key down");
        if (event.key === 'Enter') {
          console.log("key is enter key")
          searchDogs();
        }
      }

    // const handleSearch = () => {
    //     console.log("handling search...");
    //     setFilteredBreeds([]);
    //     searchDogs();
    // }




    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>
                    Fido Finder
                </h1>
                <button className={styles.logoutButton} onClick={logout} >
                    {loggingOut ? (<>Logging out...</>):(<>Log out</>)}
                </button>
            </div>

            
            <main className={styles.main}>
            
                <div className={styles.searchContainer}>
                <div className={styles.searchSection}>
                    <h2 className={styles.searchTitle}>Find Your Companion</h2>
                    
                        <div className={styles.searchButtons}>

                        <div className={styles.sortByContainer}>
                            <button className={styles.sortBy} onClick={toggleSortBy}>
                                Sort by
                                <IoIosArrowDropdown className={`${styles.dropArrow} ${sortOpen ? styles.flip : ''}`}/>
  
                            </button>
                            <div className={`${styles.sortBox} ${sortOpen ? styles.show : ''}`}>
                                    <ul>
                                        <li onClick={() => {setSortAsc(true); toggleSortBy(); searchDogs();}} >
                                            A to Z
                                        </li>
                                        <li  onClick={() => {setSortAsc(false); toggleSortBy(); searchDogs();}}>
                                            Z to A
                                        </li>
                                    </ul>
                                </div>
                            </ div>
                            <div className={styles.filterContainer}>
                                {/* <button className={styles.filter}> */}
                                <IoFilter className={`${styles.filterIcon} ${filterOpen ? styles.flip : ''}`} onClick={toggleFilter}/>
                                
                                {/* </button> */}

                                <div className={`${styles.filterBox} ${filterOpen ? styles.show : ''}`}>
                                    <div className={styles.searchBar}>
                                        <input className={styles.searchInput} type="text" placeholder="Search for breed..." value={breedSearch} onChange={(e) => setBreedSearch(e.target.value)}/>
                                        <FaSearch />
                                    </div>

                                    <ul className={styles.breedsList}>
                                        {allBreeds.length === 0 ? "" : allBreeds.map((breed) => renderBreed(breed))}
                                    </ul>

                                </div>
                            </div>
     
                        </div>

                        {/* <div className={styles.searchBar}>
                            <input className={styles.searchInput} type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <FaSearch onClick={searchDogs}/>
                        </div> */}

                        <div className={styles.searchBoxes}>
                            <input className={styles.breedInput} type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                            <input className={styles.zipCodeInput} type="text" placeholder="ZipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                            <input className={styles.minAgeInput} type="text" placeholder="Min Age" value={minAge} onChange={(e) => setMinAge(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                            <input className={styles.maxAgeINput} type="text" placeholder="Max Age" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                            <FaSearch className={styles.searchIcon} onClick={searchDogs}/>
                        </div>

                    

                    </div>

                    <div className={styles.resultsSection}>
                        <div className={styles.toggleButtons}>
                            <button className={`${styles.resultsButton} ${showFavorites ? '' : styles.selected}`} onClick={() => setShowFavorites(false)}>Results</button>
                            <button className={`${styles.favoritesButton} ${showFavorites ? styles.selected : ''}`} onClick={() => setShowFavorites(true)}>Favorites</button>
                        </div>

                        <div className={styles.resultsBox}>
                            {/* {listings.length ? (sortAsc ? listings.map((dog) => (<DogListing dog={dog} key={dog.id} isLiked={favorites.includes(dog.id)} appendFavorites={appendFavorites} removeFavorites={removeFavorites}></DogListing>)) : listings.reverse().map((dog) => (<DogListing dog={dog} key={dog.id} isLiked={favorites.includes(dog.id)} appendFavorites={appendFavorites} removeFavorites={removeFavorites}></DogListing>))) : <>No results</> } */}
                            {/* {favorites.length ? (favorites.map((dog) => (<DogListing dog={dog} key={dog.id} isLiked={favorites.includes(dog)} appendFavorites={appendFavorites} removeFavorites={removeFavorites}></DogListing>))) : <>No results</> } */}
                            {showFavorites ?
                            (favorites.length ? (favorites.map((dog) => (<DogListing dog={dog} key={dog.id} isLiked={favorites.some(fav => fav.id === dog.id)} appendFavorites={appendFavorites} removeFavorites={removeFavorites} onClick={() => setPreviewDog(dog)}></DogListing>))) : <>No favorites selected</> )
                                :
                            (listings.length ? (listings.map((dog) => (<DogListing onClick={() => {setPreviewDog(dog); console.log("setting preview dog...");}} dog={dog} key={dog.id} isLiked={favorites.some(fav => fav.id === dog.id)} appendFavorites={appendFavorites} removeFavorites={removeFavorites} ></DogListing>))) : (searching ? <>Searching...</> : <>No results</>) )
                        }
                        
                        </div>

                        <button className={styles.matchButton} onClick={generateMatch}>{matching ? <>Matching...</> : <>Generate match</>}</button>
                    </div>
                </div>
                <div className={styles.matchPreviewContainer}>
                    <div className={`${styles.previewContainer} ${styles.preview}`}>
                        <h2>Preview</h2>
                            <div className={styles.previewContent}>
                                {previewDog ? <>
                                <div className={styles.previewImageContainer}>
                                    <Image className={styles.previewImage} src={previewDog.img} alt={previewDog.name} width="220" height="220"></Image>
                            
                                </div>
                                    <div className={styles.previewText}>
                                    <h3 className={styles.previewName}>{previewDog.name}</h3>
                                    <div className={styles.previewBreed}><b>Breed:</b> {previewDog.breed}</div>
                                    <div className={styles.previewAge}><b>Age: </b>{previewDog.age}</div>
                                    <div className={styles.previewZipcode}><b>ZipCode: </b>{previewDog.zip_code}</div>
                                    
                                </div>
                                </>
                                : <div>Select a dog to preview</div>}
                            </div>
                    </div>

                    <div className={`${styles.previewContainer} ${styles.match}`}>
                        <h2>Your matched companion</h2>
                            <div className={styles.previewContent}>
                                {matchDog ? <>
                                    <div className={styles.previewImageContainer}>
                                        <Image className={styles.previewImage} src={matchDog.img} alt={matchDog.name} width="220" height="220"></Image>
                                        
                                    </div>
                                        <div className={styles.previewText}>
                                        <h3 className={styles.previewName}>{matchDog.name}</h3>
                                        <div className={styles.previewBreed}><b>Breed:</b> {matchDog.breed}</div>
                                        <div className={styles.previewAge}><b>Age: </b>{matchDog.age}</div>
                                        <div className={styles.previewZipcode}><b>ZipCode: </b>{matchDog.zip_code}</div>
                                        
                                    </div>
                                </>
                                : <div>Select favorites and generate a match</div>}
                            </div>
                    </div>
                </div>

                {/* <div className={styles.test}>TEST</div> */}
            </main>
        </div>
    );
}

const DogListing = ({dog, isLiked, removeFavorites, appendFavorites, onClick}) => {
    const [liked, setLiked] = useState(isLiked);
    
    const {name, breed, img, id} = dog;
   
    
    
        return (
        
            <div className={styles.dogListing} key={id} onClick={onClick}>
                <div className={styles.listingImageContainer}>
                    <Image className={styles.listingImage} src={img} alt={name} width={200} height={200}></Image>
                </div>
                <div className={styles.listingBox}>
                    {name}, the {breed}
                    {liked ? <FaHeart className={styles.heartFull} onClick={(event) => {event.stopPropagation(); removeFavorites(dog); setLiked(false)}} /> : <FaRegHeart className={styles.heartIcon} onClick={(event) => {event.stopPropagation(); appendFavorites(dog); setLiked(true)}}/> }

                </div>


                {/* <FaHeart className={styles.heartFull} />
                <FaRegHeart className={styles.heartIcon} /> */}
                
            </div>
        );
    
}


