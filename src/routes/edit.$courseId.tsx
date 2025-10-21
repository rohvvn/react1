import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import CourseForm from '../components/CourseForm';
import useDbData, { useDbUpdate } from '../utilities/firebase';
import { type Course } from '../components/CourseList';

function EditCourse() {
  const { courseId } = useParams({ from: '/edit/$courseId' });
  const navigate = useNavigate({ from: '/edit/$courseId' });

  const path = `/courses/${courseId}`;

  const [course, error] = useDbData<Course>(path);
  const updateData = useDbUpdate(path);

  if (error) return <div>Error fetching course: {error.message}</div>;
  if (!course) return <div>Loading course data...</div>;

  // Make the function async
  const handleSubmit = async (newCourseData: Course) => {
    // ADD THIS LINE to confirm this function is called
    console.log('Attempting to save to Firebase with data:', newCourseData);
    try {
      // Await the database operation
      await updateData(newCourseData);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
    // This will now only run after the await is complete
    navigate({ to: '/' });
  };

  const handleCancel = () => {
    navigate({ to: '/' });
  };

  return (
    <CourseForm
      course={{ id: courseId, ...course }}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export const Route = createFileRoute('/edit/$courseId')({
  component: EditCourse,
});
