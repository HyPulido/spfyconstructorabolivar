// pages/callback.tsx
"use client";
import { useEffect } from 'react';
// import { useSearchParams } from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation'
import querystring from 'querystring';
import { useGenerateTokenByAuthCodeQuery } from "@/redux/services/constructoraBolivarApi";


const Callback = () => {
  const router = useRouter();
  const params = useSearchParams();



  const code = params.get('code');
  const state = params.get('state');

  console.log(code)

  if (state === null) {
    router.push('/#error=state_mismatch');
  } else if (code !== null) {
    if(code){
      const { data, error, isLoading, isFetching, refetch } = useGenerateTokenByAuthCodeQuery({code: code});
      console.log("Termino")
      if(data){
        localStorage.setItem('access_token', data.data.response.access_token);
        router.push('/');
      }
    }
  } else {
    console.error('El código es nulo');
  }

  return (
    <>
        <div className="text-center h-screen flex justify-center items-center">
          <div className="px-3 py-3 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Lo estamos redireccionando, esper un momento...</div>
        </div>
      

    </>);
}

export default Callback;
