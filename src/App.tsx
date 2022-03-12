import React from 'react';
import './App.css';
import {HeroPick} from "./features/hero/HeroPick";
import {HeroInfo} from "./features/hero/HeroInfo";
import {Result} from "./features/hero/Result";

function App() {
    return (
        <div className="App">
            <HeroInfo/>
            <HeroPick/>
            <Result/>
        </div>
    );
}

export default App;
