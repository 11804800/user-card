import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { FaInfo, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { LuContact } from 'react-icons/lu';

function App() {

  //state for data
  const [data, setData] = useState();
  const [err, setErr] = useState(false);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    // for fetching data from api
    async function FetchData() {
      const res = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
      //as we are getting only single element so
      setData(res.data?.results[0]);
      setLoading(false);
    }
    //calling the function
    FetchData();
  }, []);

  if (err) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <p className='text-lg font-medium '>Failed to fetch</p>
      </div>
    )
  }
  else if (isloading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <p className='text-lg font-medium '>Loading....</p>
      </div>
    )
  }
  else {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className='rounded-md border p-4  h-fit shadow-2xl shadow-violet-300 flex gap-2 justify-center items-center w-[320px] md:w-[65%] lg:w-[50%] xl:w-[40%] md:h-[50%] '>

          <div className='rounded-md  w-[90%]  flex flex-col md:flex-row  items-start justify-center gap-4 px-4 py-6' >
            <div className='w-full flex justify-center'>
              <picture>
                <source media="(min-width: 650px)" srcSet={data?.picture.large} />
                <source media="(min-width: 465px)" srcSet={data?.picture.medium} />
                <img src={data?.picture.large} className='object-contain rounded-md shadow-md' width="180" height="250" />
              </picture>
            </div>
            <div className='flex flex-col gap-4 font-medium justify-center md:justify-normal items-center md:items-start w-full'>
              <div className='flex gap-2  uppercase text-lg font-bold text-violet-600'>
                <p>{data?.name.first}</p>
                <p>{data?.name.last}</p>
              </div>
              <div className='py-2 flex flex-col gap-4 h-full text-sm  text-black/65'>
                <p className="flex gap-2 items-center capitalize">{data?.gender === "female" ? <BsGenderFemale /> : <BsGenderMale />} {data?.gender}</p>
                <p className='flex gap-2 items-center'><FaPhone />{data?.phone}</p>
              </div>
              <div className='flex gap-4 py-2'>
                <button className='p-2 rounded-full shadow-md bg-violet-600'><FaLinkedin color='white' size={22}/></button>
                <button className='p-2 rounded-full shadow-md bg-violet-600'><FaTwitter color='white' size={22}/></button>
                <button className='p-2 rounded-full shadow-md bg-violet-600'>
                  <FaInstagram color='white' size={22} />
                </button>
                <button className='p-2 rounded-full shadow-md bg-violet-600'>
                  <FaWhatsapp color='white' size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
