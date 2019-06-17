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
