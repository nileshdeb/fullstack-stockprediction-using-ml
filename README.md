# Full-Stack Stock Prediction App (ML Powered)

A full-stack stock price prediction web application built using React (Vite) for the frontend, Django REST Framework for the backend, and an LSTM-based machine learning model for stock price prediction.

This project demonstrates end-to-end ML deployment, JWT-based authentication, password reset support, and real-world API integration.

---

## Features

- JWT-based authentication for register and login flows
- Password reset request and reset confirmation flow
- Password visibility toggles across auth forms
- Stock price visualization with:
  - Closing price
  - 100-day Moving Average
  - 200-day Moving Average
  - Final prediction plot
- LSTM-based stock price prediction model
- Model evaluation metrics:
  - Mean Squared Error (MSE)
  - Root Mean Squared Error (RMSE)
  - R2 Score
- Dynamic plot rendering using Matplotlib
- REST API with Django REST Framework
- Modern frontend using React + Vite

---

## Tech Stack

### Frontend

- React (Vite)
- Axios
- Bootstrap
- FontAwesome
- lucide-react
- JWT Authentication

### Backend

- Django
- Django REST Framework
- SimpleJWT
- SQLite (development)
- yFinance
- Django console email backend for development

### Machine Learning

- Python
- NumPy, Pandas
- Scikit-learn
- TensorFlow / Keras (LSTM)
- Matplotlib

---

## Project Structure

```text
WEBDEV_PROJECT/
│
├── backend-drf/
│   ├── accounts/                  # Authentication and password reset APIs
│   ├── api/                       # Stock prediction API
│   ├── stock_prediction_main/     # Django project settings
│   ├── media/                     # Generated plot images
│   ├── env/                       # Virtual environment
│   ├── stock_prediction_model.keras # Pre-trained LSTM model
│   ├── requirements.txt
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend-react/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── ResetPasswordConfirm.jsx
│   │   │   └── dashboard/
│   │   │       └── Dashboard.jsx
│   │   ├── axiosinstance.js
│   │   ├── AuthProvider.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── Resources/
├── runtime.txt
├── render.yaml
└── README.md
```

---

## ⚠️ Deployment Note

This project includes a backend integrated with Machine Learning components (e.g., TensorFlow), which makes it resource-intensive.

Due to these heavy dependencies, deployment on free-tier platforms like Render was not successful, as the available memory and system resources were insufficient.

To run this project successfully, it is recommended to use a higher-resource environment (paid cloud tier or local machine with adequate RAM).

---

## Authentication Flow

1. User registers via `/api/v1/register/`
2. User logs in via `/api/v1/token/`
3. Access token is stored in `localStorage`
4. Axios interceptor attaches the token automatically
5. Protected APIs are accessed securely
6. If needed, the user can request a password reset link from `/api/v1/accounts/password-reset/`
7. The user completes reset confirmation from `/api/v1/accounts/password-reset-confirm/`

### Password Reset Notes

- Reset links point to the frontend route:
  `http://localhost:5173/reset-password-confirm/:uid/:token`
- In development, password reset emails are printed in the Django console
- The frontend provides separate reset request and reset confirmation screens

---

## Prediction Flow

1. User enters a stock ticker such as `AAPL` or `GOOG`
2. Backend fetches historical stock data using yFinance
3. LSTM model predicts future prices
4. Plots are generated and saved
5. URLs are returned to the frontend
6. Frontend displays plots and evaluation metrics

---

## How to Run Locally

### Backend Setup

```bash
cd backend-drf
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend-react
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/v1/register/` | User registration |
| POST | `/api/v1/token/` | JWT token |
| POST | `/api/v1/token/refresh/` | Refresh token |
| GET | `/api/v1/protected-view/` | Auth test |
| POST | `/api/v1/accounts/password-reset/` | Request password reset |
| POST | `/api/v1/accounts/password-reset-confirm/` | Confirm password reset |
| POST | `/api/v1/predict/` | Stock prediction |

---

## Example Input

```json
{
  "ticker": "GOOG"
}
```

---

## Use Cases

- Demonstrates ML model deployment in a full-stack app
- Shows secure frontend-backend integration
- Useful for:
  - On-campus placements
  - Full-stack roles
  - ML Engineer and Data Scientist portfolios




---

## Author

**Nilesh Deb**  
B.Tech - Artificial Intelligence & Data Science  
GitHub: [https://github.com/nileshdeb](https://github.com/nileshdeb)  
LinkedIn: [https://www.linkedin.com/in/nilesh-deb-b90094260/](https://www.linkedin.com/in/nilesh-deb-b90094260/)

---

If you like this project, consider starring the repository.
