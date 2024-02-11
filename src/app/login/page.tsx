// // pages/login.tsx

// import { useRouter } from 'next/navigation'; // Importa desde next/navigation
// import querystring from 'querystring';
// import { useEffect } from 'react'; // Importa useEffect

// interface Login {}

// export const Login: React.FC<
//   Login
// > = ({}: Login) => {
// //   const router = useRouter();

//   useEffect(() => {
//     const client_id = 'CLIENT_ID';
//     const redirect_uri = 'http://localhost:8888/callback';
//     const state = generateRandomString(16);
//     const scope = 'user-read-private user-read-email';

//     const authUrl = 'https://accounts.spotify.com/authorize?'+querystring.stringify({
//       response_type: 'code',
//       client_id,
//       scope,
//       redirect_uri,
//       state
//     });

//     window.location.href=authUrl;
//     // router.push(authUrl); // Redirige al usuario a la página de autorización de Spotify
//   }, []);
//     // Esta función genera una cadena aleatoria de longitud dada
//     function generateRandomString(length: number) {
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         let result = '';
//         for (let i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * characters.length));
//         }
//         return result;
//     }

//     return null; // Esta página no renderiza nada directamente
// }

// export default Login;

// pages/login.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import querystring from 'querystring';

const Login: React.FC = () => {
    const router = useRouter();
    const [login, setLogin] = useState(false);


    useEffect(() => {
        if (login) {
            const client_id = 'fe2d8ca36cea4ae1874f51e38fd35ae5';
            const redirect_uri = 'http://localhost:3000/login/callback';
            const state = generateRandomString(16);
            const scope = 'user-read-private user-read-email';

            const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
                response_type: 'code',
                client_id,
                scope,
                redirect_uri,
                state
            });

            // window.location.href = authUrl;
            router.push(authUrl); // Redirige al usuario a la página de autorización de Spotify
        }
    }, [login]);

    // Esta función genera una cadena aleatoria de longitud dada
    function generateRandomString(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return (
        <>
            <div className="text-center h-screen flex justify-center items-center">
                <button
                    type="button"
                    onClick={()=>{setLogin(true)}}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Iniciar Con Spotify
                </button>
            </div>
        </>);
}

export default Login;
