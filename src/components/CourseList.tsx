// @ts-ignore - JavaScript utility file
import { conflictsWithSelected } from '../utilities/timeConflicts';
import { Link } from '@tanstack/react-router';
import { useProfile } from '../utilities/firebase';

export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export type Courses = Record<string, Course>;

interface CourseListProps {
    courses: Courses;
    quarterSelection: string;
    selectedIds: string[];
    onToggle: (id: string) => void;
}

const CourseList = ({courses, quarterSelection, selectedIds, onToggle}: CourseListProps) => {
    const entries = Object.entries(courses ?? {});
    const [profile] = useProfile();
    
    // Filter courses by quarter and add conflict detection
    const filteredEntries = entries
        .filter(([, course]) => course.term.toLowerCase() === quarterSelection.toLowerCase())
        .map(([id, course]) => {
            const isSelected = selectedIds.includes(id);
            const selectedCourses = selectedIds
                .map(selectedId => courses[selectedId])
                .filter(c => !!c && c !== course);
            const hasConflict = conflictsWithSelected(course, selectedCourses);
            const isUnselectable = !isSelected && hasConflict;
            
            return { id, course, isSelected, isUnselectable };
        });
    
    if (filteredEntries.length === 0) {
        return <p>No courses available for {quarterSelection} quarter.</p>;
    }

    return (
    <div className="schedule-container">
      <div className="schedule-grid">
        {filteredEntries.map(({ id, course, isSelected, isUnselectable }) => (
            <article
              data-cy="course"
              key={id}
              className={`class-card${isSelected ? ' selected' : ''}${isUnselectable ? ' conflicted' : ''}`}
              aria-label={`${course.term} CS ${course.number} ${course.title}`}
              aria-pressed={isSelected}
              role="button"
              tabIndex={0}
              onClick={() => !isUnselectable && onToggle(id)}
              onKeyDown={(e) => { 
                if ((e.key === ' ' || e.key === 'Enter') && !isUnselectable) { 
                    e.preventDefault(); 
                    onToggle(id); 
                } 
              }}
            >
              {/* Add conflict indicator */}
              {isUnselectable && (
                <div className="conflict-indicator" aria-label="Time conflict">
                  ×
                </div>
              )}
              
              <div className="card-top">
                <div>
                  <h3 className="card-title">{course.term} CS {course.number}</h3>
                  <p className="card-subtitle">{course.title}</p>
                </div>
                { profile?.isAdmin && (
                  <Link to="/edit/$courseId" params={{ courseId: id }} className="edit-btn" aria-label={`Edit ${course.title}`}>
                    Edit
                  </Link>
                )}
              </div>
              <hr className="card-divider" />
              <div className="card-time">{course.meets}</div>
              {isSelected && <div className="card-selected-indicator" aria-hidden>✓ Selected</div>}
            </article>
          ))}
      </div>
    </div>
  );
};

export default CourseList;