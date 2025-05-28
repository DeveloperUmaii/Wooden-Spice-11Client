
import TabCategories from '../components/TabCategories'
import Slider from '../components/Slider'

import MovingImageRight from '../components/MovingImageRight'
import MovingImage from '../components/MovingImage'


const Home = () => {
  return (
    <div>
      <Slider />
      <TabCategories />
      <h4 className='text-center text-2xl text-[#da16a9] font-semibold leading-10 underline'>Coustomer Review</h4>
      <MovingImage />
      <h5 className="text-center uppercase text-orange-500 text-4xl my-3">
        Feeling spicy with wooden Spice
      </h5>
      <MovingImageRight />
    </div>
  )
}

export default Home
