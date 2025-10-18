import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useJsonQuery } from '../utilities/fetch'
import CourseForm from '../components/CourseForm'
import { type Course } from '../components/CourseList'

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

// This loader function will fetch all courses, then find the one we need
// before the component even renders.
const fetchCourse = async (courseId: string) => {
  const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Schedule = await response.json();
  const course = Object.entries(data.courses).find(([id]) => id === courseId);
  
  if (!course) {
    throw new Error('Course not found');
  }
  // Return the course data [id, courseObject]
  return { id: course[0], ...course[1] };
};

export const Route = createFileRoute('/edit/$courseId')({
  // Use the loader to fetch data
  loader: ({ params }) => fetchCourse(params.courseId),
  component: EditCourse,
})

function EditCourse() {
  // The loader data is available via useLoaderData()
  const course = Route.useLoaderData();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ to: '/' });
  };

  return <CourseForm course={course} onCancel={handleCancel} />;
}
