import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Breadcrumb, Layout, Menu, Tabs, Button, Input, ConfigProvider, Space, Card,Form,message, Descriptions } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { GetContentByID,UpdateStatusApprove,UpdateStatusDisapprove } from '../../service/http';
import { CourseInterface } from '../../interface/ICourse';
import { ApprovedCourseInterface } from '../../interface/IApprovedCourse';
import { DisDescription } from '../../interface/IDisDescription';


function Approve() {
  const { Header, Content} = Layout;
  const { Search } = Input;
  const onChange = (key: string) => {
    console.log(key);
  };
  const columns: ColumnsType<CourseInterface> = [
    {
      title: "หน่วยการเรียนรู้",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "รายละเอียดคอร์ส",
      dataIndex: "Description",
      key: "description",                                                                                                                                                                                                                                                                                
    },
    {
      title: "วิดีโอ",
      dataIndex: "VideoPath",
      key: "video_path",                                                                                                                                                                                                                                                                                
    },
  ];

  const {cid} = useParams();
  const [content, setContent] = useState<CourseInterface[]>([]);
  const [contDescription, setDescription] = useState('');

  const getContentByID = async (id : Number) => {
    let res = await GetContentByID(id);
    console.log(res)
    if (res) {
      setContent(res);
    }
  };
  
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/approved"); 
  }
  const [messageApi, contextHolder] = message.useMessage();
  const GetStatusAp = async (id: Number) => {
    let res = await UpdateStatusApprove(id);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "อนุมัติข้อมูลสำเร็จ"
      });
      setTimeout(function () {
        navigate(`/approved`);
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ"
      });
    }
  }
  
  // const GetStatusDis = async (id: Number) => {
    const GetStatusDis = async (values: string) => {
    const Data: DisDescription = {
      Course_ID: Number(cid),
      Description: values
    }
    console.log(values)
    console.log(Data)
    
    let res = await UpdateStatusDisapprove(Data);

    console.log(res)
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "ไม่อนุมัติข้อมูลสำเร็จ"
      });
      setTimeout(function () {
        navigate(`/`);
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ"
      });
    }
  }

  useEffect(() => {
    getContentByID(Number(cid));
  }, []);

  return (
    <Layout className="layout">
      {contextHolder}
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
        <Search placeholder="Want to learn something?" className='search'  /*onSearch={onSearch}*/ style={{ width: 250}} />
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
              itemColor: 'ed'
            },
          },   
        }}
      >
      <Tabs
        tabBarGutter = {3}
        defaultActiveKey="1"
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
      
      <ConfigProvider
          theme={{
              token: {
                  colorPrimaryHover: 'pink',
                  colorPrimaryActive: '#E96479',
                  colorPrimary: '#E96479',
              },
          }}
          >
      <Space wrap>
          <Button type="primary" className="button" onClick={ () => GetStatusAp(Number(cid)) }> approve</Button>
      </Space>
      </ConfigProvider>
      <span>
      <ConfigProvider 
        theme={{
          components: {
            Input: {
              hoverBorderColor: 'black',
              colorPrimaryHover: 'balck',
              paddingBlock: 3, 
            },
          },
        }}
      >
      <Form.Item name = "Description" >
      <Input 
        style={{
          width: 456,
          top: -170,
          left: 1055,
        }}  
        className='Box-disapprove'
        placeholder="disapprove description"
        onChange={ (e) => {setDescription(e.target.value)}}
        value={ contDescription }
        />
      </Form.Item>
      <Space> 
        <Button className="bt-disapprove" type="default" onClick={ () => GetStatusDis(contDescription)}>disapprove <SendOutlined /></Button>
      </Space>
      </ConfigProvider>
      </span>
      <Table dataSource={content} columns={columns}
        style={{
          position: 'absolute',
          zIndex: 5,
          top: 330,
          left: 170,
          width: 1340,
        }}
        />
    </Layout>    
  );
}

export default Approve;
