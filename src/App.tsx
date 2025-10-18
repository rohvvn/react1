import { useJsonQuery } from './utilities/fetch';
import Banner from "./components/Banner";
import MenuPage from "./components/MenuPage";

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  
  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!json) return <h1>No course data found</h1>;
  
  
  const schedule = json as Schedule;
  
  return (
    <div>
      <Banner title={schedule.title} />
      <MenuPage />
    </div>
  );
};

export default App;