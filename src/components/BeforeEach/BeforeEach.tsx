 import {useLocation,Navigate, matchRoutes} from 'react-router-dom';
 import {routes} from '@/router/index';
 interface BeforeEachProps{
  children?:React.ReactNode,

 }
 
 const BeforeEach = (props:BeforeEachProps)=>{
  const location=useLocation()
  const matchs=matchRoutes(routes,location)
  // console.log(matchs)
  // if(Array.isArray(matchs)){
  //   const meta=matchs[matchs.length-1].route.meta
  //   if(meta?.auth){
  //     return <Navigate to='/login'></Navigate>
  //   }
  // }

  return (
    <div>
      {props.children}
    </div>
  )
 }

 export default BeforeEach