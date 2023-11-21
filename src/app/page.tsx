import Image from 'next/image'
import IndexPage from './Home/page'



export default function Home() {
  return (
    <div>
      <h1>DeTrust</h1>
      

{/* <div classNameNameName="max-w-sm border rounded-xl shadow bg-slate-950 border-gray-700">
    <a href="#">
        <Image classNameNameName="rounded-xl w-full" src="https://i.imgur.com/HXvgmAe.png" alt="" width={100} height={100} />
    </a>
    <div classNameNameName="p-5">
        <a href="#">
            <h5 classNameNameName="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" classNameNameName="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg classNameNameName="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div> */}


<IndexPage />



    </div>
    
  )
}
