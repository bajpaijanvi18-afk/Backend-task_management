
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                'http://localhost:5000/api/v1/tasks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async () => {
        if (!title || !description) {
            alert('Please fill all fields');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/v1/tasks',
                {
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTitle('');
            setDescription('');

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/v1/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleTask = async (task) => {
        try {
            await axios.put(
                `http://localhost:5000/api/v1/tasks/${task.id}`,
                {
                    completed: !task.completed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#f4f7fb',
                padding: '40px',
                fontFamily: 'Arial',
            }}
        >
            <div
                style={{
                    maxWidth: '900px',
                    margin: 'auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '30px',
                    }}
                >
                    <h1 style={{ color: '#222' }}>
                        Task Dashboard
                    </h1>

                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 18px',
                            border: 'none',
                            backgroundColor: '#111827',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Logout
                    </button>
                </div>

                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '25px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        marginBottom: '30px',
                    }}
                >
                    <h2>Create New Task</h2>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '15px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <button
                        onClick={createTask}
                        style={{
                            marginTop: '15px',
                            padding: '12px 20px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Add Task
                    </button>
                </div>

                <div>
                    <h2>Your Tasks</h2>

                    {tasks.length === 0 ? (
                        <p>No tasks found.</p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                style={{
                                    backgroundColor: 'white',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    marginBottom: '20px',
                                    boxShadow:
                                        '0 2px 10px rgba(0,0,0,0.08)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <h3>{task.title}</h3>

                                        <p>{task.description}</p>

                                        <p>
                                            Status:{' '}
                                            <strong>
                                                {task.completed
                                                    ? 'Completed'
                                                    : 'Pending'}
                                            </strong>
                                        </p>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() =>
                                                toggleTask(task)
                                            }
                                            style={{
                                                marginRight: '10px',
                                                padding: '10px 14px',
                                                backgroundColor:
                                                    task.completed
                                                        ? '#f59e0b'
                                                        : '#10b981',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {task.completed
                                                ? 'Undo'
                                                : 'Complete'}
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteTask(task.id)
                                            }
                                            style={{
                                                padding: '10px 14px',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
