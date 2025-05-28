/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  const {
    _id,
    job_title,
    description,
    category,
    image_url,
    quantity,
    price,
    origin
  } = job || {}


  return (


    <Link
      to={`/job/${_id}`}
      className="border rounded relative  w-full max-w-sm mx-auto p-4    from-[#fdfcfb] to-[#e2d1c3] dark:from-[#1f1f1f] dark:to-[#2c2c2c]  hover:scale-[1.03] transition-all"
    >
      <div className=" transition duration-300 p-2">
        <div className="rounded-lg overflow-hidden">
          <img
            src={image_url || 'https://via.placeholder.com/400x200'}
            alt={job_title}
            className="w-full h-44 object-cover rounded-lg"
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
              {category}
            </span>
          </div>

          <h2 className="text-xl font-bold  dark:text-white">
            {job_title}
          </h2>

          <p
            title={description}
            className="text-sm  "
          >
            {description.substring(0, 70)}...
          </p>

          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <p className=" ">
              Quantity:
              <span className="font-semibold ml-1">{quantity}</span>
            </p>
            <p className=" ">
              Unit Price:
              <span className="font-semibold ml-1">${price}</span>
            </p>
            <p className=" ">
              Origin:
              <span className="font-semibold ml-1">{origin}</span>
            </p>
          </div>
        </div>

      </div></Link>

  )
}

export default JobCard
