import React, { useState } from "react";
import TaskCreate from "./TaskCreate";

// Task tipi tanımı
interface Task {
  id: number;
  title: string;
  taskDesc: string;
}

// TaskShow bileşeni için prop türleri
interface TaskShowProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedTitle: string, updatedTaskDesc: string) => void;
}

const TaskShow: React.FC<TaskShowProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => onDelete(task.id);
  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleUpdate = (
    id: number,
    updatedTitle: string,
    updatedTaskDesc: string
  ) => {
    setIsEditing(false);
    onUpdate(id, updatedTitle, updatedTaskDesc);
  };

  return (
    <div className="task-show">
      {isEditing ? (
        <TaskCreate task={task} taskformUpdate={true} onUpdate={handleUpdate} />
      ) : (
        <div className="task-details">
          <h3 className="task-title">Başlık</h3>
          <p>{task.title}</p>
          <h3 className="task-title">Açıklama</h3>
          <p>{task.taskDesc}</p>
          <div className="task-actions">
            <button className="task-delete" onClick={handleDelete}>
              Sil
            </button>
            <button className="task-edit" onClick={handleEditToggle}>
              {isEditing ? "İptal" : "Güncelle"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskShow;
