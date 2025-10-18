import { useState } from 'react';

// A version of the Course type for the form
interface FormCourse {
  id: string;
  title: string;
  meets: string;
  term: string;
  number: string;
}

interface CourseFormProps {
  course: FormCourse;
  onCancel: () => void;
}

const CourseForm = ({ course, onCancel }: CourseFormProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);
  const [term, setTerm] = useState(course.term);
  const [number, setNumber] = useState(course.number);

  const [errors, setErrors] = useState<{ title?: string; meets?: string; term?: string; number?: string; }>({});

  const validate = () => {
    const newErrors: { title?: string; meets?: string; term?: string; number?: string } = {};

    if (title.length < 2) {
      newErrors.title = 'must be at least 2 characters';
    }

    const validTerms = ['Fall', 'Winter', 'Spring', 'Summer'];
    if (!validTerms.includes(term)) {
        newErrors.term = 'must be Fall, Winter, Spring, or Summer';
    }

    const numberPattern = /^\d{3}(-\d{1,2})?$/;
    if (!numberPattern.test(number)) {
        newErrors.number = 'must be a number like 101 or 101-1';
    }

    // Allows empty string or a valid meeting time format
    const meetsPattern = /^(?:M|Tu|W|Th|F|Sa|Su)+\s\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
    if (meets && !meetsPattern.test(meets)) {
      newErrors.meets = 'must contain days and start-end, e.g., MWF 12:00-13:20';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      // This is where you would handle form submission,
      // for example, by calling an update function passed via props.
      console.log('Form data is valid:', { title, term, number, meets });
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Course: {course.term} CS {course.number}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="term">Term</label>
          <input
            type="text"
            id="term"
            name="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={`form-control ${errors.term ? 'is-invalid' : ''}`}
          />
          {errors.term && <div className="invalid-feedback">{errors.term}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="number">Course Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`form-control ${errors.number ? 'is-invalid' : ''}`}
          />
          {errors.number && <div className="invalid-feedback">{errors.number}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="meets">Meeting Times</label>
          <input
            type="text"
            id="meets"
            name="meets"
            value={meets}
            onChange={(e) => setMeets(e.target.value)}
            className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
          />
          {errors.meets && <div className="invalid-feedback">{errors.meets}</div>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;

