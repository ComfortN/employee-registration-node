const express = require('express');
const cors = require('cors');
const employeeController = require('./controllers/employeeController');

const app = express();

app.use(cors());
app.use(express.json());

// Employee routes
const router = express.Router();


router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);


app.use('/api/employees', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;