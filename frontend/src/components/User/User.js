import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import useStyles from './styles';
import { GlobalContext } from 'contexts/global';
import { CircularProgress } from '@material-ui/core';

const Link = ({ title, handler, children }) => {
  const classes = useStyles();

  const Title = <Typography>{title}</Typography>;

  return (
    <Tooltip title={Title} placement="top">
      <span onClick={handler} className={classes.link}>
        {children}
      </span>
    </Tooltip>
  );
};

const Address = ({ region, address, community }) => {
  const { findUsers } = useContext(GlobalContext);

  const handleOnClick = () => {
    findUsers({ region, address, community });
  };

  return (
    <Link
      handler={handleOnClick}
      title={`See everyone living at: "${address}"`}
    >
      {address}
    </Link>
  );
};

const Birthday = ({ birthDay, birthYear, birthMonth }) => {
  const { findUsers } = useContext(GlobalContext);

  const handleOnClick = () => findUsers({ birthDay, birthYear, birthMonth });

  const fullBirthday = `${birthDay}/${birthMonth}/${birthYear}`;

  return (
    <Link
      handler={handleOnClick}
      title={`See everyone born on: ${fullBirthday}`}
    >
      {fullBirthday}
    </Link>
  );
};

const User = ({
  index,
  viewport,
  setViewport,
  user: {
    attributes: {
      region,
      address,
      lastName,
      firstName,
      community,
      fathersName,
      birthDay,
      birthYear,
      birthMonth,
    },
  },
}) => {
  const classes = useStyles();

  const { searchingFor, locateUser, locationLoading } = useContext(
    GlobalContext,
  );

  const handleLocate = () =>
    locateUser({ index, region, address, community }, viewport, setViewport);

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {firstName} {lastName} {fathersName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {region.replace('եվ', 'և')} {bull} {community} {bull}{' '}
          <Address address={address} community={community} region={region} />
        </Typography>
        <Typography variant="body2" component="p">
          Born on{' '}
          <Birthday
            birthDay={birthDay}
            birthYear={birthYear}
            birthMonth={birthMonth}
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          size="small"
          color="secondary"
          variant="contained"
          onClick={handleLocate}
        >
          Locate On The Map{' '}
          {locationLoading && searchingFor === index && (
            <CircularProgress size={16} color="inherit" />
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default User;
