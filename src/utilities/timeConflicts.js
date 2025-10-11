// Parse meeting string like "MWF 9:00-9:50" into days and time range
export function parseMeetingTime(meeting) {
    if (!meeting || meeting.trim() === '') {
        return null;
    }
    
    const daysMatch = meeting.match(/[MTWRFSU]/g);
    const timeMatch = meeting.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
    
    if (!daysMatch || !timeMatch) {
        return null;
    }
    
    const days = daysMatch;
    const [, start, end] = timeMatch;
    
    return { days, start, end };
}
  
// Check if two sets of days have any overlap
export function hasDayOverlap(days1, days2) {
    return days1.some(day => days2.includes(day));
}
  
// Convert time string "9:00" to minutes since midnight for comparison
export function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
  
// Check if two time ranges overlap
export function hasTimeOverlap(start1, end1, start2, end2) {
    const start1Minutes = timeToMinutes(start1);
    const end1Minutes = timeToMinutes(end1);
    const start2Minutes = timeToMinutes(start2);
    const end2Minutes = timeToMinutes(end2);
    return start1Minutes < end2Minutes && start2Minutes < end1Minutes;
}
  
// Main function: check if two courses have a time conflict
export function hasTimeConflict(course1, course2) {
    // Same term check
    if (course1.term.toLowerCase() !== course2.term.toLowerCase()) {
        return false;
    }
    
    const parsed1 = parseMeetingTime(course1.meets);
    const parsed2 = parseMeetingTime(course2.meets);
    
    // If either course has no meeting time, no conflict
    if (!parsed1 || !parsed2) {
        return false;
    }
    
    const { days: days1, start: start1, end: end1 } = parsed1;
    const { days: days2, start: start2, end: end2 } = parsed2;
    
    // Check day overlap and time overlap
    return hasDayOverlap(days1, days2) && hasTimeOverlap(start1, end1, start2, end2);
}
  
// Check if a course conflicts with any in a list of selected courses
export function conflictsWithSelected(course, selectedCourses) {
    return selectedCourses.some(selectedCourse => hasTimeConflict(course, selectedCourse));
}