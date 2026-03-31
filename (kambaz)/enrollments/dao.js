export default function EnrollmentsDao(db) {
    let { enrollments } = db;
  
    const findEnrollmentsForUser = (userId) =>
      enrollments.filter((enrollment) => enrollment.user === userId);
  
    const enrollUserInCourse = (userId, courseId) => {
      const existingEnrollment = enrollments.find(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === courseId
      );
      if (existingEnrollment) return existingEnrollment;
  
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      enrollments = [...enrollments, newEnrollment];
      db.enrollments = enrollments;
      return newEnrollment;
    };
  
    const unenrollUserFromCourse = (userId, courseId) => {
      enrollments = enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
      db.enrollments = enrollments;
    };
  
    const isUserEnrolledInCourse = (userId, courseId) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === courseId
      );
  
    return {
      findEnrollmentsForUser,
      enrollUserInCourse,
      unenrollUserFromCourse,
      isUserEnrolledInCourse,
    };
  }