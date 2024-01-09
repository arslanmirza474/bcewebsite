import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add logic for checking email and password
    if (email === 'sergio@bceins.com' && password === 'Master@5667') {
      setLoggedIn(true);
      navigate('/dashboard'); // Use navigate to go to the dashboard page
    } else if(email === 'sbolanos@bceins.com' && password === 'Melvin@') {
      setLoggedIn(true);
      navigate('/dashboard'); 
    }else{
      message.error('Invalid email or password');

    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login" style={{ width: 300 }}>
        <Form onFinish={handleLogin} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
