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
    
    // 
    const filteredEntries = entries.filter(([, course]) => 
        course.term.toLowerCase() === quarterSelection.toLowerCase()
    );
    
    if (filteredEntries.length === 0) {
        return <p>No courses available for {quarterSelection} quarter.</p>;
    }

    return (
    <div className="schedule-container">
      <div className="schedule-grid">
        {filteredEntries.map(([id, course]) => {
          const isSelected = selectedIds.includes(id);
          return (
            <article
              key={id}
              className={`class-card${isSelected ? ' selected' : ''}`}
              aria-label={`${course.term} CS ${course.number} ${course.title}`}
              aria-pressed={isSelected}
              role="button"
              tabIndex={0}
              onClick={() => onToggle(id)}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle(id); } }}
            >
              <div className="card-top">
                <h3 className="card-title">{course.term} CS {course.number}</h3>
                <p className="card-subtitle">{course.title}</p>
              </div>
              <hr className="card-divider" />
              <div className="card-time">{course.meets}</div>
              {isSelected && <div className="card-selected-indicator" aria-hidden>✓ Selected</div>}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;