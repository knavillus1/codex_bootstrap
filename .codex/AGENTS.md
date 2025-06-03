
# Contributor Guide

## Special Task Instructions
If the user task consists of just a single file path name, like '/.codex/process-tasks.md', then begin by opening that file which will contain the full task prompt for you to follow.

## Ignore 
Do not open items in this path, they will be irrelevant to your efforts:
/project/**
/.github/**

## CODEX Dev Environment Tips

Do NOT attempt to run any command which requires open network communication.  Your Dev environment has no network access and is sandboxed. No harm will come from trying but you will waste your effort.

Do NOT Run `.codex/install.sh` this script. This script will be executed during environement setup for you during your environment setup prior to you arriving.  If you make changes that require new dependencies or services (like postgres etc...) to be installed, you must edit this file to include the dependencies and/or service installation and startup.

The 'install.sh' references dependencies gathered here: `backend/requirements.txt` and `frontend/package.json`. 

Note that the effects will not take place until the next task session.  

## Style Instructions
Lint javascript using:
```bash
cd frontend
npm run lint
cd ..
```
Lint python using:
```bash
flake8
```
## Testing Instructions
Run tests with run_tests.sh.  Maintain this script as needed to setup specific environment variables or manage other test-specific setup.  Any tests that require network connectivity should either be ignored and not run, -or- have network test path that shunts to a success when network connectivity can't be demonstrated so failed tests in this scenario don't confuse the codex agent progress.

## CHANGELOG.md Instructions
Append a single line summary to CHANGELOG.md describing the changes with a preceeding timestamp
if errors were encountered, list them indented below the changelog row with a single line summary

## DEVELOPMENT.md Instructions
When components are added that require manual application startup for local testing/debug, document all steps and commands neccessary to set up the local environment and start services/components in DEVELOPMENT.md using explcit commands.  These changes will need to be mirrored on dev_int.sh (see below), which is a one-stop script to set up the environment from scratch and start the application for local testing.

## README.md Instructions

README.md just describes the project.  Do not look here for guidance on how to proceed with your task, but update if major changes that affect user interaction have been made.

## PR instructions


## dev_init.sh startup script
When there are code changes that need targeted environment setup, review dev_init.sh and modify as needed such that this script will completely setup the application and start it running.
