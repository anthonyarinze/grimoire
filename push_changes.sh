#!/bin/bash
# # get the current directory assuming script is in the repository
repo_dir="$(git rev-parse --show-toplevel)"

# # change directory to the repository root
cd "$repo_dir"

# # add all trracked files
git add .

# # propmot commit message
read -p "enter your commit message: " commit_message

# # create commit with the commit message
git commit -m "$commit_message"

# # push changes with commit message to remote repo
git push origin main

echo "Pushed changes to your git repo with commit message: $commit_message"