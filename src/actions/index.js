import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const heroesFetching = createAction('HEROES_FETCHING'),
    heroesFetched = createAction('HEROES_FETCHED'),
    heroesFetchingError = createAction('HEROES_FETCHING_ERROR'),
    filtersFetching = createAction('FILTERS_FETCHING'),
    filtersFetched = createAction('FILTERS_FETCHED'),
    filtersFetchingError = createAction('FILTERS_FETCHING_ERROR'),
    activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED'),
    heroCreated = createAction('HERO_CREATED'),
    heroDeleted = createAction('HERO_DELETED')
