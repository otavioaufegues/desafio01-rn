import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = tasks.find((task) => task.title === newTaskTitle);

    if (newTask) {
      Alert.alert("Tarefa já existe!");
      return;
    }

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, task]);
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    //copia
    const copiaTasks = tasks.map((task) => ({ ...task }));

    //buscar item
    const newTask = copiaTasks.find((task) => task.id === id);

    // modificacao
    if (!newTask) return;

    newTask.done = !newTask.done;

    setTasks(copiaTasks);

    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
        },
        {
          text: "Sim",
          onPress: () => {
            const newList: Task[] = tasks.filter((task) => task.id !== id);
            setTasks(newList);
          },
        },
      ]
    );

    //TODO - remove task from state
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    //copia
    const copiaTasks = tasks.map((task) => ({ ...task }));

    //buscar item
    const newTask = copiaTasks.find((task) => task.id === id);

    // modificacao
    if (!newTask) return;

    newTask.title = taskNewTitle;

    setTasks(copiaTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
