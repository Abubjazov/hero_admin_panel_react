import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes } from '../heroesList/heroesSlice';
import { useGetHeroesQuery } from '../../api/apiSlice';
import { useHttp } from '../../hooks/http.hook';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery()

    const activeFilter = useSelector(state => state.filters.activeFilter)
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice()
        if (activeFilter === 'all') {
            return filteredHeroes
        }
        return filteredHeroes.filter(item => item.element === activeFilter)
    }, [heroes, activeFilter])

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    }, [request]);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)} />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;
