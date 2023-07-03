import dashboardIcon from '@/assets/dashboard.svg';
import youtubeIcon from '@/assets/youtube.svg';
import graduateIcon from '@/assets/graduate.svg';
import tagIcon from '@/assets/tag.svg';
const menus = [
  {
    title: 'Dashboard',
    icon: dashboardIcon,
    link: true,
    path: '/dashboard'
  },
  {
    title: 'Mantenimiento',
    icon: '',
    link: false,
    path: ''
  },
  {
    title: 'Videos Youtube',
    icon: youtubeIcon,
    link: true,
    path: '/canales'
  },
  {
    title: 'Recursos Educativos',
    icon: graduateIcon,
    link: true,
    path: '/recursos'
  },
  {
    title: 'Etiquetas',
    icon: tagIcon,
    link: true,
    path: '/etiquetas'
  }
];

export default menus;
