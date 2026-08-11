# Next.js

## Overview

Next.js is a React framework for building web applications. React focuses primarily on building user interfaces. Next.js provides a broader application framework around React: structure, conventions, and capabilities that help turn UI building blocks into a complete web product.

This lesson introduces *what Next.js is* and how it relates to React. It does not argue why you should choose it, and it does not teach how to implement features yet.

## React and Next.js

Think of the relationship like this:

**React**

- a UI library;
- reusable UI building blocks;
- a component model for composing interfaces.

**Next.js**

- a framework built around React;
- application structure and conventions;
- routing capabilities;
- rendering capabilities;
- server-side capabilities;
- optimization and production tooling.

Next.js does **not** replace React. It builds on top of React. You still think in terms of UI pieces and composition; Next.js adds the surrounding application layer those pieces live in.

## Library vs Framework

At a high level:

- A **library** usually gives you tools that you choose how and where to integrate. You decide much of the application structure yourself.
- A **framework** generally provides more structure, conventions, and application-level capabilities. You work within patterns the framework already defines.

The boundary is not always sharp, and wording should stay careful. Still, Next.js clearly provides conventions and built-in application structure beyond the UI layer—routing, rendering infrastructure, server involvement, and production-oriented behavior—so it is commonly described as a framework around React.

## What Next.js Provides

Conceptually, Next.js provides application-level capabilities such as:

- routing;
- rendering;
- server-side functionality;
- application structure;
- asset optimization;
- metadata support;
- production-oriented tooling.

These are framework concerns. This lesson only names them. Later topics will teach how they work in practice.

## Routing as a Framework Capability

Next.js includes built-in routing capabilities. That means navigation between parts of an application is a concern the framework addresses, rather than something you must assemble entirely from scratch.

This lesson does not explain router variants, file naming, folders, or route patterns. The only point for now: routing is part of the framework.

## Rendering as a Framework Capability

Next.js can support different rendering approaches. In other words, it provides infrastructure for producing application content in different environments and at different times—not only “everything happens in the browser after load.”

This lesson does not explain specific rendering strategies or when to use each one. The only point for now: rendering is a built-in framework concern.

## Server-Side Capabilities

Next.js applications can execute logic on the server as well as in the browser. That expands the framework beyond a purely client-side UI toolkit: some work can happen before or outside the browser environment.

This introductory lesson does not cover specific server APIs, component types, or runtimes. The idea is simply that client and server responsibilities can both exist in a Next.js application.

## Application Structure

Frameworks often define expected places and patterns for application concerns. Next.js provides conventions for organizing a web application so developers share a common mental map of where things belong.

You do not need folder diagrams or directory names yet. What matters conceptually is that structure is part of what the framework offers—not only individual UI functions.

## Production-Oriented Features

Next.js includes capabilities intended to support production web applications. At a high level, that includes ideas such as:

- optimizations;
- build tooling;
- asset handling;
- metadata;
- deployment-oriented behavior.

These features exist so applications can move from local experimentation toward real delivery. Their implementations are later topics.

## Full-Stack Capabilities

Next.js can support both frontend and server-side application concerns. That is why people sometimes describe it as helping with more than the UI layer alone.

This does **not** mean every Next.js application must implement all backend logic inside Next.js. Teams still choose how much server-side work belongs in the framework versus elsewhere. The conceptual point is capability and flexibility, not a requirement to put everything in one place.

## Convention Over Configuration

Frameworks often provide conventions so developers do not need to manually assemble every part of the application. Shared defaults and expected patterns reduce setup work and help teams stay consistent.

Next.js follows this general framework philosophy: many application concerns have a conventional place and approach. This lesson does not introduce configuration files; it only establishes the idea.

## What React Still Does

React remains responsible for the UI model. Conceptually, that still includes:

- reusable UI;
- composition of smaller pieces into larger interfaces;
- declarative interfaces driven by application data.

Next.js wraps application concerns around that model. It does not remove the need to understand how UI is structured.

## What Next.js Adds Around React

A simple way to picture the layers:

```text
React
↓
UI layer

Next.js
↓
Application framework around that UI layer
```

React answers questions like “how do we represent and compose the interface?”  
Next.js answers questions like “how is this organized as a web application, routed, rendered, and prepared for production?”

## What Next.js Is Not

Next.js is not:

- a replacement for JavaScript;
- a replacement for React;
- only a routing library;
- only a backend framework;
- only an SSR tool.

It is a React framework with broader application capabilities. Keeping that scope clear prevents confusing Next.js with any single feature it happens to include.

## Key Takeaways

1. Next.js is a React framework for building web applications.
2. Next.js is built around React; it does not replace React.
3. React is primarily a UI library; Next.js is an application framework around that UI layer.
4. Next.js provides application-level capabilities such as structure, routing, rendering, and production tooling.
5. Routing and rendering are built-in framework concerns (details come later).
6. Next.js applications can involve both client and server responsibilities.
7. Implementation details—project setup, routers, rendering strategies, and more—are studied in later roadmap topics.
