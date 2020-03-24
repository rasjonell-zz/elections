import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    width: '30%',
    height: '100%',
    margin: `4px 8px`,
    overflow: 'hidden',
  },
  formRoot: {
    height: '10%',
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(),
  },
  formWrapper: {
    width: '100%',
    display: 'flex',
  },
  formInput: {
    width: '50%',
    marginRight: theme.spacing(),
  },
  content: {
    width: '100%',
    height: '90%',
    overflowY: 'scroll',
    // hide scrollbars
    // '-ms-overflow-style': 'none',
    // scrollbarWidth: 'none',
    // '&::-webkit-scrollbar': {
    //   display: 'none',
    // },
  },
}));
