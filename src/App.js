import { RealmProvider } from "@realm/react";
import Task from "./data/model/Task";
import HomeScreen from "./page/HomeScreen";

export default function App() {
  return (
    <RealmProvider schema={[Task]}>
      <HomeScreen />
    </RealmProvider>

  );

}
