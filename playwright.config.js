/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
    testDir: "./tests",
    timeout: 120000,
    expect: {
        timeout: 10000
    },
    use: {
        baseURL: "http://127.0.0.1:4173",
        viewport: { width: 1440, height: 1000 },
        headless: true,
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    webServer: {
        command: "node tools/static-server.js",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
        timeout: 30000
    }
};
