# HealthPoint Kenya 🏥
*AI-Powered Healthcare Facility Finder for Kenya*

---

## 📑 Table of Contents
- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution: HealthPoint Kenya](#-solution-healthpoint-kenya)
- [🌟 Key Features](#-key-features)
- [🏗️ Technical Architecture, Project Structure & Deployment](#️-technical-architecture-project-structure--deployment)
- [🌍 Impact & Use Cases](#-impact--use-cases)
- [🔮 Future Enhancements](#-future-enhancements)
- [👥 Team](#-team)

---

## 🎯 Problem Statement
In Kenya, millions of people struggle to find appropriate healthcare facilities for their medical needs. Many patients:
- Don’t know which type of facility to visit  
- Waste time and money visiting inappropriate healthcare providers  
- Face delays in getting proper medical attention  
- Lack guidance on navigating the healthcare system  

---

## 💡 Solution: HealthPoint Kenya
HealthPoint Kenya is an **AI-powered assistant** that helps Kenyans find the right healthcare facilities based on their specific needs.  

Using natural language processing, it understands user queries and provides intelligent recommendations for hospitals, clinics, mental health services, community programs, and pharmacies.

---

## 🌟 Key Features
- **🤖 Intelligent AI Assistant**  
  - Communicate in English/Swahili  
  - Maintains conversation history for better recommendations  
  - Instant streaming responses  
  - Supportive, empathetic guidance  

- **🏥 Comprehensive Healthcare Coverage**  
  - Hospitals (emergency care, surgery, maternity)  
  - Clinics (check-ups, family planning, immunizations)  
  - Mental Health facilities (counseling, psychiatric care)  
  - Community programs (health education, preventive care)  
  - Pharmacies (medication, consultation, supplies)  

- **🎯 Smart Recommendations**  
  - Analyzes symptoms and needs  
  - Suggests the most appropriate facility type  
  - Explains reasoning behind each recommendation  
  - Provides non-diagnostic guidance  

---

## 🏗️ Technical Architecture, Project Structure & Deployment

### Technical Architecture
- **Frontend**
  - Next.js 15.3.3 + TypeScript  
  - React 18.3.1 (UI components)  
  - Tailwind CSS (styling)  
  - Radix UI (component library)  
  - Zod (schema validation)  
  - React Hook Form (form management)  

- **AI & Backend**
  - Google Genkit 1.14.1  
  - Google AI integration with flow-based architecture  
  - Streaming responses for real-time communication  
  - Debug logging and metrics  

- **Infrastructure**
  - Firebase Hosting (static site)  
  - Firestore (future facility database)  
  - Firebase Authentication (planned feature)  

### Project Structure
```text
src/
├── ai/
│   ├── genkit.ts             # AI configuration
│   └── flows/
│       └── assistant-flow.ts # Main health assistant flow
├── components/               # React components
├── pages/                    # Next.js pages
├── styles/                   # CSS styles
└── types/                    # TypeScript definitions

```
### 🚀 Deployment

The project is deployed using **Vercel** for fast, reliable, and scalable hosting.  

🔗 **Live Demo**: [HealthPoint Kenya](https://sdgs-project-hackathon-git-main-mwendeeees-projects.vercel.app/)  

#### 🌐 Deployment Workflow
- Every push to the **main** branch triggers an automatic deployment to production.  
- Feature branches and pull requests generate **preview deployments** for testing.  
- Each deployment is assigned its own `.vercel.app` domain.  

#### ⚡ Manual Deployment (with Vercel CLI)
You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy the project (interactive setup)
vercel

# Deploy directly to production
vercel --prod
