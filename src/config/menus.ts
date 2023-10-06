import dashboardIcon from '#/assets/dashboard.svg';
import youtubeIcon from '#/assets/youtube.svg';
import graduateIcon from '#/assets/graduate.svg';
import tagIcon from '#/assets/tag.svg';
const menus = [
  {
    title: 'Dashboard',
    icon: dashboardIcon,
    link: true,
    path: '/app/dashboard'
  },
  {
    title: 'Mantenimiento',
    icon: '',
    link: false,
    path: ''
  },

  {
    title: 'Recursos Educativos',
    icon: graduateIcon,
    link: true,
    path: '/app/recourse'
  },
  {
    title: 'Etiquetas',
    icon: tagIcon,
    link: true,
    path: '/app/tag'
  }
];

export default menus;

/**
 * {
    title: 'Videos Youtube',
    icon: youtubeIcon,
    link: true,
    path: '/app/canales'
  },
 * / */
