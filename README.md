# Query Builder

This project is a Query Builder application built with Vite, React, TypeScript, and Express. It allows you to create and manage query rules and save them to a JSON file.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (20.12 or higher)
- npm (v10.5 or higher)

### Installation

1. npm install
2. npm run start

### E2E testing

- Download Chromium binary: `npx playwright install chromium`
- Run E2E testing: `npm run test:e2e`

### Notes

The data being edited is modelled as an array of (parent-child) groups.

To dynamically render the value field, I have defined a configuration object which each field (see file `constants.ts`). This configuration objects defines attributes for each field. (e.g its type such as string, number, currency, enum), its label, what kind of operator its allows
and its enum values if it is an enum field. 

Using these attributes, I can render with flexibility any kind of field just depending on its configuration. 
(see file `query-field-form.tsx`, method `renderValueInput` )