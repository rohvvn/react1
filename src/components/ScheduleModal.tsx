import { type Course } from './CourseList';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: Array<{ id: string; course: Course }>;
}

const ScheduleModal = ({ isOpen, onClose, selectedCourses }: ScheduleModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Course Plan</h2>
          <button 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close course plan"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {selectedCourses.length === 0 ? (
            <div className="empty-state">
              <p className="empty-message">No courses selected yet.</p>
              <p className="empty-instructions">
                To select courses, click on any course card below to add it to your schedule.
              </p>
            </div>
          ) : (
            <div className="course-list">
              <h3 className="course-list-title">Selected Courses</h3>
              <ul className="selected-courses">
                {selectedCourses.map(({ id, course }) => (
                  <li key={`modal-${id}`} className="selected-course-item">
                    <div className="course-info">
                      <div className="course-number">CS {course.number}</div>
                      <div className="course-title">{course.title}</div>
                      <div className="course-time">{course.meets}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
