import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Modal, Input, Tag, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { notification } from 'antd';
import "./dash.css"
const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [informId, setInformId] = useState(null);
  const [loading, setLoading] = useState(true); 
 const [searchfield,setSearchfield]=useState("")
  const navigate = useNavigate();

  const fetchMessage = async (id) => {
    try {
      const response = await axios.get(`https://serverforbce.vercel.app/api/getmeesagebyinformid/${id}`);
      const messages = response.data.data;
      return {
        length: messages.length,
        lastMessage: messages.length > 0 ? messages[messages.length - 1].Message : null,
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return {
        length: 0,
        lastMessage: null,
      };
    }
  };

  const fetchData = async () => {
    setSearchfield("")
    try {
      setLoading(true);
      const response = await axios.get('https://serverforbce.vercel.app/api/getinformation');
      const informationData = response.data.data;

      const newData = await Promise.all(
        informationData.map(async (item) => {
          const messageInfo = await fetchMessage(item._id);
          return {
            ...item,
            messageLength: messageInfo.length + " " + "times",
            lastMessagePreview: messageInfo.lastMessage
              ? `${messageInfo.lastMessage.slice(0, 20)}...`
              : 'Not connected yet',
          };
        })
      );

      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); 
    }
  };

  const searchresult = async (e) => {
    e.preventDefault();
  
    if (searchfield === "") {
      return;
    }
  
    try {
      const res = await axios.get(`https://serverforbce.vercel.app/api/getinformationbyid/${searchfield}`);
      
      if (res.data.status === false) {
        throw new Error("Invalid Id");
      }
  
      const itemData = res.data.data;
  
      // Set the data state with the information for the single item
      setData([itemData]);
  
      // Fetch messages for the single item
      fetchMessage(itemData._id)
        .then((messageInfo) => {
          // Update the message count and last message preview in the state
          setData((prevData) => {
            const updatedData = prevData.map((item) => {
              if (item._id === itemData._id) {
                return {
                  ...item,
                  messageLength: messageInfo.length + " times",
                  lastMessagePreview: messageInfo.lastMessage
                    ? `${messageInfo.lastMessage.slice(0, 20)}...`
                    : 'Not connected yet',
                };
              }
              return item;
            });
            return updatedData;
          });
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
          // Handle the error if needed
        });
    } catch (error) {
      console.error('Error fetching information by ID:', error.message);
      notification.error({
        message: 'Error',
        description: "Invalid Id",
      });      // Handle the error if needed
    }
  };
  
  



  const showDetail = (record) => {
    console.log('Show details for:', record);
    navigate(`/detail/${record._id}`);
  };

  const showModal = (record) => {
    const informId = record._id; // Assuming _id is the informId
    setInformId(informId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      console.log('InformId in handleOk:', informId);
      console.log('Message:', message);

      if (informId) {
        const response = await axios.post('https://serverforbce.vercel.app/api/postmessage', {
          informId: informId,
          Message: message,
        });

        console.log('Message posted:', response.data);

        // Close the modal and fetch data again
        setIsModalVisible(false);
        fetchData();
      } else {
        console.error('No informId provided for posting message.');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMessage('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Business Type',
      dataIndex: 'bussinesstype',
      key: 'bussinesstype',
      width: 200,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
     {
      title: 'Interaction Count',
      dataIndex: 'messageLength',
      key: 'messageLength',
      render: (text, record) => (
        record.messageLength === "0 times" ? (
          <Tag color="green">{record.messageLength} </Tag>
        ) : (
          <span>{record.messageLength} </span>
        )
      ),
    },
    {
      title: 'Last Message Preview',
      dataIndex: 'lastMessagePreview',
      key: 'lastMessagePreview',
      render: (text, record) => (
        <Tag color="magenta">{record.lastMessagePreview}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetail(record)}>
            Details
          </Button>
          <Button type="default" onClick={() => showModal(record)}>
            Post Message
          </Button>
        </Space>
      ),
    },
    {
      title: 'Timestamps',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => (
        <>
         <span>{moment(record.createdAt).format('MM-DD-YYYY')}</span>
        <Tag className='mx-2' color="green"> <span>{moment(record.createdAt).format('HH:mm')}</span>
        </Tag>
        </>
       
      ),
    },

    
  ];
  

  return (
    <div style={{ padding: '20px' }}>
    <h1>Dashboard</h1><button className='btn btn-primary' onClick={fetchData}><i class="fa-solid fa-arrow-rotate-right"></i></button>

  
    <form action="" class="search-bar">
	<input value={searchfield}  onChange={(e)=>{setSearchfield(e.target.value)}} autoComplete='off' name="search" pattern=".*\S.*" required/>
	<button onClick={searchresult} class="search-btn" type="submit">
		<span>Search</span>
	</button>
  
</form>

    <Spin spinning={loading}> 
      <Table columns={columns} dataSource={data} />
    </Spin>

    <Modal
      title="Post Message"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input.TextArea
        placeholder="Write your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </Modal>
  </div>
  );
};

export default DashboardPage;
