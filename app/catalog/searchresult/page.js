'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const page = ({props}) => {
  const searchParams = useSearchParams()

  useEffect(() => {
    // The counter changed!
    
  }, [searchParams.get('q')])
  return (
    <div>Hello {searchParams.get('q')}
    
    <p>{props}</p>
    
    </div>
  )
}

export default page

export const getStaticProps = async () => {
  return {props: 'Hello'}
}