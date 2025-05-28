import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const AddJob = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date())

  const handleFormSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const job_title = form.job_title.value
    const email = form.email.value
    const deadline = startDate
    const category = form.category.value
    const description = form.description.value

    // 🔶 নতুন ইনপুট ফিল্ড
    const image_url = form.image_url.value
    const quantity = parseInt(form.quantity.value)
    const price = parseFloat(form.price.value)
    const origin = form.origin.value

    const jobData = {
      job_title,
      deadline,
      category,
      // min_price,
      // max_price,
      description,
      image_url, // 🔶 নতুন যোগ
      quantity,  // 🔶 নতুন যোগ
      price,     // 🔶 নতুন যোগ
      origin,    // 🔶 নতুন যোগ
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
      bid_count: 0,
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/food`,
        jobData
      )
      console.log(data)
      toast.success('Job Posted Successfully!')
      navigate('/my-added-food')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)]  py-10 px-4'>
      <section className='w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 border border-orange-200'>
        <h2 className='text-2xl font-bold text-emerald-700 border-b-4 border-orange-400 inline-block mb-6'>
          📝 Add Your Food Name
        </h2>

        <form onSubmit={handleFormSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='job_title'>
              Food Recipe Name
            </label>
            <input
              id='job_title'
              name='job_title'
              type='text'
              required
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>

          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='email'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              disabled
              defaultValue={user?.email}
              className='w-full p-3 rounded-lg border bg-gray-100 text-gray-700'
            />
          </div>



          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='category'>
              Category
            </label>
            <select
              name='category'
              id='category'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            >
              <option value='Fast Food'>Fast Food</option>
              <option value='Heavy Meal'>Heavy Meal</option>
              <option value="Drink's">Drink's</option>
            </select>
          </div>

          {/* 🔶 New Input: Image URL */}
          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='image_url'>
              Image URL
            </label>
            <input
              id='image_url'
              name='image_url'
              type='text'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>

          {/* 🔶 New Input: QUANTITYYYYYYY */}
          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='quantity'>
              Quantity
            </label>
            <input
              id='quantity'
              name='quantity'
              type='number'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>
          {/* 🔶 New Input: Price */}
          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='price'>
              Price
            </label>
            <input
              id='price'
              name='price'
              type='number'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>

          {/* 🔶 New Input: Origin */}
          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='origin'>
              Origin
            </label>
            <input
              id='origin'
              name='origin'
              type='text'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>

          <div className='col-span-1 sm:col-span-2'>
            <label className='block text-black font-semibold mb-1' htmlFor='description'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              rows='4'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            ></textarea>
          </div>

          <div className='col-span-1 sm:col-span-2 flex justify-end'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300'
            >
              🚀 Add in Food Menu
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob
