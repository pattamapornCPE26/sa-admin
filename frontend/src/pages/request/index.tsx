import { Breadcrumb, Layout, Menu, Table, Input, ConfigProvider, Space,Tabs,Card, message, Button ,Form } from 'antd';
import './style.css'
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { CourseInterface } from '../../interface/ICourse';
import { UserOutlined,EditOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { CreateApprove, GetCourseByIDwantName} from '../../service/http';
import { ApprovedCourseInterface } from '../../interface/IApprovedCourse';

function Request(){
const navigate = useNavigate();
const [messageApi, contextHolder] = message.useMessage();
const [course, setCourse] = useState<CourseInterface[]>([]);

const onClick = (courseId: number | undefined) => {
  if(courseId !== undefined) {
    const Data: ApprovedCourseInterface = {
      Course_ID: courseId,
    }
    setTimeout(function () {
      navigate(`/approve/${courseId}`);
    }, 2000);
    console.log(Data);
    createApprove(Data);
  }
  else {
    console.log("CourseId is undefined");
  }
}

const createApprove  = async (data: ApprovedCourseInterface) => {
  let res = await CreateApprove(data);
  if (res.status) {
    setTimeout(function () {
      navigate(`/approve/${data.Course_ID}`);
    }, 2000);
  } else {
    messageApi.open({
      type: "error",
      content: "บันทึกข้อมูลไม่สำเร็จ",
    });
  }
}

const toggleMenu = () => {
  setExpanded(!expanded);
};

const [expanded, setExpanded] = useState(false);
const columns: ColumnsType<CourseInterface> = [
  {
    title: "ชื่อคอร์ส",
    dataIndex: "Name",
    key: "name",
  },
  {
    title: "ครูผู้สอน",
    dataIndex: "FirstName",
    key: "firstname",
  },
  {
    title: "แก้ไข",
    render: (text, record) => (
    <Button onClick={() => onClick(record.ID)}>
      <EditOutlined style={{ color: '#4D455D' }}/>
    </Button>
    ),
  },
];

const { Header, Content} = Layout;
const { Search } = Input;
const onChange = (label: string) => {
  console.log(label);
};

const getCourse = async () => {
  let res = await GetCourseByIDwantName();
  console.log(res)
  if (res) {
    setCourse(res);
  }
};

useEffect(() => {
  getCourse();
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
              itemSelectedColor: "#4D455D", //สีหนังสือแท็บที่เลือก
              itemHoverColor: "white",       //สีหนังสือตอนชี้
              itemActiveColor: "white",      //สีตอนคลิก
              cardHeight: 35,
              horizontalMargin: '74px 0px -94px 140px', //ตำแหน่ง tabs
              // itemColor: 'ed'
            },
          },   
        }}
      >
      <Tabs
        tabBarGutter = {3}/*ระยะห่างระหว่าง tab*/ 
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
          className="rectangle-card">
      </Card> 

      <Card 
        style={{
          width: 1386, 
          height: 748,  
          margin: '118px 147px', 
          border: '1px solid #7DB9B6'
          }} 
          className="rectangle1">  
      </Card>

      <Card
        style={{
          width: 1378, 
          height: 683, 
          margin: '122px 208px' , 
          border: '1px solid #E1E7F0'
          }} 
          className="rectangle2"> 
      </Card>
      
      <Table rowKey="ID" dataSource={course} columns={columns}
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

export default Request;