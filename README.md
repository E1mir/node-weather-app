# Node Weather App

This Node.js Weather App fetches weather information based on the provided city name using the Positionstack and
Weatherstack APIs.

## Prerequisites

Before running the application, ensure you have Node.js installed on your machine. You'll also need API keys from
Positionstack and Weatherstack.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/E1mir/node-weather-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd node-weather-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root by copying the provided `.env.example` file:

    ```bash
    cp .env.example .env
    ```

5. Open the newly created `.env` file and add your API keys:

    ```env
    POSITIONSTACK_API_KEY=your-positionstack-api-key
    WEATHERSTACK_API_KEY=your-weatherstack-api-key
    ```

## Usage

To fetch weather information for a specific city, run the following command in the terminal:

```bash
node app.js cityName
```

Replace `cityName` with the name of the city you want to get weather information for.

If you do not provide a city name, the application will display an error message:

```bash
Please provide an address or city name.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

