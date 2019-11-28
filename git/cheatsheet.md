# Cheatsheet for Git


### Git merge vs rebase

- Git Merge

You created feature branch from m2 and commit f1, while you are working on feature branch, other people commit m3.
Now you want to bring new changes from master to feature branch.
```
 master branch:    m1  --  m2  -- m3   
                           |          \  
 feature branch:           └----- f1 -- m4


git checkout feature
git merge master
```
This creates a new “merge commit” (m4) in the feature branch that ties together the histories of both branches

- Git Rebase

Same thing as example above, now let's see how git rebase works.
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

git checkout feature
git rebase master
```

This '**destroy**' `f1` commit in feature branch. Copy the new commit after m2 from master branch, in this case `m3`, then copy new commit `f1` from feature branch. Align them as if moves the entire feature branch to begin on the tip of the master branch `m3`.


After you push several commits to remote, revert back to previous commit.    - *1 - *2 - *3 -  

Find commit hash.
```
git log

(dev)└─> $ git log
commit 358e0a123dbf38c6c766f517187d96ee625d9229 (HEAD -> dev, origin/dev, origin/HEAD)
Merge: 856ae03 2ad5852
Author: Tammishetti, Nithin (Contractor) <Nithin_Tammishetti@comcast.com>
Date:   Wed Apr 24 16:31:45 2019 -0400

    Merge pull request #14 from ngan-de/node
    

Me(hyang682@NJSML-1612918)-(0)-(02:10 PM Fri May 03)
Info-(~/Documents/Projects/Serverless/serverless-apis)-(10 files, 312 B)
(dev)└─> $ git log
commit 358e0a123dbf38c6c766f517187d96ee625d9229 (HEAD -> dev, origin/dev, origin/HEAD)
Merge: 856ae03 2ad5852
Author: Tammishetti, Nithin (Contractor) <Nithin_Tammishetti@comcast.com>
```

Run revert command and commit change. 
```
git revert --no-commit 358e0a123dbf38c6c766f517187d96ee625d9229..HEAD
git commit
```
