import { useQuery, useRealm, Realm } from "@realm/react";
import Task from "../data/model/Task";
import { Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useCounterStore } from "../counter.store";
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';


const HomeScreen = observer(() => {
    const realm = useRealm();
    const tasks = useQuery(Task);
    const [newDescription, setNewDescription] = useState("");
    const { count, increment, decrement } = useCounterStore();
    const addTask = () => {
        if (newDescription.trim()) {
            realm.write(() => {
                realm.create(Task, {
                    _id: uuidv4(),
                    description: newDescription,
                    isCompleted: false,
                    createdAt: new Date(),
                });
            });
            setNewDescription("")
        }
    }

    const toggleCompletion = (task: Task) => {
        realm.write(() => {
            task.isCompleted = !task.isCompleted;
        });
    }

    const deleteTask = (task: Task) => {
        realm.write(() => {
            realm.delete(task);
        })
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Please input your Task description</Text>
                <TextInput
                    style={styles.inputText}
                    value={newDescription}
                    placeholder="Enter new task description"
                    onChangeText={setNewDescription}
                />

                <Button title="Save" onPress={addTask} />
            </View>

            <View>
                <Text>{`Clicked ${count} times!`}</Text>
                <Button title="Increment" onPress={increment} />
                <Button title="Decrement" onPress={decrement} />
            </View>


            <FlatList
                data={tasks}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.renderView}>
                        <Text style={styles.renderItem}>{item.description}</Text>
                        <View style={styles.myView}>
                            <Pressable onPress={() => toggleCompletion(item)}>
                                <Text style={styles.completeButton}>{item.isCompleted ? 'Undo' : 'Complete'}</Text>
                            </Pressable>
                            <Pressable onPress={() => deleteTask(item)}>
                                <Text style={styles.button}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                )}>

            </FlatList>

        </SafeAreaView >
    )
});
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 10,
    },
    inputText: {
        marginVertical: 10,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
    renderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: '#ddd',

    },
    renderItem: {
        padding: 10,

    },
    button: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        marginLeft: 10,
    },
    completeButton: {
        backgroundColor: 'green',
        padding: 10,
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    myView: {
        padding: 10,
        flexDirection: 'row'
    }
})

export default HomeScreen;