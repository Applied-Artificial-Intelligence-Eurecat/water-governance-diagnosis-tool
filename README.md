# water-governance-diagnosis-tool

<p align="center">
  <img src=".img/innwater-logo.png" alt="InnWater Logo" width="220"/>
</p>

<p align="center">
  <strong>Online Water Governance Assessment Tool within the InnWater project</strong>
</p>

<p align="center">
  <a href="https://innwater.eurecatprojects.com/innwater/" target="_blank">
    <img src="https://img.shields.io/badge/Access%20Application-Live%20Demo-blue?style=for-the-badge&logo=appveyor" alt="Access Diagnosis Tool"/>
  </a>
</p>

---

## Overview

The **InnWater Water Governance Diagnosis Tool** is an interactive platform designed to assess the effectiveness and
resilience of water governance systems. Grounded in the **OECD Principles on Water Governance**, the tool provides a
comprehensive framework for identifying governance gaps and strengths across five key dimensions:

- **Mega-trends and resilience**: Evaluating the capacity to adapt to long-term challenges.
- **Policy, institutions, and regulation**: Assessing the clarity and effectiveness of legal and regulatory frameworks.
- **Financing**: Reviewing the adequacy and sustainability of financial resources.
- **Data, monitoring, and evaluation**: Ensuring transparent and evidence-based decision-making.
- **Engagement and accountability**: Promoting stakeholder participation and integrity.

<p align="center">
  <img src=".img/screenshots/innwater-cover-page.png" alt="Cover Page" style="max-width:50%; height:auto;"/>
</p>

Users can easily retrieve previously saved questionnaires to continue their assessment or track progress over time.
<p align="center">
  <img src=".img/screenshots/innwater-retrieve-questionnaire.png" alt="Retrieve Questionnaire" style="max-width:50%; height:auto;"/>
</p>

The tool generates a visual representation (radar chart) of governance performance across multiple principles,
highlighting critical gaps.
<p align="center">
  <img src=".img/screenshots/innwater-results-and-assessment.png" alt="Results and Assessment" style="max-width:50%; height:auto;"/>
</p>

An intelligent assistant provides contextual advice and suggestions on how to address identified governance weaknesses.
<p align="center">
  <img src=".img/screenshots/innwater-ai-chat.png" alt="AI Chat" style="max-width:50%; height:auto;"/>
</p>

The tool features an integrated **AI Assistant** that provides tailored recommendations based on assessment results,
helping users navigate complex regulatory environments and improve governance outcomes through data-driven insights.

---

## Background

The InnWater project develops tools to support:

- **multi-level, cross-sector governance of water systems**
- **economic and financial modelling**, including tariff simulations
- **stakeholder engagement and governance assessment frameworks**

Visit the **[InnWater Governance Platform](https://le.innwater.eu/)** to explore other project tools and the learning
environment.

The Water Governance Diagnosis Tool serves as a diagnostic layer to evaluate institutional performance, facilitating
transparent analysis and strategic decision support.

---

## Technologies

The interface is implemented using the following technologies:

- **Angular 18** – Core framework for the frontend application.
- **Bootstrap 5** – Responsive design and UI components.
- **Chart.js & ng2-charts** – Interactive radar charts for governance assessment visualization.
- **Transloco** – Internationalization (i18n) support for multiple languages.
- **Python & Streamlit** – Backend for results processing and AI Assistant interface.
- **Docker** – Containerization for reproducible deployment.

---

## Usage

### Local Execution

To run the project locally, you need to set up both the frontend and the results assistant.

#### 1. Frontend Core

```bash
cd frontend-core
npm install
npm start
```

#### 2. WG Results (AI Assistant)

```bash
cd wg-results
pip install -r requirements.txt
streamlit run main.py
```

### Using Docker

You can run the results assistant using Docker:

```bash
cd wg-results
docker-compose up --build
```

---

## Contact

- **Software Development and AI Assistant**: Oriol Alàs - oriol.alas@eurecat.org
- **[PLACEHOLDER]**

---

<p align="center">
  <img src=".img/footer.png" alt="EU and UKRI Funding Logo" width="600"/>
</p>

<p align="center">
  This project has received funding from the European Union's Horizon Europe programme (Grant Agreement No. 101086512) and from UK Research and Innovation (UKRI) under the UK government's Horizon Europe funding guarantee (Grant No. 10066637).
</p>
