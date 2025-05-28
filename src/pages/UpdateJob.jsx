import { useContext, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useLoaderData, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../providers/AuthProvider'
import useAxiosSecure from '../hooks/useAxiosSecure'

const UpdateJob = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const job = useLoaderData()
  const {
    _id,
    job_title,
    quantity,
    category,
    price,
    origin,

  } = job || {}
  const { user } = useContext(AuthContext)

  const handleFormSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const job_title = form.job_title.value
    const email = form.email.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseFloat(form.quantity.value)

    const jobData = {
      job_title,
      category,
      price,
      quantity,
      buyer: {
        email,
        name: user?.displayName,
        photo: user?.photoURL,
      },
    }

    try {
      const { data } = await axiosSecure.put(`/food/${_id}`, jobData)
      console.log(data)
      toast.success('Job Data Updated Successfully!')
      navigate('/my-added-food')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)]  py-10 px-4'>
      <section className=' w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 border border-orange-200'>
        <div className="flex justify-center">
                      <h2 className=' items-center text-2xl font-bold text-emerald-700 border-b-4 border-orange-400 inline-block mb-6 text-right'>
              📝 Updated Your Food Menu
            </h2>
        </div>


        <form onSubmit={handleFormSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='job_title'>
              Recipe Name
            </label>
            <input
              id='job_title'
              name='job_title'
              defaultValue={job_title}
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
              defaultValue={category}
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            >
              <option value='Fast Food'>Fast Food</option>
              <option value='Heavy Meal'>Heavy Meal</option>
              <option value="Drink's">Drink's</option>
            </select>
          </div>


          {/* 🔶 New Input: QUANTITYYYYYYY */}
          <div>
            <label className='block text-black font-semibold mb-1' htmlFor='quantity'>
              Quantity
            </label>
            <input
              id='quantity'
              name='quantity'
              defaultValue={quantity}
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
              defaultValue={price}
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
              defaultValue={origin}
              type='text'
              className='w-full p-3 rounded-lg border border-emerald-300 focus:outline-orange-500 focus:ring-2'
            />
          </div>

          <div className='col-span-1 sm:col-span-2 flex justify-end'>
            <button
              type='submit'
              className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300'
            >
               Update Food Menu 🚀
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UpdateJob
