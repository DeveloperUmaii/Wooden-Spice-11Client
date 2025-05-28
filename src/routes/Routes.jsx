import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'
import JobDetails from '../pages/JobDetails'
import AddJob from '../pages/AddJob'
import ErrorPage from '../pages/ErrorPage'
import MyPostedJobs from '../pages/MyPostedJobs'
import UpdateJob from '../pages/UpdateJob'
import PrivateRoute from './PrivateRoute'
import MyBids from '../pages/MyBids'
import BidRequests from '../pages/BidRequests'
import AllJobs from '../pages/AllJobs'
import PlaceBid from '../pages/PlaceBid'
import Profile from '../pages/Profile'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
      {
        path: '/job/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
      },
      {
        path:"/purchase-food",
        element:(
            <PlaceBid />)
      },

      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`),
      },
      {
        path: '/add-food-item',
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-added-food',
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-purchase',
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: '/bid-requests',
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
      {
        path: '/foods',
        element: <AllJobs />,
      },
      {
        path: '/gallery',
        element: <AllJobs />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },

    ],
  },
])

export default router
