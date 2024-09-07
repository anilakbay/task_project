import React, { useState } from "react";
import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";

// Görev türünü tanımlıyoruz
interface Task {
  id: number; // Görev ID'si
  title: string; // Görev başlığı
  taskDesc: string; // Görev açıklaması
}

const App: React.FC = () => {
  // Görevlerin tutulduğu state'i tanımlıyoruz
  const [tasks, setTasks] = useState<Task[]>([]);

  // Yeni görev oluşturma fonksiyonu
  const createTask = (title: string, taskDesc: string) => {
    const newTask: Task = {
      id: Math.round(Math.random() * 999999), // Rastgele bir ID oluşturuyoruz
      title, // Başlığı parametre olarak alıyoruz
      taskDesc, // Açıklamayı parametre olarak alıyoruz
    };
    // Yeni görev ile birlikte eski görevleri de state'e ekliyoruz
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Görev silme fonksiyonu
  const deleteTaskById = (id: number) => {
    // ID'si verilen görev hariç tüm görevleri state'e geri yüklüyoruz
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Görev güncelleme fonksiyonu
  const editTaskById = (
    id: number,
    updatedTitle: string,
    updatedTaskDesc: string
  ) => {
    // ID'si verilen görev bulunur ve güncellenmiş başlık ve açıklama ile birlikte state'e geri yüklenir
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, taskDesc: updatedTaskDesc }
          : task
      )
    );
  };

  return (
    <div className="App">
      {/* Görev oluşturma bileşenini render ediyoruz ve onCreate prop'una createTask fonksiyonunu bağlıyoruz */}
      <TaskCreate onCreate={createTask} />
      {/* Başlık */}
      <h1>Görevler</h1>
      {/* Görev listesini render ediyoruz ve gerekli prop'ları bağlıyoruz */}
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
};

export default App;
