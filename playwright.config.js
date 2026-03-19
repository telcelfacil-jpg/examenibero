/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
    testDir: "./tests",
    timeout: 120000,
    expect: {
        timeout: 10000
    },
    use: {
        baseURL: "http://127.0.0.1:4174",
        viewport: { width: 1440, height: 1000 },
        headless: true,
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    webServer: {
        command: "cmd /c \"set PORT=4174&& node tools/full-server.js\"",
        url: "http://127.0.0.1:4174",
        reuseExistingServer: false,
        timeout: 30000
    }
};
