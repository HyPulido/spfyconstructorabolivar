import { SearchResponseModel } from "@/app/models/Searchs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


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

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spotify.com/v1/',
        headers: { 'Authorization': 'Bearer '+localStorage.getItem('access_token') }
    }),
    endpoints: (builder) => ({
        search: builder.query<SearchResponseModel, {word: string}>({
            query: ({word}) => `search?q=${word}&type=album,artist,track`
        }),
        currentProfile: builder.query<User, null>({
            query: () => `me`
        })
    }),

});

export const { useSearchQuery, useCurrentProfileQuery } = spotifyApi