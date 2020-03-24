import React, { useState, createContext } from 'react';

import axios from 'axios';
import normalize from 'json-api-normalizer';

import ElectionsAxios from 'config/axios';

const defaultState = {
  users: [],
  next: null,
  error: null,
  hasMore: false,
  loading: false,
  searchingFor: null,
  locationLoading: false,
};

export const GlobalContext = createContext(defaultState);

const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const handleRequest = async (url, shouldReplace) => {
    setState({
      ...state,
      hasMore: false,
      loading: shouldReplace,
    });

    try {
      const { data } = await ElectionsAxios.get(url);

      const userData = Object.values(normalize(data).users);

      const { hasMore } = data.meta;
      const users = shouldReplace ? userData : [...state.users, ...userData];

      setState({
        users,
        hasMore,
        error: null,
        loading: false,
        next: hasMore ? data.links.next : null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        hasMore: false,
        error: error.message,
      });
    }
  };

  const findUsers = async fields => {
    const baseURL = '/users?';
    const search = Object.keys(fields)
      .map(field => `${field}=${fields[field]}`)
      .join('&');

    const url = `${baseURL}${search}&limit=10&offset=0`;

    handleRequest(url, true);
  };

  const loadMore = () => handleRequest(state.next, false);

  const locateUser = async (
    { index, region, address, community },
    viewport,
    setViewport,
  ) => {
    setState({ ...state, locationLoading: true, searchingFor: index });

    const { REACT_APP_MAPS_KEY } = process.env;

    const json = {
      options: {},
      location: {
        state: '',
        city: community,
        postalCode: '',
        adminArea1: 'AM',
        street: address.replace('Փ.', 'St.'),
      },
    };

    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${REACT_APP_MAPS_KEY}&json=${JSON.stringify(
      json,
    )}`;

    try {
      const result = await axios.get(url);
      const locations = result.data.results[0].locations;
      const { lat, lng } = locations[locations.length - 1].latLng;

      setViewport({
        ...viewport,
        zoom: 16,
        latitude: lat,
        longitude: lng,
      });
    } catch (error) {
      console.log(error);
    }

    setState({ ...state, locationLoading: false });
  };

  return (
    <GlobalContext.Provider
      value={{ ...state, findUsers, loadMore, locateUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
