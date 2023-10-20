import { useEffect, useState } from 'react';
import './style.css'
import { Breadcrumb, Layout, Menu, Input, ConfigProvider, Space, Card, Tabs, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GetCourseApproved } from '../../service/http';
import { CourseInterface } from '../../interface/ICourse';

function Approved() {
const { Header, Content} = Layout;
const { Search } = Input;
const onChange = (key: string) => {
  console.log(key);
};
const [courseApproved, setCourse] = useState<CourseInterface[]>([]);
const getCourse = async () => {
  let res = await GetCourseApproved();
  console.log(res)
  if (res) {
    setCourse(res);
  }
};

useEffect(() => {
  getCourse();
}, []);

const columns = [
  {
    title: 'ชื่อคอร์ส',
    dataIndex: 'Name',
  },
  {
    title: 'ครูผู้สอน',
    dataIndex: 'FirstName',
  },
  {
    title: 'เวลาที่อนุมัติ',
    dataIndex: 'Time_Approve',
  },
  {
    title: 'สถานะ',
    dataIndex: 'StatusName',
  },
];
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
        <Space>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemHoverColor:'#E96479',
                colorPrimary: '#E96479'
              },
            },
          }}
        >
        <Menu
          mode="horizontal"
          style={{paddingRight: '600px'}}
          items={[{ key: '1', label: 'Explore' }]}
        />
        </ConfigProvider> 
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 10,
              colorBgContainer: 'white',
              colorPrimaryHover: '#E96479'
            }
          }}
        >
        <Search placeholder="Want to learn something?" className='search' style={{ width: 250}} />
        </ConfigProvider>
        <div className='SkillFlex'>
          <span className='skill'>Skill</span>
          <span className='flex'>Flex</span>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemHoverColor:'#E96479',
                colorPrimary: '#E96479'
              },
            },
          }}>
        <Menu
          mode="horizontal"
          style={{paddingLeft: '670px' }}
          items={[
            {key: '2', label: 'Contact us'},
            {key: '3', icon: <UserOutlined />, label: 'Username'},
          ]}
        />
        </ConfigProvider>  
        </Space>
      </Header>
      <Content className='colourBG' style={{padding: '0 50px'}}>
        <Breadcrumb style={{ margin: '37px ' }}>
        <Breadcrumb.Item className='welcome'>Welcome Back!!!</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <ConfigProvider  
        theme={{
          components: {
            Tabs: {
              cardBg : '#7DB9B6',
              itemSelectedColor: "#4D455D", 
              itemHoverColor: "white",       
              itemActiveColor: "white",      
              cardHeight: 35,
              horizontalMargin: '74px 0px -94px 140px', 
            },
          },   
        }}
      >
      <Tabs 
        tabBarGutter = {3}
        defaultActiveKey="2" 
        id="request"
        onChange={onChange}
        type="card"
        items={[
          {
            label: <Link to='/'>คำขอทั้งหมด</Link>,
            key: '1',        
          } ,
          {
            label: <Link to='/approved'>คำขออนุมัติสำเร็จ</Link>,
            key: '2',
          },
          
        ]}
      />
    </ConfigProvider>
    <Card 
      style={{
        width: 1440, 
        height: 792 , 
        margin: '93px 122px', 
        border: '1px solid #4D455D',
      }} 
      className="rectangle-card"
    >
    </Card>
    <Card 
      style={{
        width: 1386, 
        height: 748,  
        margin: '118px 147px', 
        border: '1px solid #7DB9B6'
      }} 
      className="rectangle1"
    >
    </Card>
    <Card 
      style={{
        width: 1378, 
        height: 683, 
        margin: '122px 208px' , 
        border: '1px solid #E1E7F0'
      }} 
      className="rectangle2"
    >
    </Card>
    <Table dataSource={courseApproved} columns={columns}
      style={{
        position: 'absolute',
        zIndex: 5,
        top: 380,
        left: 170,
        width: 1340,
      }}
    />
    </Layout>    
  );
}
export default Approved;