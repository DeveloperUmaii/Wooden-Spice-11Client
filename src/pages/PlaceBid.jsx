import { useContext, useState, useEffect } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import useAxiosSecure from '../hooks/useAxiosSecure'

const PlaceBid = () => {
  const { state } = useLocation()
  const job = state?.job
  const { user } = useContext(AuthContext)
  // const [startDate, setStartDate] = useState(new Date())
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  // const food = useLoaderData()

  // const {
  //   price, // New Data
  // } = food || {}
  // console.log('Food data:', food)

  if (!job) {
    return <p>No job found. Please go back and try again.</p>
  }

  const { _id, price, category, buyer,job_title } = job

  const handleFormSubmission = async e => {
    e.preventDefault()
    if (user?.email === buyer?.email)
      return toast.error('Action not permitted!')

    const form = e.target
    const price = parseFloat(form.price.value)
    if (price < parseFloat(price))
      return toast.error('Offer more or at least equal to Minimum Price.')
    const comment = form.comment.value
    const category = form.category.value
    const email = user?.email
    const job_title = form.job_title.value
    const status = "Pending"

    const bidData = {
      jobId: _id,
      price,
      comment,
      category,
      email,
      job_title,
      buyer_email: buyer?.email,
      status,
      buyer,
    }

    try {
      await axiosSecure.post(`/bid`, bidData)
      toast.success('Bid Placed Successfully!')
      navigate('/my-purchase')
    } catch (err) {
      toast.error(err.response?.data || 'Something went wrong')
    }
  }

  return (
    <div className="my-5 flex justify-center items-center">
      <section className=' px-11 w-11/12   rounded-md shadow-2xl flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold  capitalize '>
          Purchase Your Food
        </h2>

        <form onSubmit={handleFormSubmission}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className=' ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
               defaultValue={price}
                required
                className='block w-full px-4 py-2 mt-2   border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>


            <div>
              <label className=' ' htmlFor='job_title'>
                title
              </label>
              <input
                id='job_title'
                type='text'
                name='job_title'
               defaultValue={job_title}
                required
                className='block w-full px-4 py-2 mt-2   border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className=' ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                disabled
                defaultValue={user?.email}
                className='block w-full px-4 py-2 mt-2   border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className=' ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2   border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
          <div>
            <label className='block  font-semibold mb-1' htmlFor='category'>
              Category
            </label>
            <select
              name='category'
              id='category'
              defaultValue={category}
              disabled
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            >
              <option value='Fast Food'>Fast Food</option>
              <option value='Heavy Meal'>Heavy Meal</option>
              <option value="Drink's">Drink's</option>
            </select>
          </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className=' w-4/6 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              P U R C H A S E _ N O W
            </button>
          </div>
        </form>
      </section>
    </div>


  )
}

export default PlaceBid
