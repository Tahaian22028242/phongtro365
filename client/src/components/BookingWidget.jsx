import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import {UserContext} from './UserContext'

function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        setName(user.name)
    }, [user])

    let numberOfNights = 0
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const data = {
            checkIn, checkOut, numberOfGuests, name, phone,
            placeId: place.id,
            price: numberOfNights*place.price
        }
        const response = await axios.post('/booking', data)
        const bookingId = response.data.id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect) return <Navigate to={redirect} />

  return (
    <div className='bg-white shadow-sm p-4 rounded-2xl'>
        <div className='text-2xl text-center'>
            Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
            <div className="flex">
                <div className='py-3 px-4'>
                    <label>Check in:</label>
                    <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                </div>
                <div className='py-3 px-4 border-l'>
                    <label>Check out:</label>
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                </div>
            </div>
            <div className='py-3 px-4 border-t'>
                <label>Number of guests: </label>
                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(Number(ev.target.value))} />
            </div>
            {numberOfNights > 0 && (
                <div className='py-3 px-4 border-t'>
                    <label>Your full name: </label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label>Your phone number: </label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                </div>
            )}
        </div>
        <button onClick={bookThisPlace} className='primary mt-4'>
            Book this place
            {numberOfNights > 0 && (
                    <span>${numberOfNights * place.price}</span>
            )}
        </button>
    </div>
  )
}

export default BookingWidget
