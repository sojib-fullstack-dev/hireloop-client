'use client'

import { JobEntry } from "@/app/dashbord/recruiter/jobs/job-data";
import { applyJobs } from "@/lib/api/applications";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ApplyButton = ({job}:{job:JobEntry}) => {
   const router=useRouter()
const {data:session}=useSession()
    const user=session?.user

  const handleApply=async ()=>{
       if(!user){
        router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
        return
       }else if (user.role === 'seeker'){
          // save the application to the database 

          const application={
            jobId:job._id,
            userId:user.id,
            email:user.email,
            jobTitle:job.title,
            companyName:job.company
          }
          const result=await applyJobs(application)
          if(result.insertedId){
            alert('Application successful')
            console.log('Application successful')
            router.push('/browse-jobs')
          }
       }
       else{
        alert('user is not a seeker')
       }
      
  }

  return (
    <div>
                    <button
              onClick={handleApply}
                type="button"
                className="h-12 rounded-lg bg-[#fafafa] px-5 text-base font-medium text-[#0b0b0c] transition-colors hover:bg-white"
              >
                Apply Now
              </button>
    </div>
  );
};

export default ApplyButton;