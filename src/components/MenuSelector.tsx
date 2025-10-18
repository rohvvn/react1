import { useState, useMemo } from 'react';
import CourseList, { type Courses } from './CourseList';
import ScheduleModal from './ScheduleModal';
import { conflictsWithSelected } from '../utilities/timeConflicts';

export const quarters = ['Fall', 'Winter', 'Spring'] as const;

const QuarterButton = ({quarter, selection, setSelection}: {quarter: string, selection: string, setSelection: (quarter: string) => void}) => (
  <div>
    <input type="radio" id={quarter} className="btn-check" checked={quarter === selection} autoComplete="off"
      onChange={() => setSelection(quarter)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={quarter}>
    { quarter }
    </label>
  </div>
);

export const QuarterSelector = ({selection, setSelection}: {selection: string, setSelection: (quarter: string) => void}) => (
  <div className="btn-group">
    { quarters.map(quarter => (
        <QuarterButton key={quarter} quarter={quarter} selection={selection} setSelection={setSelection} />
      )) }
  </div>
);

interface MenuSelectorProps {
  courses: Courses;
}


const MenuSelector = ({ courses }: MenuSelectorProps) => {
  const [quarterSelection, setQuarterSelection] = useState<string>('Fall');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onToggle = (id: string) => {
    const course = courses[id];
    
    if (selectedIds.includes(id)) {
      // Always allow unselecting
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    } else {
      // Check for conflicts before selecting
      const selectedCourses = selectedIds
        .map(id => courses[id])
        .filter(course => !!course);
      
      if (!conflictsWithSelected(course, selectedCourses)) {
        setSelectedIds(prev => [...prev, id]);
      }
      // If there's a conflict, do nothing (don't select)
    }
  };

  const selectedList = useMemo(() => selectedIds
    .map(id => ({ id, course: courses[id] }))
    .filter(({ course }) => !!course), [selectedIds, courses]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <div className="header-section">
        <h2 className="mb-2">Select Courses</h2>
        <div className="controls-row">
          <QuarterSelector selection={quarterSelection} setSelection={setQuarterSelection} />
          <button 
            className="course-plan-btn"
            onClick={handleOpenModal}
          >
            Course Plan
          </button>
        </div>
      </div>

      <div className="my-3">
        <h3 className="mb-1">Selected</h3>
        {selectedList.length === 0 ? (
          <p className="text-muted">Click a course to add it here.</p>
        ) : (
          <ul className="list-group">
            {selectedList.map(({ id, course }) => (
              <li key={`sel-${id}`} className="list-group-item">
                {course.term} CS {course.number} — {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <CourseList
        courses={courses}
        quarterSelection={quarterSelection}
        selectedIds={selectedIds}
        onToggle={onToggle}
      />
      
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCourses={selectedList}
      />
    </div>
  );
};

export default MenuSelector;
