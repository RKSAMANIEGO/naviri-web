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
  LogoutOutlined,
  FolderOutlined
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
  className="h-screen shadow-lg flex flex-col sticky top-0"
  style={{ 
    backgroundColor: isDarkMode ? '#1f2937' : 'white',
    color: isDarkMode ? 'white' : '#1f2937',
  }}
>
        <div className="p-4 py-8 flex-shrink-0"> 
          <div className="flex justify-center">
            <img src={logo} alt="logo" width="80px" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto h-[calc(100vh-250px)] hide-scrollbar">
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            style={{ 
              borderRight: 0,
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
            }}
            className="custom-sidebar-menu h-full"
            items={[
              {
                key: '/admin/panel/products',
                icon: <ShoppingOutlined />,
                label: 'Productos',
              },
              
              {
                key: '/admin/panel/categories',
                icon: <FolderOutlined />,
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
                label: 'Correo',
              },
              {
                key: '/admin/panel/promotions',
                icon: <TagsOutlined />,
                label: 'Promociones',
              },
               {
                key: '/admin/panel/questions',
                icon: <QuestionOutlined />,
                label: 'Preguntas & Respuestas',
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
                  {
                    key: '/admin/panel/page/about',
                    label: 'About Us',
                  },
                ],
              },
            ]}
          />
        </div>

        {/* Botones en fila */}
        <div 
          className="border-t p-4 flex-shrink-0"
          style={{ 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          <div className={`flex ${collapsed ? 'flex-col items-center gap-4' : 'flex-row justify-around'}`}>
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
                <span style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
                  {isDarkMode ? 'Claro' : 'Oscuro'}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center">
              <Button
                type="text"
                onClick={() => { logout(); navigate('/login'); }}
                icon={<LogoutOutlined style={{ 
                  fontSize: '20px', 
                  color: isDarkMode ? '#f87171' : '#4b5563' 
                }} />}
                size="large"
              />
              {!collapsed && (
                <span style={{ color: isDarkMode ? '#f87171' : '#4b5563' }}>
                  Cerrar sesión
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Estilos se mantienen igual */}
        <style jsx="true">{`
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
          
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
      </Sider>
    </div>
  );
};

export default Sidebar;