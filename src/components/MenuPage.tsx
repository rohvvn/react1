import { useState } from "react";
import { QuarterSelector, quarters } from "./MenuSelector";
import CourseList, { type Course } from "./CourseList";
import { conflictsWithSelected } from "../utilities/timeConflicts";

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

interface MenuPageProps {
  schedule: Schedule;
}

const MenuPage = ({ schedule }: MenuPageProps) => {
  const [selection, setSelection] = useState(() => Object.keys(quarters)[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onToggle = (id: string) => {
    const course = schedule.courses[id];
    
    if (selectedIds.includes(id)) {
      // Always allow unselecting
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    } else {
      // Check for conflicts before selecting
      const selectedCourses = selectedIds
        .map(id => schedule.courses[id])
        .filter(course => !!course);
      
      if (!conflictsWithSelected(course, selectedCourses)) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  return (
    <div>
      <QuarterSelector selection={selection} setSelection={setSelection} />
      <CourseList
        courses={schedule.courses}
        quarterSelection={selection}
        selectedIds={selectedIds}
        onToggle={onToggle}
      />
    </div>
  );
};

export default MenuPage;