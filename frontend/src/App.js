import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/add-employee/AddEmployee';
import AllEmployees from './components/all-employees/AllEmp';
import Header from './components/global/Header';
import SideNav from './components/global/Side-nav';
import Home from './components/home/home';
import Login from './components/login/login';
import Modal from './components/model/Modal';
import Loader from './components/Loader/Loader';


function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [showNav, setShowNav] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formerEmployees, setFormerEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [viewOnly, setViewOnly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialise, setInitialse] = useState(false);
  const [loading, setLoading] = useState(false);


  const adminDetails = {
    name: 'Nqobile Ngwenya',
    email: 'nqobie@citismart.com',
    image: './258Comfort Ngwenya congwen022.jpg'
  };
  

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(storedAuth);

    const storedEmployees = localStorage.getItem('employees');
    const storedFormerEmployees = localStorage.getItem('formerEmployees');
    if (storedEmployees) {
      console.log('Loaded employees from localStorage:', JSON.parse(storedEmployees));
      setEmployees(JSON.parse(storedEmployees));
    }
    if (storedFormerEmployees) {
      console.log('Loaded former employees from localStorage:', JSON.parse(storedFormerEmployees));
      setFormerEmployees(JSON.parse(storedFormerEmployees));
    }

    setInitialse(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
    console.log('Saving employees to localStorage:', employees);
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('formerEmployees', JSON.stringify(formerEmployees));
    },1);
  }, [isAuthenticated, employees, formerEmployees]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('employees');
    localStorage.removeItem('formerEmployees');
  }



  const addEmployee = (employee) => {
    console.log('adding: ', employee)
    setEmployees([...employees, employee]);

  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  const deleteEmployee = (employee) => {
    moveToFormerEmployees(employee);
  };


  const moveToFormerEmployees = (employee) => {
    setFormerEmployees([...formerEmployees, employee]);
    setEmployees(employees.filter(emp => emp.id !== employee.id))
  };


  const handleEmployeeClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
    setViewOnly(true);
    setIsModalOpen(true);
  };


  if(!initialise) {
    return <div>Loading...</div>
  }



  return (
    <div className="App">
      
  
    <>
      <Router>
        
      {isAuthenticated && (
        <>
          <Header
          showNav={showNav}
          setShowNav={setShowNav}
          handleLogout={handleLogout}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          deleteEmployee={deleteEmployee}
          employees={employees}
          moveToFormer={moveToFormerEmployees}
          />
          <SideNav show={showNav} adminDetails={adminDetails} />
        </>
      )}
        
      
        <div className={isAuthenticated ? 'main': ''}>
          <Routes>
            <Route path='/login' element={<Login onLogin={handleLogin}  setLoading={ setLoading}/>} />
            <Route path='/' element={isAuthenticated ? <Home employees={employees} formerEmployees={formerEmployees} onEmployeeClick={handleEmployeeClick} setLoading={ setLoading}/> : <Navigate to={"/login"}/>} />
            <Route path='/all-employees' element={isAuthenticated ? <AllEmployees title="All Employees" employees={employees} onEmployeeClick={handleEmployeeClick}/> : <Navigate to={"/login"}/>} />
            <Route path='/former-employees' element={isAuthenticated ? <AllEmployees title="Former Employees" employees={formerEmployees} onEmployeeClick={handleEmployeeClick}/> : <Navigate to={"/login"}/>} />

          </Routes>
          
        </div>
          
      </Router>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEmployee
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          isEditing={isEditing}
          onDelete={deleteEmployee}
          currentEmployee={currentEmployee}
          setIsEditing={setIsEditing}
          viewOnly={viewOnly}
          setViewOnly={setViewOnly}
          setLoading={ setLoading}
        />
      </Modal>

    </>
    {loading && (
      <Loader />
    )}
    </div>
  );
}

export default App;
