const cp = require('child_process');
const path = require('path');

const defaultOptions = {
    folder: 'docker/dev',
    name: path.basename(process.cwd()),
};

function startServe(callback) {
    startServe.with(defaultOptions)(callback);
}

startServe.with = function(options) {
    const project = { ...defaultOptions, ...options };

    return done => {
        cp.execSync(`docker-compose --project-name "${project.name}" up -d`, { cwd: project.folder });

        cp.exec(`docker-compose --project-name "${project.name}" ps`, { cwd: project.folder }, (error, stdout, stderr) => {
            const regex = /0\.0\.0\.0:([0-9]*)->([0-9]*)\//g;
            const matches = [];
            let match;
            while (match = regex.exec(stdout)) {
                matches.push(match);
            }

            console.log('\n---');
            for (const match of matches) {
                console.log(`http://localhost:${match[1]} (${match[2]})`);
            }
            console.log('---');

            done();
        });
    };
}

function stopServe(callback) {
    stopServe.with(defaultOptions)(callback);
}

stopServe.with = function(options) {
    const project = { ...defaultOptions, ...options };

    return done => {
        cp.execSync(`docker-compose --project-name "${project.name}" down --remove-orphans`, { cwd: project.folder });

        done();
    }
}

module.exports = {
    startServe,
    stopServe,
};
