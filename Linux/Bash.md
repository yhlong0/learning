### Change the prompt

```bash
PS="\d \h $"

```

Output:

`Sat Jun 02 server $`

### Add colors to the prompt

- `\e[`  : Start color scheme
- `x;y`  : Color pair to use (x;y)
- `$PS1` : Your shell prompt variable.
- `\e[m` : Stop color scheme. 

```bash
$ export PS1="\e[0;31m[\u@\h \W]\$ \e[m "

```

### Current Settings

- `vi .bash_profile`
- Add below settings
```bash
# Show branch
BRANCH='\[\e[30;1m\](\[\033[0m\033[0;32m\]$(git branch 2>/dev/null | grep "^*" | colrm 1 2)\[\e[30;1m\])\[\033[0;32m\]└─>\[\033[0m\033[0;32m\] \$\[\033[0m\033[0;32m\]\[\033[0m\]'

# PS1 show directory info
PS1="\[\[\e[30;1m\]Info\[\017\]-(\[\[\e[34;1m\]\w\[\e[30;1m\])-(\[\e[34;1m\]\$(ls -1 | wc -l | sed 's: ::g') files\[\e[30;1m\])\n$BRANCH \[\e[0m\]"

# PS2 Default
PS2='continue =>'
```
- Update settings by run `source .bash_profile`


#### Reference

> [Custom prompt](https://www.cyberciti.biz/tips/howto-linux-unix-bash-shell-setup-prompt.html)
