import JobCard from './JobCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
// import MovingImage from './MovingImage'
const TabCategories = () => {
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/foods`)
      setJobs(data)
    }
    getData()
  }, [])

  return (
    <div className="">
      <h1 className='text-2xl font-semibold text-center  capitalize lg:text-3xl '>
        Selected best recipes from the best chefs
      </h1>

      <p className='max-w-2xl mx-auto my-6 text-center '>
        You choose the best food of your choice and add your favorite food with us.
      </p>

      <div className=' px-5 grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {jobs
          .filter(job => job.quantity !== undefined && job.quantity !== null) // শুধু যাদের bidcount আছে
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 6)
          .map(job => (
            <JobCard key={job._id} job={job} />
          ))}
      </div>

      {jobs.length > 6 ? (
        <div className="flex justify-center">
          <NavLink
            to="/foods"
            className="hover:bg-blue-300 my-3 text-center text-xs text-blue-800 bg-blue-200 rounded-3xl w-3/4 py-0.5 tracking-widest"
          >
            SEE ALL <span className="text-xs font-black px-1 uppercase">↓</span>
          </NavLink>
        </div>
      ) : null}

    </div>

  )
}

export default TabCategories
