import React from 'react'
import { CallToAcion } from '../components/CallToAcion'

export const Home1 = () => {
  return (

    <main className='bg-main w-100 h-100 flex f-column align-center j-center g-3 '>
        <div className="w-25">
            <h2 className='main-text mb-3'>Just dream it...</h2>
            <h1 className="main-text text-end">...we make it happens</h1>
        </div>
        <div className="action-group w-100 flex j-evenly mt-5">
            <CallToAcion path={'/cities'} legend='view Cities'/>
            <CallToAcion path={'/Hotels'} legend='view Hotels'/>
        </div>
    </main>

  )
}