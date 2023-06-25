import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PublicRoutes = ({children}) => {
  const session = useSelector((state) => state.auth.session)
  const navigate = useNavigate()
  useEffect(() => {
    if(session) {
      navigate('/dashboard')
    }
  }, [session, navigate])
  return session ? null: children
}

export default PublicRoutes

