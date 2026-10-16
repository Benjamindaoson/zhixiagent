## ADDED Requirements

### Requirement: Personal brand in the application
The application SHALL present the visible product name as “知析 AI” and its purpose as “您的专属 AI 数据分析师” in the primary user interface and browser metadata.

#### Scenario: Opening the application
- **WHEN** the user opens the local app
- **THEN** the primary title and browser title show the personal brand rather than the upstream product title

### Requirement: Desktop analytics workspace
The application SHALL place the analysis canvas to the left of the conversation on desktop and SHALL retain usable resizing and mobile navigation.

#### Scenario: Opening a table or chart
- **WHEN** a desktop user selects an analysis result
- **THEN** the table or chart appears left of the conversation and the splitter can resize both panes

### Requirement: Assistant answer presentation
The application SHALL prevent leading model reasoning blocks and partial `<think>` tags from appearing in the visible assistant answer while preserving ordinary answer text.

#### Scenario: Streamed reasoning prefix
- **WHEN** a streamed assistant response begins with a `<think>` block
- **THEN** the reasoning prefix remains hidden and the following answer becomes visible when received

### Requirement: Existing data analysis flow
The frontend SHALL continue to load the app, communicate with the existing backend, display a sample table, and submit an assistant request without frontend runtime errors.

#### Scenario: Local demonstration
- **WHEN** the local server is running and the user opens the application
- **THEN** the user can inspect data and receive an assistant response through the existing API

#### Scenario: Starting from the landing page
- **WHEN** the user opens the app without an active session
- **THEN** the landing page shows the question input, data import actions, examples, and saved sessions
- **WHEN** the user submits a question
- **THEN** the existing conversation and analysis workspace opens with its original tools

#### Scenario: Returning to the landing page
- **WHEN** the user returns home from an active workspace
- **THEN** the session is saved and the landing page is shown, with that session available to reopen
