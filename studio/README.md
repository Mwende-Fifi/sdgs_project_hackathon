# HealthPoint Kenya – Builder Question Prompts 🏥

This document contains a structured set of **questions/prompts** that guide the entire build of **HealthPoint Kenya** — from ideation, database setup, integrations, UI/UX, payments, to deployment.  


---

## 📑 Table of Contents
- [0) Inception & Scope](#0-inception--scope)
- [1) Choose the Health Concept](#1-choose-the-health-concept)
- [2) Data Strategy](#2-data-strategy-real-time-not-samples)
- [3) Database & Integrations](#3-database--integrations-supabase--firebase-where-needed)
- [4) Data Completeness for Kenyan Counties](#4-data-completeness-for-kenyan-counties)
- [5) Payments (InstaSend)](#5-payments-instasend)
- [6) UI/UX & Styling](#6-uiux--styling)
- [7) Search & Filtering](#7-search--filtering)
- [8) QA & Error Handling](#8-qa--error-handling)
- [9) Deployment (Vercel)](#9-deployment-vercel)
- [10) Enhancements & Handover](#10-enhancements--handover)

---

## 0) Inception & Scope
1. I want to build a low-code website that solves a real-world problem aligned with SDG 3 (Health). Can you propose 5 fresh concepts different from common examples, and rank them by impact vs. effort for a hackathon prototype?  
2. From those, which idea best fits a 1–2 week build, and why? Provide a concise problem statement and success criteria.  
3. Given low-code constraints, which stack should I use (Next.js + Firebase + Genkit vs. pure Firebase Hosting + Functions vs. Supabase + Next.js)? Compare and recommend one.  

---

## 1) Choose the Health Concept
4. Let’s focus on **Local Health Resource Finder** for Kenya. List core user stories (patients, caregivers, health workers, visitors) and define MVP scope vs. nice-to-have features.  
5. Design the information architecture: What entities do we need (health facility, category, county, contact info, services, geo-location, hours, payment options)? Provide a minimal schema.  

---

## 2) Data Strategy (Real-time, not samples)
6. Should we use **real-time data** for health centres or curated/seeded data to start? Outline pros/cons and an MVP path to real-time.  
7. Propose a plan to seed **Kenya health centres** across categories (Hospitals, Clinics, Mental Health, Health Programs, Pharmacies) and counties (Nairobi, Mombasa, Kisumu, Nakuru, Uasin Gishu, Kiambu, Machakos, Kajiado). Provide CSV/SQL templates for ingestion.  
8. How do we ensure data freshness? Suggest a workflow for periodic updates and community submissions with moderation.  

---

## 3) Database & Integrations (Supabase + Firebase where needed)
9. Add **Supabase** for our database. Generate SQL to create `public.health_resources` with all necessary columns and indexes.  
10. Create two migration scripts:  
   - `001_create_health_resources_table.sql`  
   - `002_insert_kenya_health_resources.sql`  
11. @connected-integration(Supabase) — Check the Supabase integration status. Are environment variables set? Is the connection healthy? If not, list steps to fix.  
12. I’m getting this error: *“Could not find the table `public.health_resources` in the schema cache.”* Diagnose and provide fix commands.  
13. Switch the app’s data layer to **use real Supabase data** (no samples). Provide the query to fetch by `{category}` and `{county}`.  

---

## 4) Data Completeness for Kenyan Counties
14. When I enter `{category: clinic, county: Nairobi}`, no resources are found. Debug and provide fixes.  
15. Audit coverage for these counties: **Mombasa, Kisumu, Nakuru, Uasin Gishu, Kiambu, Machakos, Kajiado**. Output a table of counts by category and generate inserts for gaps.  
16. Ensure at least one facility exists per category per listed county. Provide missing insert statements with placeholders.  

---

## 5) Payments (InstaSend)
17. Integrate **InstaSend** for payments. What environment variables do I need? Provide a `.env.local` and Vercel setup checklist.  
18. Replace the top **Demo Mode** button with a **“Go Premium”** CTA. Wire it to InstaSend checkout for local + international payments. Provide API route + client hook.  
19. Ensure the payment experience is **not an embedded message** popup. Provide success/cancel callbacks.  
20. Add a **Premium flag** to the user profile and gate advanced features behind it. Provide schema + minimal UI state.  

---

## 6) UI/UX & Styling
21. Propose a modern color scheme and font pairing for healthcare in Kenya. Provide Tailwind tokens and card styles.  
22. Create responsive facility cards. On **“Click to view details”**, ensure **all details are visible**. Provide component code.  
23. Fix **card misalignment** when opened in a new tab. Diagnose and provide corrected Tailwind classes.  
24. Add a map view toggle and “Get Directions” deep link (Google Maps/Apple Maps). Provide utility function.  
25. Add English↔Swahili i18n. Provide a minimal translation JSON and usage example.  

---

## 7) Search & Filtering
26. Implement filters for `{county}`, `{category}`, and free/paid toggle. Provide Supabase query and debounce logic.  
27. Add pagination or infinite scroll with loading state. Provide API and UI pattern.  

---

## 8) QA & Error Handling
28. Design empty states for “no results” with helpful actions. Provide copy and component.  
29. Add runtime validation (Zod) for facility responses. Guard against missing fields and show fallback UI.  
30. Log and surface DB/API errors clearly in the UI without leaking secrets. Provide a logger hook.  

---

## 9) Deployment (Vercel)
31. Set up deployment to **Vercel**. What build settings and env vars do I need? Provide PROD/Preview checklist.  
32. Add a **health check** endpoint + status page (DB connected, payments configured, data counts by category). Provide API route.  
33. After deploy, confirm the live site works: <https://sdgs-project-hackathon-git-main-mwendeeees-projects.vercel.app/>. What post-deploy smoke tests should I run?  

---

## 10) Enhancements & Handover
34. Add an admin-only **Suggest/Edit Facility** flow with moderation. Provide schema + UI.  
35. Propose analytics events (search, filter, view details, call, directions, payment). Provide schema and triggers.  
36. Create a short onboarding checklist for new contributors (env setup, DB migrations, seeding, payments, deployment).  

---

