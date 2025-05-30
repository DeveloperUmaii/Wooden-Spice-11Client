import { useContext, useState } from 'react'
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import useAxiosSecure from '../hooks/useAxiosSecure'

const JobDetails = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date())
  const { user } = useContext(AuthContext)
  const job = useLoaderData()


  const {
    _id,
    job_title,
    description,
    min_price,
    max_price,
    category,
    deadline,
    buyer,
    image_url, // New Data
    quantity, // New Data
    price, // New Data
    origin // New Data
  } = job || {}

  const handleFormSubmission = async e => {
    e.preventDefault()
    if (user?.email === buyer?.email) return toast.error('Action not permitted!')

    const form = e.target
    const jobId = _id
    const bidPrice = parseFloat(form.price.value)
    if (bidPrice < parseFloat(min_price)) return toast.error('Offer more or at least equal to Minimum Price.')

    const comment = form.comment.value
    const bidDeadline = startDate
    const email = user?.email
    const status = 'Pending'

    const bidData = {
      jobId,
      price: bidPrice,
      deadline: bidDeadline,
      comment,
      job_title,
      category,
      email,
      buyer_email: buyer?.email,
      status,
      buyer,
    }

    try {
      const { data } = await axiosSecure.post(`/bid`, bidData)
      toast.success('Bid Placed Successfully!')
      navigate('/my-bids')
    } catch (err) {
      toast.error(err.response.data)
      e.target.reset()
    }
  }
  //////////////////
  return (
    <div className=" min-h-screen  py-10 px-4">
      <div className='flex flex-col md:flex-row gap-8 items-stretch max-w-screen-xl mx-auto border rounded'>

        {/* Left: Details Section */}
        <div className='flex-1 p-6 rounded-xl shadow-2xl '>
          <div className='flex items-center justify-between mb-4'>
            <span className='text-sm font-light '>
              Deadline: {new Date(deadline).toLocaleDateString()}
            </span>
            <span className='px-4 py-1 text-xs text-white bg-gradient-to-r from-[#a11fa5cb] to-[#452d61be] rounded-full uppercase font-medium'>
              {category}
            </span>
          </div>

          <h1 className='text-3xl font-bold  mb-3'>{job_title}</h1>

          <p className='text-md mb-4 '>{description}</p>

          <div className='space-y-2'>
            <p><span className='font-semibold'>Origin:</span> {origin}</p>
            <p><span className='font-semibold'>Quantity:</span> {quantity}</p>
            <p><span className='font-semibold'>Price:</span> ${price}</p>
            {/* <p><span className='font-semibold'>Range:</span> ${min_price} - ${max_price}</p> */}
          </div>

          <div className='mt-6'>
            <h3 className='font-semibold text-lg mb-2'>Buyer Details:</h3>
            <div className='flex items-center gap-4'>
              <div>
                <p>Name: {buyer?.name}</p>
                <p>Email: {buyer?.email}</p>
              </div>
              <img src={buyer?.photo} alt='Buyer' className='w-16 h-16 object-cover rounded-full border-2 border-indigo-400' />
            </div>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className='flex-1 rounded-xl shadow-xl p-4 flex justify-center items-center'>
          <img src={image_url || 'https://via.placeholder.com/400x200'} alt='Product Image' className='rounded-lg w-full h-full object-cover max-h-[400px]' />
        </div>
      </div>

      <div className='flex justify-center mt-10'>
        {quantity < 1 ? (
          <NavLink
            to='/purchase-food'
            state={{ job }}
            className='px-10 py-3 bg-gray-400 text-white font-bold rounded-full cursor-not-allowed pointer-events-none transition duration-300 shadow-md'
          >
            Not Available
          </NavLink>
        ) : (
          <NavLink
            to='/purchase-food'
            state={{ job }}
            className='px-10 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md'
          >
            Go Purchase →
          </NavLink>
        )}


      </div>
    </div>
  )
}

export default JobDetails
