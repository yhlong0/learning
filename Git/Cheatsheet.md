# Cheatsheet for Git

### Git Basic

- Configuration 

```bash
# Check version
$ git --version

# Config your git and list configuration.
$ git config --global user.name "Your Name"
$ git config --global user.email "abc@abc.com"
$ git config --list

# Check help documentation.
$ git help config
$ git config --help
```

- Clone, add, reset, pull

```bash
# Initialize a repo
$ git init

# Cloning a remote repo
$ git clone remote_url
$ git clone remote_url ./folder_path

# Check status before commit
$ git status

# Add files to staging area
$ git add -A
$ git add -A sub_directory/
$ git add -p

# Commit a file
$ git commit -m "Describe your commit"
# Commit bypass the git hook 
$ git commit --no-verify

# Remove files from staging area
$ git reset
$ git reset filename

# Check commit history
$ git log
$ git log --oneline --graph --all --decorate

# Add cowork repo as remote.
git remote coworkers_repo git@bitbucket.org:coworker/coworkers_repo.git

# Fetch all changes from cowork repo
$ git fetch coworkers_repo 

# Only fetch coworkers_repo featureBranch changes to local. 
$ git fetch coworkers_repo featureBranch

# Fetch changes from remote origin repo. Merge remote dev to local dev branch. 
$ git pull origin dev

```

- Branchs Operation

```bash
# Create a feature branch and switch to it.
$ git checkout -b feature
# Equal to below
$ git branch feature
$ git checkout feature

# Switch/Checkout a branch(If remote has a feature branch, git will create a local feature branch)
$ git checkout feature

# List all branchs include remote
$ git branch -a

# List remote branchs
$ git branch -r

# List local branchs
$ git branch

# Rename a branch
$ git branch -m OLD-BRANCH-NAME NEW-BRANCH-NAME

# Track a remote branch
$ git branch --set-upstream-to origin/BRANCH
# Or you can use the -u flag(upstream) when you make first push
$ git push -u origin BRANCH

# Delete feature branch
$ git branch -d feature

# Remote origin/upstream repo feature branch delete, use prune clean up local branch.
$ git remote prune origin
$ git remote prune upstream
```

### Git stash

Stash change, switch branch, come back working on it.

```bash
$ git branch feature
$ git checkout feature

# Modify the files

# Check what changed
$ git diff

$ git stash save "Worked on new feature"
$ git diff
$ git status
# Nothing will show up.

# List all the things stashed. 
$ git stash list
stash@{0}: On master: test

# Apply the change and keep the stash
$ git stash apply stash@{0}

# Grab the top item in the list and remove it from the stash
$ git stash pop

# Drop/remove the item in stash
$ git stash drop stash@{0}

# Bring changes from one branch to another one. 
$ git checkout master
# Modify the files
$ git stash save "add new feature"
$ git checkout feature
$ git stash pop

# Clean everything from the stash.
$ git stash clear
```

### Git merge vs rebase

#### Git Merge

- You created feature branch from `m2` and commit `f1`, while you are working on feature branch, other people commit `m3`.
Now you want to bring new changes from master to feature branch.
- This creates a new “merge commit” `m4` in the feature branch that ties together the histories of both branches
```bash
 master branch:    m1  --  m2  -- m3   
                           |        \  
 feature branch:           └-- f1 -- m4


$ git checkout feature
$ git merge master
```


#### Git Rebase

- Same thing as example above, now let's see how git rebase works.

- This '**destroy**' `f1` commit in feature branch. Copy the new commit `m3` from master branch, then copy the new commit `f1` from feature branch. Align them as if moves the entire feature branch to begin on the tip of the master branch `m3`.

```bash
# Before rebase
  master branch:    m1  --  m2  -- m3   
                            |           
  feature branch:           └----- f1 

 
# During rebase
  master branch:    m1  --  m2  -- m3   
                            |      | 
  feature branch:           └----- m3' -- f1' 
 
 
# After rebase
 master branch:    m1  --  m2  -- m3   
                                  |
 feature branch:                  └ -- f1' 

$ git checkout feature
$ git rebase master

# Bring upstream/master commits to current branch. Interactive mode. 
$ git rebase -i upstream/master

# Pick, reword or squash the commits, then save the script. 

pick f7f3f6d changed my name a bit
reword f7a3236d change commit message
squash 310154e updated README formatting and added blame
squash a5f4a0d added cat-file

:wq
```


> Referece this video for git rebase [workflow](https://youtu.be/f1wnYdLEpgI?t=195)



### Revert Change

- Made change to the file, undo the change

```bash
$ git checkout fileYouChanged
```

- Modify last commit message

```bash
$ git commit --amend -m "Modify last commit"
```

- forgot to commit a file

```bash
$ git add forgotFile
$ git commit --amend
$ git log --stat
```
It will show a text editor with last commit message, you can modify the message or just save the file.


- Master and feature branch, accidently commit to master branch, need to move those commits to feature branch.

```bash
# Copy commit to right branch
$ git log
$ git checkout feature
$ git cherry-pick #commitHashFromMaster#

# Remove the wrong commit
$ git checkout master
$ git log
$ git reset --hard #commitHashToReset#
```

- Git reset/clean

```bash
# After soft reset, change files will be in staging.
$ git reset --soft #commitHash#

# Default option = mixed, change file will be in working directory.
$ git reset #commitHash#

# It will get rid of any tracked file changes. But untracked file will still be there
$ git reset --hard #commitHash#

# Get rid of untracked file and directory -d directory, -f file,  -n dry run.
# If you accidently unzip a lot files, could use it to clean up.
$ git clean -df
```

- Recover from git reset hard

```bash
$ git reflog
# Grab #commitHash# 
$ git checkout #commitHash#
# You will be in detached head state, create new branch
$ git branch backup
```


- Undo some commits which other people already pull those changes.
```bash
$ git log
```
Output from git log:
```
commit #SecondCommitHash#
Author: Hailong Yang
Date: xxxx
  Commit message second

commit #FirstCommitHash#
Author: Hailong Yang
Date: xxxx
  Commit message first
```
Put the commit hash which you want to undo:
```bash
$ git revert #SecondCommitHash#

# Save commit message. :wq
```

```bash
$ git log
```
Output after revert:
```
commit #ThirdCommitHash#
Author: Hailong Yang
Date: xxxx
  Revert "Commit message second"
  This reverts commit #SecondCommitHash#

commit #SecondCommitHash#
Author: Hailong Yang
Date: xxxx
  Commit message second

commit #FirstCommitHash#
Author: Hailong Yang
Date: xxxx
  Commit message first
```
Check difference between commits
```bash
$ git diff #SecondCommitHash# #ThirdCommitHash#
```
