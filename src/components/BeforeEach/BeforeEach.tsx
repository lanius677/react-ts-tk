 import {useLocation,Navigate, matchRoutes} from 'react-router-dom';
 import {routes} from '@/router/index';
import { useAppDispatch } from '@/store';
import { infosAction } from '@/store/modules/users';
 interface BeforeEachProps{
  children?:React.ReactNode,

 }
 
 const BeforeEach = (props:BeforeEachProps)=>{

  const dispatch=useAppDispatch()
  const location=useLocation()
  const matchs=matchRoutes(routes,location)
  // console.log(matchs)
  if(Array.isArray(matchs)){
    const meta=matchs[matchs.length-1].route.meta
    if(meta?.auth){
      dispatch(infosAction()).then((action)=>{
        console.log('action.payload',action.payload)
      })
      // return <Navigate to='/login'></Navigate>
    }
  }

  return (
    <div>
      {props.children}
    </div>
  )
 }

 export default BeforeEach