# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

edatos-srm-visualizer is the ISTAC structural resources visualization portal.

**Main branch for PRs**: `develop`

## Build Commands

### Full build (Java + frontend)

```bash
mvn clean install -Pdev
```

### Build skipping tests

```bash
mvn clean install -Dmaven.test.skip=true
```

### Dev server for frontend

```bash
# From edatos-srm-visualizer-js/webapp/
npm start
```

* More info in README.md

## Architecture

### Module Structure

```
edatos-srm-visualizer-core/         → Services, models, repositories
edatos-srm-visualizer-js/           → Frontend Angular/Primeng/Bootstrap
edatos-srm-visualizer-rest/         → Internal API interface for accessing the methods and services of the core module
edatos-srm-visualizer-web/          → WAR that serves the frontend + exposes REST via CXF
```

### Frontend Stack

- **Angular** — models, services, routing and views
- **Angular Material** — views (tables and tree structures)
- **PrimeNG** — views
- **Bootstrap** — CSS
- **i18n**: 3 languages (es, ca, en) in `src/assets/i18n/`


## Conventions

- The `develop` branch is the main integration branch; `master` is for releases

### Code Naming

- **All code in English**: classes, methods, variables, constants, comments
- **CamelCase** for variables and methods


