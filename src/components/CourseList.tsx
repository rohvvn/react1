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
    <table>
      <thead>
        <tr>
          <th>Term</th>
          <th>Number</th>
          <th>Meets</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([id, course]) => (
          <tr key={id}>
            <td>{course.term}</td>
            <td>{course.number}</td>
            <td>{course.meets}</td>
            <td>{course.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseList;