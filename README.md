# Motormate - The Comprehensive Platform for Motorcycle Rentals and Shared Mobility.

This project is an innovative and ambitious undergraduate project that aims to revolutionize the realm of self-ride motorcycle rentals.

flowchart TD
    %% Presentation Layer
    subgraph "Frontend Layer"
        direction TB
        BrowserC["Browser"]:::frontend
        BrowserA["Browser"]:::frontend
        BrowserC -->|HTTPS| ClientApp
        BrowserA -->|HTTPS| AdminApp

        subgraph "Client Web App"
            direction TB
            ClientApp["Client Web App\nReact + TypeScript + Redux Toolkit + TailwindCSS"]:::frontend
            AgentC["API Agent (agent.ts)"]:::frontend
            ModelsC["Models Directory"]:::frontend
            StoreC["Redux Store (ConfigureStore)"]:::frontend
            UtilsC["Cloudinary Utils"]:::frontend
            RouterC["Routing Setup"]:::frontend
            TailwindC["Tailwind Config"]:::frontend
            ChatSlice["Chat Slice (SignalR)"]:::frontend
            ClientApp --> AgentC
            ClientApp --> ModelsC
            ClientApp --> StoreC
            ClientApp --> UtilsC
            ClientApp --> RouterC
            ClientApp --> TailwindC
            ClientApp --> ChatSlice
        end

        subgraph "Admin Web App"
            direction TB
            AdminApp["Admin-Panel Web App\nReact + TypeScript + Redux Toolkit + TailwindCSS"]:::frontend
            AgentA["API Agent (agent.ts)"]:::frontend
            ModelsA["Models Directory"]:::frontend
            StoreA["Redux Store (ConfigureStore)"]:::frontend
            UtilsA["Cloudinary Utils"]:::frontend
            RouterA["Routing Setup"]:::frontend
            TailwindA["Tailwind Config"]:::frontend
            ChatCard["Chat Card Component"]:::frontend
            AdminApp --> AgentA
            AdminApp --> ModelsA
            AdminApp --> StoreA
            AdminApp --> UtilsA
            AdminApp --> RouterA
            AdminApp --> TailwindA
            AdminApp --> ChatCard
        end
    end

    %% Application Layer
    subgraph "Application Layer"
        direction TB
        API[".NET Core API\nRESTful API ( .NET 6.0 )"]:::backend
        SignalR["SignalR Hub"]:::backend
        API --> SignalR
    end

    %% Data & Storage Layer
    subgraph "Data & Storage Layer"
        direction TB
        DB["PostgreSQL\n(Entity Framework Core)"]:::backend
    end

    %% External Services
    subgraph "External Services"
        direction TB
        Cloudinary["Cloudinary"]:::external
        Stripe["Stripe"]:::external
        GoogleMaps["Google Maps API"]:::external
        GeoLocation["GeoLocation API"]:::external
    end

    %% DevOps & Infrastructure
    subgraph "DevOps & Infrastructure"
        direction TB
        GitHub["GitHub (Repo)"]:::infra
        Pipelines["Azure Pipelines\n(azure-build-deploy.yml)"]:::infra
        Terraform["Terraform Scripts"]:::infra
        HostingFront["Azure Static Web Apps / App Service"]:::infra
        HostingBack["Azure Container Registry / App Service"]:::infra
        GitHub --> Pipelines --> Terraform
        Terraform --> HostingFront
        Terraform --> HostingBack
    end

    %% Connections
    ClientApp -->|REST API calls| API
    AdminApp -->|REST API calls| API
    ClientApp -->|WebSocket| SignalR
    AdminApp -->|WebSocket| SignalR
    API -->|SQL Queries| DB
    API -->|Image upload/download| Cloudinary
    API -->|Payment intents & webhooks| Stripe
    BrowserC -->|Maps API calls| GoogleMaps
    BrowserC -->|GeoLocation API calls| GeoLocation

    %% Click Events
    click AgentC "https://github.com/thuanbui2611/motormate-fe/blob/main/client/src/app/api/agent.ts"
    click AgentA "https://github.com/thuanbui2611/motormate-fe/blob/main/admin-panel/src/app/api/agent.ts"
    click ModelsC "https://github.com/thuanbui2611/motormate-fe/tree/main/client/src/app/models/"
    click ModelsA "https://github.com/thuanbui2611/motormate-fe/tree/main/admin-panel/src/app/models/"
    click StoreC "https://github.com/thuanbui2611/motormate-fe/blob/main/client/src/app/store/ConfigureStore.tsx"
    click StoreA "https://github.com/thuanbui2611/motormate-fe/blob/main/admin-panel/src/app/store/ConfigureStore.tsx"
    click UtilsC "https://github.com/thuanbui2611/motormate-fe/blob/main/client/src/app/utils/Cloudinary.ts"
    click UtilsA "https://github.com/thuanbui2611/motormate-fe/blob/main/admin-panel/src/app/utils/Cloudinary.ts"
    click TailwindC "https://github.com/thuanbui2611/motormate-fe/blob/main/client/tailwind.config.js"
    click TailwindA "https://github.com/thuanbui2611/motormate-fe/blob/main/admin-panel/tailwind.config.js"
    click Pipelines "https://github.com/thuanbui2611/motormate-fe/blob/main/pipelines/azure-build-deploy.yml"

    %% Styles
    classDef frontend fill:#E0F7FA,stroke:#006064,color:#006064
    classDef backend fill:#E8F5E9,stroke:#1B5E20,color:#1B5E20
    classDef external fill:#FFF3E0,stroke:#E65100,color:#E65100
    classDef infra fill:#ECEFF1,stroke:#37474F,color:#37474F
    
## Overview

The Motormate web application project encompasses several primary objectives that drive its
development and shape its vision for success:
- **Develop a user-friendly interface:** The primary objective is to create a user interface that allows users to effortlessly search for, select, and book their desired motorcycle rentals based on their preferences, needs, and locations. The interface will be carefully crafted to ensure effortless navigation, intuitive search functionalities, and seamless booking processes. Through thoughtful design and responsive layouts, the Motormate web app will provide users with an engaging and enjoyable experience from the moment they land on the platform.
- **Connect users with credible rental service providers:** Establishing trust and reliability is a crucial aspect of the project. The backend system developed using C# RESTful API will act as the backbone of the application, which seamlessly connects users with reputable rental service providers. It will handle user requests, manage database interactions, and facilitate smooth communication between users and rental service providers. Furthermore, Extensive research and collaboration with trusted partners in the motorcycle rental industry will be undertaken to ensure the platform offers a curated selection of rentals that meet the highest quality standards.
- **Enhance user experience:** The Motormate web app aims to go beyond conventional rental platforms by integrating innovative features that elevate the user experience. These
features may include real-time availability and pricing information, user reviews and ratings for rental service providers, personalized recommendations based on user preferences, and real-time chat integration. By embracing emerging technologies and user-centric design principles, the project aims to create an application that truly delights its users, optimizing the user journey, minimizing friction, and ensuring a seamless rental process.
- **Foster a vibrant community:** The Motormate web app has a vision beyond being a mere rental platform - it strives to create a lively community of motorcycle enthusiasts. The project will integrate social features that enable users to connect and share their experiences, routes, and recommendations with fellow riders who share the same passion. By incorporating forums, user-generated content, and interactive elements, the Motormate web app will provide a dedicated space for riders to gather, inspire one another, and foster a sense of camaraderie.

## Related Link

- **The Application can be view at:** [MOTORMATE WEBSITE](https://motormate.vercel.app/)
- **The Admin Panel Application can be view at:** [MOTORMATE ADMIN WEBSITE](https://motormate-admin.vercel.app/)
- **API Deffinition can be view at:** [API DEFFINITION](https://motormate.azurewebsites.net/swagger/index.html)

## Application Image

### Home Page & Chat box
![chat-1](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/e0df17da-4b57-4c48-b8cc-4a94e330cd5b)
![chat-2](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/e0393269-6eb6-40d9-8282-28911b3b07ea)

### Products page
![home-pro](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/b14f26bc-5c5a-48f0-89c5-0886bb064fb8)
![product-details](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/32216ada-42b0-4033-861f-d0dc6a4c6898)


### Reviews
![Review](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/a3f103be-c3df-4059-a88f-b21e488c76ac)

### Checkout
![checkout](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/102243eb-b93c-4942-bbe4-187a70da7bd9)

### Payment
![payment](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/ac225e2a-415b-42d5-b380-f6c979af0a0b)

### Bill
![bill](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/cdb6e4a1-80d2-4d96-bf52-74d3426dca8e)

### Admin Dashboard
![admin-dashboard](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/8cc3d71d-1a64-42da-be3f-6b3198968b6b)
![admin-dashboard-2](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/5b37edec-a213-4331-ab93-e0e3045dd9c4)
![admin-dashboard-3](https://github.com/thuanbui2611/MotorMate-FE/assets/97430065/82a70237-953a-43f8-927f-9f455ec68dbf)

## Technology Stack

The technology stack for this system includes:

- Front-end: React, Typescript, Redux Toolkit - Redux Thunk, Tailwindcss, Google Maps API, GeoLocation API.
- Back-end: .Net Core 6.0, SignalR, RESTful API, Entity Framework Core, Cloudinary, Stripe, Postgres, Terraform, Azure Pipeline, Github.
