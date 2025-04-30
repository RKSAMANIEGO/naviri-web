import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import logo from '../../../assets/image/logo-navi.png';
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
  QuestionOutlined,
  RightOutlined,
  MailOutlined,
  TagsOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useAuthStore } from '../../../core/context/authProvider';

const { Sider } = Layout;

const Sidebar = ({ isDarkMode, toggleTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <div className="relative">

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
        <div className="p-4 py-8">
          <div className="flex justify-center">
            <img src={logo} alt="logo" width="80px" />
          </div>
        </div>
        
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
          className="custom-sidebar-menu"
          items={[
            {
              key: '/admin/panel/products',
              icon: <ShoppingOutlined />,
              label: 'Productos',
            },


            {
              key: '/admin/panel/categories',
              icon: <ShoppingOutlined />,
              label: 'Categorias',
            },
            {
              key: '/admin/panel/customers',
              icon: <UserOutlined />,
              label: 'Información',
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
              key: '/admin/panel/mail',
              icon: <MailOutlined />,
              label: 'Usuarios',
            },
            {
              key: '/admin/panel/promotions',
              icon: <TagsOutlined />,
              label: 'Promociones',
            },
            /*
            {
              key: '/admin/panel/questions',
              icon: <QuestionOutlined />,
              label: 'Preguntas y Respuestas',
            },*/
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
                {
                  key: '/admin/panel/page/about',
                  label: 'About Us',
                },
              ],
            },
          ]}
        />
        
        <style jsx="true">{`
          .custom-sidebar-menu .ant-menu-item:hover {
            background-color: rgba(255, 241, 249, 1) !important;
          }
          
          .custom-sidebar-menu .ant-menu-submenu-title:hover {
            background-color: rgba(255, 241, 249, 1) !important;
          }
          
          .custom-sidebar-menu .ant-menu-item-selected {
            background-color: rgba(255, 241, 249, 1) !important;
            color: rgba(0, 0, 0, 0.88) !important;
          }
          
          .custom-sidebar-menu .ant-menu-item-selected .ant-menu-item-icon {
            color: rgba(255, 107, 188, 1) !important;
          }
          
          .ant-menu-light .ant-menu-item-selected {
            color: rgba(255, 107, 188, 1) !important;
          }

          .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline .ant-menu-item-selected {
            background-color: rgba(255, 241, 249, 1) !important;
          }
        `}</style>
        
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t flex flex-col items-center space-y-4"
          style={{ 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb',
            paddingBottom: '16px', 
            paddingTop: '16px'
          }}
        >
          <div className="flex flex-col items-center">
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
                  color: isDarkMode ? '#9ca3af' : '#4b5563'
                }}
              >
                {isDarkMode ? 'Claro' : 'Oscuro'}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <Button
              type="text"
              onClick={() => { logout(); navigate('/login'); }}
              icon={<LogoutOutlined style={{ fontSize: '20px', color: isDarkMode ? '#f87171' : '#4b5563' }} />}
              size="large"
            />
            {!collapsed && (
              <span
                style={{ 
                  color: isDarkMode ? '#f87171' : '#4b5563'
                }}
              >
                Cerrar sesión
              </span>
            )}
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default Sidebar;