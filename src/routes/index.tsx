import { createFileRoute } from '@tanstack/react-router'
import { useJsonQuery } from '../utilities/fetch'
import Banner from '../components/Banner'
import MenuPage from '../components/MenuPage'
import { type Course } from '../components/CourseList'

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

function Index() {
  const [schedule, isLoading, error] = useJsonQuery<Schedule>(
    'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php'
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!schedule) return <div>No data found.</div>;

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
