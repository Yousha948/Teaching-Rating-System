import pool from '../Config/db.js';

// Create a new rating
export const createRating = async (req, res) => {
    const { studentId, teacherId, courseId, clarityRating, engagementRating, contentRating, feedbackRating, comments } = req.body;

    try {
        const [result] = await pool.execute(`
            INSERT INTO Ratings (StudentID, TeacherID, CourseID, ClarityRating, EngagementRating, ContentRating, FeedbackRating, Comments)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [studentId, teacherId, courseId, clarityRating, engagementRating, contentRating, feedbackRating, comments]);

        res.status(201).json({ message: 'Rating created successfully', ratingId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create rating', details: error.message });
    }
};

// Get all ratings
export const getAllRatings = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                r.RatingID,
                r.StudentID,
                s.FirstName AS StudentFirstName,
                s.LastName AS StudentLastName,
                r.TeacherID,
                t.FirstName AS TeacherFirstName,
                t.LastName AS TeacherLastName,
                r.CourseID,
                c.CourseName,
                r.ClarityRating,
                r.EngagementRating,
                r.ContentRating,
                r.FeedbackRating,
                r.Comments,
                r.RatingDate
            FROM Ratings r
            JOIN Students st ON r.StudentID = st.StudentID
            JOIN Users s ON st.UserID = s.UserID
            JOIN Teachers te ON r.TeacherID = te.TeacherID
            JOIN Users t ON te.UserID = t.UserID
            JOIN Courses c ON r.CourseID = c.CourseID
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve ratings', details: error.message });
    }
};

// Get a specific rating by ID
export const getRatingById = async (req, res) => {
    const { ratingId } = req.params;

    try {
        const [rows] = await pool.execute(`
            SELECT 
                r.RatingID,
                r.StudentID,
                s.FirstName AS StudentFirstName,
                s.LastName AS StudentLastName,
                r.TeacherID,
                t.FirstName AS TeacherFirstName,
                t.LastName AS TeacherLastName,
                r.CourseID,
                c.CourseName,
                r.ClarityRating,
                r.EngagementRating,
                r.ContentRating,
                r.FeedbackRating,
                r.Comments,
                r.RatingDate
            FROM Ratings r
            JOIN Students st ON r.StudentID = st.StudentID
            JOIN Users s ON st.UserID = s.UserID
            JOIN Teachers te ON r.TeacherID = te.TeacherID
            JOIN Users t ON te.UserID = t.UserID
            JOIN Courses c ON r.CourseID = c.CourseID
            WHERE r.RatingID = ?
        `, [ratingId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve rating', details: error.message });
    }
};

// Update a rating
export const updateRating = async (req, res) => {
    const { ratingId } = req.params;
    const { clarityRating, engagementRating, contentRating, feedbackRating, comments } = req.body;

    try {
        const [result] = await pool.execute(`
            UPDATE Ratings
            SET ClarityRating = ?, EngagementRating = ?, ContentRating = ?, FeedbackRating = ?, Comments = ?
            WHERE RatingID = ?
        `, [clarityRating, engagementRating, contentRating, feedbackRating, comments, ratingId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        res.json({ message: 'Rating updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update rating', details: error.message });
    }
};

// Delete a rating
export const deleteRating = async (req, res) => {
    const { ratingId } = req.params;

    try {
        const [result] = await pool.execute(`
            DELETE FROM Ratings WHERE RatingID = ?
        `, [ratingId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete rating', details: error.message });
    }
};
