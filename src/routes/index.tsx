import { createFileRoute } from '@tanstack/react-router'
import { useJsonQuery } from '../utilities/fetch'
import Banner from '../components/Banner'
import MenuPage from '../components/MenuPage'
import { type Course } from '../components/CourseList'
import useDbData from '../utilities/firebase'; // Corrected import

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

function Index() {
  const [schedule, error] = useDbData<Schedule>('/');

  if (error) return <div>Error: {error.message}</div>;
  if (!schedule) return <div>Loading...</div>;

  return (
    <>
      <Banner title={schedule.title} />
      <MenuPage schedule={schedule} />
    </>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
})
