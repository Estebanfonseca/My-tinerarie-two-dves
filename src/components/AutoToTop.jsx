import React from 'react'
import {useLocation, useNavigationType} from 'react-router-dom'

export const AutoToTop = ({children}) => {
  let location = useLocation()
  let navType = useNavigationType()

   React.useEffect(() => {
        if(navType !== 'POP'){
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
    }, [location])

  return (
    <>{children}</>
  )
}