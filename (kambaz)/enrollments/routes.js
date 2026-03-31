import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const findMyEnrollments = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const enrollments = dao.findEnrollmentsForUser(currentUser._id);
        res.json(enrollments);
    };

    const enrollIntoCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { courseId } = req.params;
        const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
        res.json(enrollment);
    };

    const unenrollFromCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { courseId } = req.params;
        dao.unenrollUserFromCourse(currentUser._id, courseId);
        res.sendStatus(200);
    };

    app.get("/api/users/current/enrollments", findMyEnrollments);
    app.post("/api/courses/:courseId/enroll", enrollIntoCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollFromCourse);
}