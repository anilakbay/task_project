import React from "react";
import TaskShow from "./TaskShow";

// Task tipi tanımı
interface Task {
  id: number;
  title: string;
  taskDesc: string;
}

// TaskList bileşeni için prop türleri
interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedTitle: string, updatedTaskDesc: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Görev bulunamadı.</p>
      ) : (
        tasks.map((task) => (
          <TaskShow
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
