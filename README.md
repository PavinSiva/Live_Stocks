Live Stocks Dashboard


A full-stack stock market dashboard that lets users explore market data, monitor stock prices, and practice trading through a virtual paper-trading portfolio — without risking real money.

Built with **React.js, Node.js, Express.js, and MongoDB**, this project combines interactive market visualizations with portfolio management and simulated trading.


Features


- **Market Dashboard:** Explore stock market information through an interactive interface.
- **Stock Tracking:** Search for stocks and view available market data and price information.
- **Paper Trading:** Simulate buying and selling stocks using virtual money without risking real funds.
- **Virtual Portfolio:** Track holdings, available virtual cash, and portfolio performance.
- **Performance Monitoring:** Review portfolio performance and changes in investment value.
- **Multiple Market Categories:** Explore stocks, cryptocurrencies, commodities, and forex, where supported by the integrated data APIs.
- **Historical Charts:** Visualize historical price movements using chart data.
- **Responsive Interface:** Navigate the dashboard through a modern React-based user interface.
- **Dark Mode:** Switch between light and dark themes, if enabled in your current version.



Tech Stack


| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development and build tooling |
| Tailwind CSS | Styling and responsive layouts |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and backend routing |
| MongoDB | Database for application data |
| Mongoose | MongoDB object modeling |
| Finnhub API | Market quotes, stock details, and search |
| Twelve Data API | Historical market data and charts |
| Git & GitHub | Version control and source code management |



Architecture


The application follows a client-server architecture.

1. **Frontend:** React renders the dashboard, market pages, portfolio, and trading interface.
2. **Backend:** Express.js exposes API endpoints and handles server-side application logic.
3. **Database:** MongoDB stores persistent application data.
4. **Market Data:** External APIs provide supported market quotes, stock information, and historical data.

Getting Started

Follow these steps to run the project locally.

Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB instance
- API keys for the market data providers used by your configuration

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Live_Stocks
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Install frontend dependencies

```bash
npm install
```

Run this command from the frontend directory containing its `package.json`.

### 3. Configure the backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

If your backend folder has a different name, use the actual directory name in your repository.

Create a `.env` file in the backend directory and configure the environment variables required by your application.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FINNHUB_API_KEY=your_finnhub_api_key
TWELVE_DATA_API_KEY=your_twelve_data_api_key
```

Use the exact variable names expected by your source code. If your application uses additional environment variables, configure those as well.

**Important:** Never commit your `.env` file, database credentials, or API secrets to GitHub.

### 4. Start the backend

From the backend directory, run the appropriate development script:

```bash
npm run dev
```

If your backend does not define a `dev` script, use the script specified in its `package.json`.

The backend is configured to run on port `5000` by default, unless changed in your configuration.

### 5. Start the frontend

Open another terminal, navigate to the frontend directory, and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal, commonly:

```text
http://localhost:5173
```

Make sure the frontend API configuration points to your running backend.

 Project Structure

The following is an example structure. Adapt it to match your actual repository.

```text
Live_Stocks/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── screenshots/
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

 Key Learning Outcomes

Building this project helped me develop practical experience with:

- Full-stack web application development.
- Building and integrating REST APIs.
- Managing application state in React.
- Connecting frontend applications to backend services.
- Working with MongoDB and Mongoose.
- Integrating external financial market data APIs.
- Designing portfolio tracking and simulated trading workflows.
- Organizing and maintaining a multi-component application.



 Future Improvements

- Add AI-assisted market insights and portfolio analysis.
- Implement user authentication and individual user portfolios.
- Add watchlists and customizable price alerts.
- Improve portfolio analytics with additional performance metrics.
- Deploy the application and make a live demo publicly accessible.

*AI-assisted functionality is a planned improvement, not a currently implemented feature.*



 Disclaimer

This project is intended for educational purposes and simulated trading. It does not execute real financial transactions and should not be considered financial advice.

Market data availability, accuracy, and update frequency depend on the external API providers and their subscription plans.

 Author



**Pavin Siva**

- GitHub: [@PavinSiva](https://github.com/PavinSiva)
- LinkedIn: [Pavin Siva](https://www.linkedin.com/in/pavin-s-69939631a/)

---

If you find this project interesting, feel free to explore the repository and share feedback!
