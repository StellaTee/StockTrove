# **StockTrove**

CS261 Project

## **Prerequisites**

Before running the project, ensure you have the following installed:

- **Node.js** (Latest stable version)
- **Python** (Version compatible with the dependencies)

## **How to Operate**

### **1. Install Dependencies**

Open a terminal and navigate to the project directory:

```sh
cd stock-trove
npm i
pip install -r requirements.txt
```

### **2. Start the Backend Server**

Open a **new** terminal and run:

```sh
cd stock-trove
node app.cjs
```

### **3. Start the Frontend**

Open another **new** terminal and run:

```sh
cd stock-trove
npm run dev
```

## **API Keys & Rate Limits**

StockTrove uses **Goperigon's API**, which has a **150 request limit** on demo keys. If the application stops functioning, it's likely due to exceeding this limit.

### **How to Replace the API Key:**

1. Open **`servicies/GoPerigonAPIClient.ts`**
2. Comment out the **current API key**
3. Uncomment one of the provided **backup API keys**
4. Save the file and restart the application

Two extra API keys have been provided for testing purposes.

## **Acknowledgments**

This project was developed with the collaboration of an amazing team:

- [@aydaselen123](https://github.com/aydaselen123)
- [@Alexey-Savelyev-0](https://github.com/Alexey-Savelyev-0)
- [@Rosh314159](https://github.com/Rosh314159)
- [@W1ndrunner](https://github.com/W1ndrunner)
- [@JoshThanki](https://github.com/JoshThanki)

Special thanks to my teammates for their contributions and dedication to this project! 🚀
