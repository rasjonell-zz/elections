import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    marginBottom: 8,
    '&:hover': {
      boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
    },
    '&:active': {
      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
    },
  },
  bullet: {
    margin: '0 2px',
    display: 'inline-block',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
