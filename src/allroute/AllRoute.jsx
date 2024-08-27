import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../components/Home'
import "../App.css"
import Genre from '../components/Genre'
import Navbar from '../components/navbar'
import Login from '../components/Login'
import Register from '../components/Register'
import HigestRated from '../components/HigestRated'
import Favorites from '../components/Favorites'
import AddMovie from '../components/Addmovies'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Movieselect from '../components/Movieselect'
import Nodata from '../components/Nodata'
import Pagenotfound from '../components/Pagenotfound'
import UpdateMovie from '../components/Updatemovies'
const AllRoute = () => {
    return (
        <>
        <Navbar/>
        <div className='space'></div>
        <Routes>
            <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path='/genre' element={<PrivateRoute><Genre/></PrivateRoute>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/higestrated' element={<PrivateRoute><HigestRated/></PrivateRoute>}/>
            <Route path='/movieselect/:id' element={<PrivateRoute><Movieselect/></PrivateRoute>}/>
            <Route path='/favorites' element={<PrivateRoute><Favorites/></PrivateRoute>}/>
            <Route path='/addmovies' element={<PrivateRoute><AddMovie/></PrivateRoute>}/>
            <Route path='/update/:id' element={<PrivateRoute><UpdateMovie/></PrivateRoute>}/>
            <Route path='/nodata' element={<Nodata/>}/>
            <Route path='*' element={<Pagenotfound/>}/>
        </Routes>
        </>
    )
}

export default AllRoute