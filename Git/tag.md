# Git Tag

Tagging is generally used to capture a point in history that is used for a marked version release (i.e. v1.0.1). 

```bash
# Listing Tags
$ git tag

# To refine the list of tags
$ git tag -l *-rc*

v0.10.0-rc1
v0.11.0-rc1
v0.12.0-rc1
```
- Annotated Tags

Stored as full objects in git, including tagger name, email, and date.

```bash
# creating a tag
$ git tag -a <tagname> -m "my verison x.x"

# tagging old commits
$ git log --pretty=oneline

15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'feature'
a6b4c97498bd301d84096da251c98a07c7723e65 add update method for thing

$ git tag -a v1.2 15027957951b64cf874c3557a0f3547bd83b3ff6

# retagging/replacing old tags
$ git tag -a -f v1.2 a6b4c97498bd301d84096da251c98a07c7723e65
```

- Lightweight Tags

```bash
$ git tag v1.x-lw
```

- Pushing Tags to Remote

```bash
$ git push origin v1.2
```

- Checking Out Tags

```bash
$ git checkout v1.2
```

- Deleting Tags

```bash
$ git tag

v1
v2
v3

$ git tag -d v1

v2
v3
```
