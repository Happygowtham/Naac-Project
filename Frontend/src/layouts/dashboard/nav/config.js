// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Criteria',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Key Identifier',
    path: '/key-identifier',
    icon: icon('ic_cart'),
  },
  {
    title: 'Benchmark Score',
    path: '/benchmark',
    icon: icon('ic_lock'),
  },
  {
    title: 'metrics - entry',
    path: '/metrics/1',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
];

export default navConfig;
