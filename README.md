<img width="1500" alt="image" src="https://github.com/user-attachments/assets/bf0f6ba0-b49b-4702-a204-0fecf79385a3" />

# 🏥 Cure AI — Medical Intelligence Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-cure--ai--bay.vercel.app-00d4ff?style=for-the-badge)](https://cure-ai-bay.vercel.app)
[![Backend API](https://img.shields.io/badge/🔧%20Backend%20API-HuggingFace%20Spaces-ff6b35?style=for-the-badge)](https://jayendraupadhyay-cure-ai-backend.hf.space)
[![GitHub](https://img.shields.io/badge/📂%20GitHub-Cure__AI-181717?style=for-the-badge&logo=github)](https://github.com/JayendraUpadhyay/Cure_AI)

**An AI-powered Medical Diagnosis Platform for Brain Tumor Detection, Diabetes Risk Assessment, and Heart Disease Prediction.**

</div>

---

## 🌐 Live Links

| Platform | URL | Status |
|----------|-----|--------|
| 🎨 **Frontend Website** | [cure-ai-bay.vercel.app](https://cure-ai-bay.vercel.app) | ![Online](https://img.shields.io/badge/status-online-brightgreen) |
| ⚙️ **Backend API** | [jayendraupadhyay-cure-ai-backend.hf.space](https://jayendraupadhyay-cure-ai-backend.hf.space) | ![Online](https://img.shields.io/badge/status-online-brightgreen) |
| 📖 **API Docs** | [/docs](https://jayendraupadhyay-cure-ai-backend.hf.space/docs) | ![Online](https://img.shields.io/badge/status-online-brightgreen) |

---

## 📸 Screenshots

### 🧠 Brain Tumor Detection
<img width="800" alt="Screenshot 2026-05-19 125904" src="https://github.com/user-attachments/assets/3439a78d-3367-4c20-9600-68352516d7f3" />


### 🩸 Diabetes Risk Assessment
<img width="800" alt="Screenshot 2026-05-19 125930" src="https://github.com/user-attachments/assets/73c55ebc-82cd-4dea-ae01-319a7a147d8a" />

### ❤️ Heart Disease Prediction
<img width="800" alt="Screenshot 2026-05-19 130011" src="https://github.com/user-attachments/assets/bafea1a4-f30b-49cd-8063-ac53ee155ebc" />


---

## ✨ Features

### 🧠 Brain Tumor Detection
- Upload MRI scan images (JPG, PNG, JPEG)
- AI-powered deep learning model (ONNX)
- Detects 4 tumor classes: **Glioma, Meningioma, Pituitary, No Tumor**
- Shows confidence score and class probabilities
- ~96% model accuracy

### 🩸 Diabetes Risk Assessment
- 8 clinical parameter inputs with medical units (mg/dL, mmHg, μU/mL)
- Machine learning based risk classification
- Shows risk probability score with reference ranges
- ~89% model accuracy

### ❤️ Heart Disease Prediction
- 13 cardiovascular indicators
- AI-based cardiac risk stratification
- Instant prediction with confidence score
- ~91% model accuracy

---

## 🎨 UI Highlights

- 🌌 **Deep space dark theme** with animated background
- ✨ **Glassmorphism cards** with backdrop blur
- 🎯 **Smooth animations** and transitions
- 📱 **Fully responsive** design
- 🏥 **Professional medical dashboard** feel
- ⚡ **Real-time AI inference**

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js 18** | UI Framework |
| **Custom CSS3** | Styling & Animations |
| **Axios** | API Communication |
| **Syne + Cabinet Grotesk** | Premium Typography |
| **Vercel** | Deployment |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API Framework |
| **ONNX Runtime** | Brain Tumor Model Inference |
| **Scikit-learn** | Diabetes & Heart Models |
| **OpenCV** | MRI Image Processing |
| **Pandas & NumPy** | Data Processing |
| **Hugging Face Spaces** | Deployment |

### AI Models
| Model | Type | Accuracy |
|-------|------|----------|
| 🧠 Brain Tumor | CNN (Deep Learning) | ~96% |
| 🩸 Diabetes | Random Forest / Logistic Regression | ~89% |
| ❤️ Heart Disease | Logistic Regression | ~91% |

---

## 📁 Project Structure

```
Cure_AI/
│
├── 🔧 backend/
│   ├── main.py                  ← FastAPI server
│   ├── requirements.txt         ← Python dependencies
│   ├── Dockerfile               ← Docker config
│   ├── brain_tumor_model.onnx   ← Deep learning model
│   ├── diabetes_model.pkl       ← ML model
│   ├── heart_model.pkl          ← ML model
│   ├── model_columns.pkl        ← Feature columns
│   ├── scaler.pkl               ← Data scaler
│   └── num_cols.pkl             ← Numerical columns
│
└── 🎨 frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.jsx              ← Main app + Navbar
        ├── index.css            ← Complete design system
        └── pages/
            ├── BrainTumor.jsx   ← MRI upload page
            ├── Diabetes.jsx     ← Diabetes assessment
            └── Heart.jsx        ← Heart disease prediction
```

---

## 🚀 Local Setup

### Step 1 — Clone Repository
```bash
git clone https://github.com/JayendraUpadhyay/Cure_AI.git
cd Cure_AI
```

### Step 2 — Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Step 3 — Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Step 4 — Open Browser
```
Frontend: http://localhost:3000
Backend:  http://localhost:8000
API Docs: http://localhost:8000/docs
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `POST` | `/predict/brain` | Brain tumor detection |
| `POST` | `/predict/diabetes` | Diabetes risk assessment |
| `POST` | `/predict/heart` | Heart disease prediction |

---

## 🔄 How It Works

```
User Input (React UI)
        ↓
   Axios HTTP Request
        ↓
  FastAPI Backend (HuggingFace)
        ↓
  ML Model Inference (ONNX/Pickle)
        ↓
   JSON Response
        ↓
  Result Display (React UI)
```

---

## ⚠️ Disclaimer

> This platform is developed for **research and educational purposes only**. It is **not a substitute** for professional medical diagnosis. Always consult a qualified healthcare professional for medical advice.

---

## 👨‍💻 Developer

**Jayendra Upadhyay**

[![GitHub](https://img.shields.io/badge/GitHub-JayendraUpadhyay-181717?style=flat&logo=github)](https://github.com/JayendraUpadhyay)

---

<div align="center">

**Made with ❤️ for Medical AI**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
