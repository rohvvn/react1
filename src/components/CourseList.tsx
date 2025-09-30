interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

type Courses = Record<string, Course>;

interface CourseListProps {
    courses: Courses;
}

const CourseList = ({courses}: CourseListProps) => {
    const entries = Object.entries(courses ?? {});
    if (entries.length === 0) {
        return <p>No courses available.</p>;
    }

    return (
    <div className="schedule-container">
      <div className="schedule-grid">
        {entries.map(([id, course]) => (
          <article key={id} className="class-card" aria-label={`${course.term} CS ${course.number} ${course.title}`}>
            <div className="card-top">
              <h3 className="card-title">{course.term} CS {course.number}</h3>
              <p className="card-subtitle">{course.title}</p>
            </div>
            <hr className="card-divider" />
            <div className="card-time">{course.meets}</div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CourseList;