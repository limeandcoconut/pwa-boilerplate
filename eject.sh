#!/bin/bash
echo "Running rm -rf .gitignore"
rm -rf .git
echo "Running git init"
git init
echo "Running git add -A"
git add -A
echo 'Running git commit -m "Initial Commit"'
git commit -m "Initial Commit"