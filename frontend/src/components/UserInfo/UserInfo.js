import React, { useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';

import User from 'components/User';
import Loading from 'components/Loading';

import { GlobalContext } from 'contexts/global';

import useStyles from './styles';

const Users = ({ viewport, setViewport }) => {
  const { loading, users, hasMore, loadMore } = useContext(GlobalContext);

  if (loading) return <Loading />;

  return (
    <InfiniteScroll
      threshold={700}
      useWindow={false}
      hasMore={hasMore}
      loadMore={loadMore}
      loader={<div key="0">Loading...</div>}
    >
      {users.map((user, index) => (
        <User
          user={user}
          key={user.id}
          index={index}
          viewport={viewport}
          setViewport={setViewport}
        />
      ))}
    </InfiniteScroll>
  );
};

const UserInfo = ({ viewport, setViewport }) => {
  const classes = useStyles();
  const { findUsers } = useContext(GlobalContext);

  const [state, setState] = useState({
    region: '',
    address: '',
    section: '',
    lastName: '',
    firstName: '',
    community: '',
    subsection: '',
    fathersName: '',
    birthDay: null,
    birthYear: null,
    birthMonth: null,
  });

  const handleSubmit = () => {
    const content = document.getElementById('content');
    content.scroll(0, 0);

    const { firstName, lastName } = state;
    findUsers({ firstName, lastName });
  };

  const handleKeyUp = ({ key }) => {
    if (key !== 'Enter') return;

    handleSubmit();
  };

  const handleChange = ({ target: { name, value } }) =>
    setState({ ...state, [name]: value });

  return (
    <div className={classes.root}>
      <div className={classes.formRoot}>
        <div className={classes.inline}>
          <div className={classes.formWrapper}>
            <div className={classes.formInput}>
              <TextField
                fullWidth
                name="firstName"
                variant="outlined"
                label="First Name"
                onKeyUp={handleKeyUp}
                value={state.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={classes.formInput}>
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                onKeyUp={handleKeyUp}
                value={state.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <IconButton onClick={handleSubmit} color="secondary">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div id="content" className={classes.content}>
        <Users viewport={viewport} setViewport={setViewport} />
      </div>
    </div>
  );
};

export default UserInfo;
