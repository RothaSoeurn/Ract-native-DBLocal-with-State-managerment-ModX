import { RealmProvider } from "@realm/react";
import Task from "./data/model/Task";
import HomeScreen from "./page/HomeScreen";
import { CounterStoreContext, counterStore } from "./counter.store";
export default function App() {
  return (
    <RealmProvider schema={[Task]}>
      {/* <CounterStoreContext.Provider value={counterStore}> */}
      <HomeScreen />
      {/* </CounterStoreContext.Provider> */}
    </RealmProvider>
  );
}
