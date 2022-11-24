const core = require('@actions/core');
const github = require('@actions/github');




try {
    const committer = github.context.actor?.toLowerCase();

    const inputJSON = JSON.parse(core.getInput('user-mapping'));
    console.log('bar', inputJSON)
    const githubToSlackId = new Map(Object.entries(inputJSON).map(([key, value]) => ([key.toLocaleLowerCase(), value])))

    console.log('foo', githubToSlackId)

    const output = githubToSlackId.has(committer)
        ? `<${githubToSlackId.get(committer)}>`
        : committer;

    core.setOutput("username", output);
} catch (error) {
    core.setFailed(error.message);
}
