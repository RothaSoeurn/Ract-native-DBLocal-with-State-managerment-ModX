import { makeObservable, action, observable } from 'mobx';
import React from 'react';

class CounterStore {
    count = 0;

    constructor() {
        makeObservable(this, {
            count: observable,
            increment: action.bound,
            decrement: action.bound,
        })
    }

    increment() {
        this.count++;
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
        }
    }
}

export const counterStore = new CounterStore();
export const CounterStoreContext = React.createContext(counterStore);
export const useCounterStore = () => React.useContext(CounterStoreContext);