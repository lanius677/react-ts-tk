import styles from './Login.module.sass';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { loginAction, updateToken } from '@/store/modules/users';

import { Button, message, Form, Input, Checkbox, Row, Col } from 'antd'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'


interface User {
  email: string
  pass: string
}

const testUsers: User[] = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong'
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong'
  }
];

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const token = useSelector((state: RootState) => state.users.token)
  const dispatch = useAppDispatch()


  const autoLogin = (values: User) => {
    console.log('autoLogin:',values)
    const { email, pass } = values
    return () => {
      form.setFieldsValue({ username: email, password: pass })
      onFinish(values)
    }

  }


  const onFinish = (values: User) => {
    console.log('success:', values)
    dispatch(loginAction(values)).then((action) => {
      // console.log('action:',action)
      const { errcode, token } = (action.payload as { [index: string]: unknown }).data as { [index: string]: string & number }
      if (errcode === 0) {
        dispatch(updateToken(token))
        message.success('登录成功')
        navigate('/')
      } else {
        message.error('登录失败')

      }
    })
  }

  const onFinishFailed = ({ values }: { values: User }) => {
    console.log('fail::', values)

  }

  return (
    <div className={styles.login}>
      {/* 头部区域 */}
      <div className={styles.header}>
        <span className={styles['header-logo']}>
          <i className={classNames('iconfont icon-react', styles['icon-react'])}></i>
          <i className={classNames('iconfont icon-icon-test', styles['icon-icon-test'])}></i>
          <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
        </span>
        <span className={styles['header-title']}>在线考勤系统</span>
      </div>
      <div className={styles.desc}>
        React+TypeScript
      </div>

      {/* 输入框 */}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.main}
        form={form}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { type: 'email', message: '请输入正确的邮箱地址' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>

      {/* 测试账号区域 */}
      <div className={styles.users}>
        <Row gutter={26}>
          {
            testUsers.map((v) => (
              <Col key={v.email} span={12}>
                <h3>
                  测试账号:
                  <Button size='small' onClick={autoLogin({ email: v.email, pass: v.pass })}>快速登录</Button>
                </h3>
                <p>邮箱：{v.email}</p>
                <p>密码：{v.pass}</p>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default Login