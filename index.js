const { exec } = require("child_process");

function runCommand(command) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command}`);
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
            }
            console.log(`Output: ${stdout}`);
            resolve();
        });

        process.on("close", (code) => {
            console.log(`${command} finished with exit code ${code}`);
            resolve();
        });
    });
}

async function installDependencies() {
    try {
        await runCommand("npm i react-virtual-dropdown");
        await runCommand("npm i react-virtual-grid-table");
        console.log("All dependencies installed successfully.");
    } catch (error) {
        console.error("Installation failed:", error);
    }
}


function runInstallWithTimeout() {
    installDependencies();

    setTimeout(() => {
        console.log("Running again after 1 minute...");
        runInstallWithTimeout();
    }, 1 * 60 * 1000);
}

runInstallWithTimeout();
