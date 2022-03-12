import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadHeroes = createAsyncThunk(
    'heroes/load',
    async () => {
        const response = await fetch("https://api.opendota.com/api/heroStats")
        // The value we return becomes the `fulfilled` action payload
        return await response.json();
    }
);

export type Hero = {
    id: number
    localized_name: string
    primary_attr: "agi" | "str" | "int"
    attack_type: "Melee" | "Ranged"
    roles: []
    img: string
    icon: string
    base_health: number
    base_health_regen: number
    base_mana: 75
    base_mana_regen: number
    base_armor: number
    base_mr: number
    base_attack_min: number
    base_attack_max: number
    base_str: number
    base_agi: number
    base_int: number
    str_gain: number
    agi_gain: number
    int_gain: number
    attack_range: number
    attack_rate: number
    move_speed: number
    legs: number
    turbo_picks: number
    turbo_wins: number
    pro_ban: number
    pro_win: number
    pro_pick: number
}

type state = {
    status: "loading" | "ready" | "failed" | undefined
    heroes: Hero[]
    guesses: number[]
}

export const heroSlice = createSlice({
    name: 'heroes',
    initialState: {
        heroes: [] as Hero[],
        guesses: [] as number[]
    } as state,
    reducers: {
        guess: (state, action: PayloadAction<number>) => {
            state.guesses.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadHeroes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadHeroes.fulfilled, (state, action) => {
                state.status = 'ready';
                state.heroes = action.payload;
            })
            .addCase(loadHeroes.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const selectHero = (state: RootState) => {
    const heroes = state.heroes.heroes
    if (heroes.length === 0) {
        return undefined
    }
    const seed = Math.floor(new Date().getTime() / 1000 / 86400)
    return heroes[Math.floor(mulberry32(seed)() * heroes.length)]
};

export const getResult = (state: RootState) => {
    const guesses = state.heroes.guesses
    if (guesses.length === 0) {
        return undefined
    }
    const hero = selectHero(state)
    if (hero === undefined) {
        return undefined
    }
    if (guesses[guesses.length - 1] === hero.id) {
        return "win"
    }
    if (guesses.length >= 13) {
        return "lose"
    }
    return undefined
}

function mulberry32(a: number) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export const {guess} = heroSlice.actions

export default heroSlice.reducer;
