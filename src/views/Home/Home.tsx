import styles from './Home.module.scss';
import { Layout } from 'antd';
import HomeHeader from '@/views/Home/components/HomeHeader'
import HomeAside from '@/views/Home/components/HomeAside'
import HomeBreadCrumb from '@/views/Home/components/HomeBreadCrumb'
import HomeMain from '@/views/Home/components/HomeMain'


const { Header, Content, Sider } = Layout;
const Home = () => {
  return (
    <div>
      <Layout>
        <Header className="header">
          <HomeHeader></HomeHeader>
        </Header>
        <Layout>
          <Sider width={300} theme='light'>
            <HomeAside></HomeAside>
          </Sider>
          <Layout style={{ padding: '20px' }}>
            <HomeBreadCrumb></HomeBreadCrumb>
            <Content>
              <HomeMain></HomeMain>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home