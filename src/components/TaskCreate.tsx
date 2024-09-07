import React, { useState, ChangeEvent, FormEvent } from "react"; // React ve gerekli türleri içe aktarır

// Task nesnesinin yapısını tanımlar
interface Task {
  id: number;
  title: string;
  taskDesc: string;
}

// TaskCreate bileşeninin alabileceği props'ları tanımlar
interface TaskCreateProps {
  onCreate?: (title: string, taskDesc: string) => void; // Görev oluşturma işlevi
  task?: Task; // Düzenleme durumunda mevcut görev
  taskformUpdate?: boolean; // Düzenleme modunda mı olduğunu belirtir
  onUpdate?: (id: number, title: string, taskDesc: string) => void; // Görev güncelleme işlevi
}

// TaskCreate bileşeni
const TaskCreate: React.FC<TaskCreateProps> = ({
  onCreate,
  task,
  taskformUpdate = false,
  onUpdate,
}) => {
  // Başlık ve açıklama için state tanımlar
  const [title, setTitle] = useState(task?.title || ""); // Mevcut görev varsa başlığı kullanır, aksi takdirde boş dize
  const [taskDesc, setTaskDesc] = useState(task?.taskDesc || ""); // Mevcut görev varsa açıklamayı kullanır, aksi takdirde boş dize

  // Input değişikliklerini işlemek için bir fonksiyon tanımlar
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setter(event.target.value);

  // Formun gönderilmesini işleyen fonksiyon
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // Sayfanın yenilenmesini engeller
    if (taskformUpdate && task) {
      // Düzenleme modunda ve görev varsa günceller
      onUpdate?.(task.id, title, taskDesc);
    } else {
      // Yeni görev oluşturur
      onCreate?.(title, taskDesc);
    }
    setTitle(""); // Başlığı sıfırlar
    setTaskDesc(""); // Açıklamayı sıfırlar
  };

  return (
    <div className={taskformUpdate ? "task-update" : "task-create"}>
      {/* Başlık gösterir: Düzenleme veya oluşturma moduna bağlı olarak */}
      <h3>{taskformUpdate ? "Görevi Düzenle" : "Yeni Görev Ekle"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Başlık için input alanı */}
        <label htmlFor="title">Başlık</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleChange(setTitle)}
          required
        />
        {/* Açıklama için textarea alanı */}
        <label htmlFor="taskDesc">Açıklama</label>
        <textarea
          id="taskDesc"
          value={taskDesc}
          onChange={handleChange(setTaskDesc)}
          rows={5}
          required
        />
        {/* Gönderim butonu: Düzenleme veya oluşturma moduna bağlı olarak */}
        <button type="submit">{taskformUpdate ? "Güncelle" : "Oluştur"}</button>
      </form>
    </div>
  );
};

export default TaskCreate; // Bileşeni dışa aktarır
