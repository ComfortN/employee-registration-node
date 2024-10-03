const admin = require('../firebase/firebase');
const db = admin.firestore();

exports.getAllEmployees = async (req, res) => {
    try {
        const snapshot = await db.collection('employees').get();
        const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, phone, position, id } = req.body;
        await db.collection('employees').doc(id).set({
        name, email, phone, position, id
        });
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

