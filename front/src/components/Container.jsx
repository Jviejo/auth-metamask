import Header from './Header'
import { Outlet } from 'react-router-dom'

function Container() {
  return (
    <div className='container vw-100 vh-100 d-flex flex-column'>
      <Header/>
      <Outlet />
    </div>
  )
}
export default Container