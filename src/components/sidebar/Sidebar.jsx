import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import logo from '../../assets/image/logo-navi.png';
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  CommentOutlined,
  FileTextOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ isDarkMode, toggleTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className="relative">

      {/* Botón de colapso */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 bg-white cursor-pointer dark:bg-gray-700 p-1.5 rounded-full shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform z-10"
        style={{ 
          backgroundColor: isDarkMode ? '#1f2937' : 'white',
          borderColor: isDarkMode ? '#4b5563' : '#e5e7eb'
        }}
      >
        {collapsed ? (
          <RightOutlined style={{ color: isDarkMode ? '#d1d5db' : '#4b5563', fontSize: '14px' }} />
        ) : (
          <LeftOutlined style={{ color: isDarkMode ? '#d1d5db' : '#4b5563', fontSize: '14px' }} />
        )}
      </button>
      
      <Sider 
        collapsed={collapsed}
        trigger={null}
        theme={isDarkMode ? 'dark' : 'light'}
        width={240}
        collapsedWidth={80}
        className="min-h-screen shadow-lg"
        style={{ 
          backgroundColor: isDarkMode ? '#1f2937' : 'white',
          color: isDarkMode ? 'white' : '#1f2937',
        }}
      >
        {/* Logo */}
        <div className="p-4 py-8">
          <div className="flex justify-center">
            <img src={logo} alt="logo" width="80px" />
          </div>
        </div>
        
        {/* Menú */}
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          style={{ 
            marginTop: 20,
            borderRight: 0,
            backgroundColor: isDarkMode ? '#1f2937' : 'white',
          }}
          items={[
            // {
            //   key: '/admin/panel',
            //   icon: <HomeOutlined />,
            //   label: 'Inicio',
            // },
            {
              key: '/admin/panel/products',
              icon: <ShoppingOutlined />,
              label: 'Productos',
            },
            {
              key: '/admin/panel/categories',
              icon: <ShoppingOutlined /> ,
              label: 'Pedidos',
            },
            {
              key: '/admin/panel/customers',
              icon: <UserOutlined />,
              label: 'Clientes',
            },
            {
              key: '/admin/panel/coments',
              icon: <CommentOutlined />,
              label: 'Comentarios',
            },
            {
              key: '/admin/panel/blogs',
              icon: <FileTextOutlined />,
              label: 'Blogs',
            },
            {
              key: 'page',
              icon: <SettingOutlined />,
              label: 'Página',
              children: [
                {
                  key: '/admin/panel/page/policy',
                  label: 'Política',
                },
                {
                  key: '/admin/panel/page/service',
                  label: 'Servicios',
                },
              ],
            },
          ]}
        />
        
        {/* Botón de cambio de tema al final del sidebar */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t flex justify-center"
          style={{ 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            paddingBottom: '16px', 
            paddingTop: '16px'
          }}
        >
          <Button
            type="text"
            onClick={toggleTheme}
            icon={isDarkMode ? (
              <SunOutlined style={{ fontSize: '20px', color: '#fbbf24' }} />
            ) : (
              <MoonOutlined style={{ fontSize: '20px', color: '#4b5563' }} />
            )}
            size="large"
          />
          {!collapsed && (
            <span
              style={{ 
                marginLeft: '8px',
                color: isDarkMode ? '#9ca3af' : '#4b5563',
                alignSelf: 'center'
              }}
            >
              {isDarkMode ? 'Claro' : 'Oscuro'}
            </span>
          )}
        </div>
      </Sider>
    </div>
  );
};

export default Sidebar;