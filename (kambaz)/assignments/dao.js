export default function AssignmentsDao(db) {
    let { assignments } = db;

    const findAssignmentsForCourse = (courseId) =>
        assignments.filter((assignment) => assignment.course === courseId);

    const findAssignmentById = (assignmentId) =>
        assignments.find((assignment) => assignment._id === assignmentId);

    const createAssignment = (assignment) => {
        const newAssignment = {
            ...assignment,
            _id: new Date().getTime().toString(),
        };
        assignments = [...assignments, newAssignment];
        db.assignments = assignments;
        return newAssignment;
    };

    const updateAssignment = (assignmentId, assignmentUpdates) => {
        assignments = assignments.map((assignment) =>
            assignment._id === assignmentId
                ? { ...assignment, ...assignmentUpdates, _id: assignmentId }
                : assignment
        );
        db.assignments = assignments;
        return findAssignmentById(assignmentId);
    };

    const deleteAssignment = (assignmentId) => {
        assignments = assignments.filter(
            (assignment) => assignment._id !== assignmentId
        );
        db.assignments = assignments;
    };

    return {
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignment,
        updateAssignment,
        deleteAssignment,
    };
}