
import { getJobsdata } from '@/lib/api/job';
import React from 'react';

const BrowseJobsPages = async ({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
    
  const search= await searchParams
  const searchUrl= new URLSearchParams(search as Record<string ,string>);
  const query=searchUrl.toString()
      // console.log(query)
   const jobs=await getJobsdata(query)  

  return (
    <div>
     {
      jobs.map((job)=>(job.title))
     }
    </div>
  );
};

export default BrowseJobsPages ;