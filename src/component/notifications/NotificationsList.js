import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

function NotificationsList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      <table className="notifications-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>Type</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.id}</td>
              <td>{notification.message}</td>
              <td>{notification.type}</td>
              <td>{formatDateTime(notification.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NotificationsList;
