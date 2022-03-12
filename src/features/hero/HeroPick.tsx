import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getResult, guess, Hero, loadHeroes} from "./heroSlice";
import './HeroPick.css'

type HeroPickOptionParams = {
    hero: Hero
}
function HeroPickOption({hero}: HeroPickOptionParams) {
    let dispatch = useAppDispatch();
    const guesses = useAppSelector(state => state.heroes.guesses)
    const result = useAppSelector(getResult);
    if (result !== undefined) {
        return (<div></div>)
    }
    var guessed = guesses.indexOf(hero.id) !== -1;
    const onClick = () => {
        if (!guessed) {
            dispatch(guess(hero.id))
        }
    }
    return (
        <img className={guessed ? "guessed": "not-guessed"} src={`https://api.opendota.com${hero.img}`} width="128" onClick={onClick}/>
    )
}

export function HeroPick() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.heroes.status)
    const heroes = useAppSelector(state => state.heroes.heroes)
    if (status === undefined) {
        dispatch(loadHeroes())
    }
    const heroesList = heroes.map(hero => (<HeroPickOption key={hero.id} hero={hero} />))
    return (
        <div>{heroesList}</div>
    )
}