import {getResult, Hero, selectHero} from "./heroSlice";
import {useAppSelector} from "../../app/hooks";
import './HeroInfo.css'

export function HeroInfo() {
    const hero = useAppSelector(selectHero)
    let guesses = useAppSelector(state => state.heroes.guesses);
    const result = useAppSelector(getResult)
    if (hero === undefined) {
        return (
            <div></div>
        )
    }
    const sanitise = function(level: number, data: any) {
        return guesses.indexOf(hero.id) !== -1 || level <= guesses.length ? data : "???";
    }
    const roles = hero.roles.map(role => (<span key={role} className="stat">{sanitise(2, role)}</span> ))
    const image = result === undefined ? "https://img.freepik.com/free-vector/tarot-card-floating-question-mark-shining-light_242650-24.jpg?size=626&ext=jpg" : `https://api.opendota.com${hero.img}`
    return (
        <div className="hero-info">
            <div className="portrait" style={{
                color: "white"
            }}>
                <img width="256" src={image}/>
                <div className="bar health">
                    {sanitise(1, hero.base_health + hero.base_str * 20)}
                    <span className="regen">+{sanitise(1, (hero.base_health_regen + hero.base_str * 0.1).toFixed(2))}</span>
                </div>
                <div className="bar mana">
                    {sanitise(1, hero.base_mana + hero.base_int * 12)}
                    <span className="regen">+{sanitise(1, (hero.base_mana_regen + hero.base_int * 0.05).toFixed(2))}</span>
                </div>
            </div>
            <div className="stats">
                <div className="group">
                    <span className="title">Performance</span>
                    <span className="stat">Pro Ban: <span className="value">{sanitise(0, hero.pro_ban)}</span></span>
                    <span className="stat">Pro Pick: <span className="value">{sanitise(0, hero.pro_pick)}</span></span>
                    <span className="stat">Pro Win Rate: <span className="value">{sanitise(0, getHeroProWinRate(hero).toFixed(2))}%</span></span>
                </div>
                <div className="group">
                    <span className="title">Roles</span>
                    {roles}
                </div>
                <div className="group">
                    <span className="title">Attributes</span>
                    <span className="stat">Str: <span className="value">{sanitise(3, hero.base_str)}<span className="secondary">{sanitise(3, '+' + hero.str_gain)}</span></span></span>
                    <span className="stat">Dex: <span className="value">{sanitise(4, hero.base_agi)}<span className="secondary">{sanitise(4, '+' + hero.agi_gain)}</span></span></span>
                    <span className="stat">Int: <span className="value">{sanitise(5, hero.base_int)}<span className="secondary">{sanitise(5, '+' + hero.int_gain)}</span></span></span>
                </div>
                <div className="group">
                    <span className="title">Stats</span>
                    <span className="stat">Legs: <span className="value">{sanitise(6, hero.legs)}</span></span>
                    <span className="stat">Movement speed: <span className="value">{sanitise(7, hero.move_speed)}</span></span>
                    <span className="stat">Attack type: <span className="value">{sanitise(8, hero.attack_type)}</span></span>
                    <span className="stat">Attack: <span className="value">{sanitise(9, getHeroAttack(hero))}</span></span>
                    <span className="stat">Attack per second: <span className="value">{sanitise(10, hero.attack_rate)}</span></span>
                    <span className="stat">Attack range: <span className="value">{sanitise(11, hero.attack_range)}</span></span>
                    <span className="stat">Armor: <span className="value">{sanitise(12, (hero.base_armor + hero.base_agi / 6).toFixed(1))}</span></span>
                </div>
            </div>
        </div>
    )
}

function getHeroAttack(hero: Hero): string {
    var statAttackBonus
    switch (hero.primary_attr) {
        case "agi":
            statAttackBonus = hero.base_agi
            break
        case "str":
            statAttackBonus = hero.base_str
            break
        case "int":
            statAttackBonus = hero.base_int
            break
    }
    return (hero.base_attack_min + statAttackBonus) + '-' + (hero.base_attack_max + statAttackBonus)
}

function getHeroProWinRate(hero: Hero): number {
    if (hero.pro_pick === 0) {
        return 0
    }
    return hero.pro_win * 100 / hero.pro_pick
}