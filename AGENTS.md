
# Contributor Guide

## Dev Environment Tips

Do NOT Run `install.sh` this script, which references `requirements.txt`. This script will be executed during environement setup for you. You can reference`install.sh` and `requirements.txt` to review causes of dependency issues and update these files as needed to address, but the effects will not take place until the next task session.

Do NOT attempt to run any command which requires open network communication.  Your Dev environment is isolated for safety.

## Style Instructions

## Testing Instructions

## CHANGELOG/README Instructions
Append a single line summary to CHANGELOG.md describing the changes with a preceeding timestamp
if errors were encountered, list them indented below the changelog row with a single line summary

When components are added that require manual application startup for local testing/debug, document all steps and commands neccessary to set up the local environment and start services/components in README.md using explcit commands.

## PR instructions

