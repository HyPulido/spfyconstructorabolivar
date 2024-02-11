"use client"
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useSearchQuery, useCurrentProfileQuery } from '@/redux/services/spotifyApi';

import disk from "/assets/disco.png"
import { AlbumsItemsModel, AlbumsModel, ArtistsItemsModel, ArtistsModel, TracksItemsModel, TracksModel } from './models/Searchs';


type User = {
   display_name: string
   external_urls: {
      spotify: string
   },
   href: string,
   id: string,
   images: [
      {
         url: string,
         height: string,
         width: string
      }
   ],
   email: string,
}

function HomePage() {

   const count = useAppSelector(state => state.counterReducer.counter)
   const [fetchUsers, setFetchUsers] = useState(false);
   const [fetchWords, setFetchWords] = useState("");
   const [profile, setProfile] = useState<User | null>(null);
   const [albums, setAlbums] = useState<AlbumsModel[] | null>(null);
   const [artists, setArtists] = useState<ArtistsModel[] | null>(null);
   const [tracks, setTracks] = useState<TracksModel[] | null>(null);

   if(!localStorage.getItem('access_token')){
      window.location.href='login';
   }

   const currentProfileQuery = useCurrentProfileQuery(null);
   const searchArtistQuery = useSearchQuery({word: fetchWords});

   useEffect(() => {
      if (currentProfileQuery.data) {
         setProfile(currentProfileQuery.data);
      }
   }, [currentProfileQuery.data]);

   useEffect(() => {
      console.log("Entyra")
      if (searchArtistQuery.data) {
         console.log(searchArtistQuery.data)
         if (searchArtistQuery.data?.albums) {
            setAlbums(searchArtistQuery.data?.albums.items);
         }

         if (searchArtistQuery.data?.artists) {
            setArtists(searchArtistQuery.data.artists.items);
         }

         if (searchArtistQuery.data?.tracks) {
            setTracks(searchArtistQuery.data.tracks.items);
         }
      }
   }, [fetchWords]);

   useEffect(() => {
      if (!fetchUsers) return;
      // Realiza la llamada a la API de búsqueda de artistas
      searchArtistQuery.refetch();
      // Realiza la llamada a la API de perfil actual
      currentProfileQuery.refetch();
   }, [fetchUsers]);

   const handleChange = (search: string) => {
      setFetchWords(search); // Activar la bandera para realizar la llamada a la API
      searchArtistQuery.refetch(); // Llamar a refetch para realizar la llamada a la API cuando sea necesario
    };

   return (
      <>
         <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 light:bg-gray-800 light:border-gray-700 ">
               <div className="px-3 py-3 lg:px-5 lg:pl-3">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center justify-start rtl:justify-end">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600">
                           <span className="sr-only">Open sidebar</span>
                           <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                           </svg>
                        </button>
                        <a href="https://www.constructorabolivar.com/" className="flex ms-2 md:me-24">
                           <img src="https://www.constructorabolivar.com/sites/all/themes/constructora/assets/icons/logo-constructora-bolivar.svg" className="h-8 me-3" alt="FlowBite Logo" />
                           <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap brand-text-green">Constructora Bolivar</span>
                        </a>
                     </div>
                     <div className="flex items-center">
                        <div className="flex items-center ms-3">
                           <div>
                              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                 {/* <span className="sr-only">Open user menu</span> */}
                                 <img className="w-8 h-8 rounded-full" src={profile?.images[0].url} alt="user photo" />
                              </button>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 light:bg-gray-800 light:border-gray-700" aria-label="Sidebar">
               <div className="h-full px-3 pb-4 overflow-y-auto bg-white light:bg-gray-800">
                  <ul className="space-y-2 font-medium p">
                     <li>
                        <form>

                           <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                 <svg className="w-4 h-4 text-gray-500 light:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                 </svg>
                              </div>
                              {/* <input type="search" onChange={(e)=>{useSearchQuery(null)}} id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500" placeholder="" required /> */}
                              <input
                              type="search"
                              onChange={(e) => { handleChange(e.target.value)}}
                              id="default-search"
                              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                              placeholder=""
                              required
                              />

                           </div>
                        </form>

                     </li>
                     <li>
                        <a href="/login" className="flex items-center p-2 text-gray-900 rounded-lg light:text-white hover:bg-gray-100 light:hover:bg-gray-700 group">
                           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 light:text-gray-400 group-hover:text-gray-900 light:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                           </svg>
                           { localStorage.getItem('access_token') &&
                           <span className="flex-1 ms-3 whitespace-nowrap" onClick={()=>{localStorage.removeItem('access_token')}}>Cerrar Sesión</span>
                            }
                             { !localStorage.getItem('access_token') &&
                              <span className="flex-1 ms-3 whitespace-nowrap">Iniciar Sesión</span>
                            }
                           
                        </a>
                     </li>

                  </ul>
               </div>
            </aside>

            <div className="work-space p-4 sm:ml-64">
               <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg light:border-gray-700 mt-14">
                  <h1>Albums</h1>
                  <div className="grid grid-cols-4 gap-8 mb-4">
                     {
                        albums && albums.map((album, index) => (
                           <div className='p-4 targets' key={index} >
                              <img src={(album?.images[0]) ? album?.images[0].url : '/assets/disk.png'} alt="" />
                              <div>
                                 <p className='brand-text-green my-4 text-center'>{album.name}</p>
                                 <button
                                    type="button"
                                    className="text-white text-center d-flex"
                                 >
                                    <a href={'/album/' + album.id}> Abrir</a>
                                 </button>
                              </div>
                           </div>
                        ))
                     }
                  </div>

                  <h1>Artistas</h1>
                  <div className="grid grid-cols-4 gap-8 mb-4">
                     {
                        artists && artists.map((artist, index) => (
                           <div className='p-4 targets' key={index} >
                              <img src={(artist?.images[0]) ? artist?.images[0].url : '/assets/disk.png'} alt="" />
                              <div>
                                 <p className='brand-text-green my-4 text-center'>{artist.name}</p>
                                 <button
                                    type="button"
                                    className="text-white text-center d-flex"
                                 >
                                    <a href={'/artist/' + artist.id}> Abrir</a>
                                 </button>
                              </div>
                           </div>
                        ))
                     }
                  </div>
                  <h1>Canciones</h1>
                  <div className="grid grid-cols-4 gap-8 mb-4">
                     {
                        tracks && tracks.map((track, index) => (
                           <div className='p-4 targets' key={index} >
                              <img src={'/assets/disk.png'} alt="" />
                              <div>
                                 <p className='brand-text-green my-4 text-center'>{track.name}</p>

                                 <button
                                    type="button"
                                    className="text-white text-center d-flex"
                                 >
                                    <a href={'/track/' + track.id}> Abrir</a>
                                 </button>
                              </div>
                           </div>
                        ))
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default HomePage