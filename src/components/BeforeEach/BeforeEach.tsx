import { useLocation, Navigate, matchRoutes } from 'react-router-dom';
import { routes } from '@/router/index';
import { useAppDispatch } from '@/store';
import { infosAction, updateInfos } from '@/store/modules/users';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import _ from 'lodash';

interface BeforeEachProps {
  children?: React.ReactNode,

}

const BeforeEach = (props: BeforeEachProps) => {

  const dispatch = useAppDispatch()

  const token = useSelector((state: RootState) => state.users.token)
  const infos = useSelector((state: RootState) => state.users.infos)

  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  // console.log(matchs)
  if (Array.isArray(matchs)) {

    const meta = matchs[matchs.length - 1].route.meta
    if (meta?.auth && _.isEmpty(infos)) {

      if (token) {
        dispatch(infosAction()).then((action) => {
          const { errcode, infos } = (action.payload as { [index: string]: unknown }).data as { [index: string]: string & number }

          if (errcode === 0) {
            dispatch(updateInfos(infos))
          }

        })
      } else {
        return <Navigate to='/login'></Navigate>
      }


    }
  }
  if (token && location.pathname === '/login') {
    return <Navigate to='/'></Navigate>
  }

  return (
    <div>
      {props.children}
    </div>
  )
}

export default BeforeEach