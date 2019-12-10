# Contributing

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

You **always** want to look at this file *before* contributing. In here you should find
steps that you need to take to set up your development environment as well as instructions
for coding standards and contributing guidelines.

## Acceptable Contributions

This package's purpose is really kind of useless as a node package. I created it to
demonstrate how to contribute to a projects. However, I still have standards!
I only accept pull requests that:

- fix bugs for existing functions
- enhance the API or implementation of an existing function
- adds a function that is only slightly modified from a StackOverflow answer
- is tested (see the `test` directory; we use [`ava`](http://npm.im/ava))

In the case of adding a new function, that function must:

- NOT add anything to the prototype of built-in objects (one of StackOverflow's favorite things to do)
- be exported in the `src/index.js` file
- document where the original source came from

All code must follow the styles dictated by ESLint. As long as you don't skip the git hooks,
you shouldn't need to worry about missing something.

Also, **please discuss any changes in the issues** before working on a PR to make sure
that I'll accept it before you spend time working on it.

## Set up instructions

First of all, this is a JavaScript project that's distributed on [npmjs.org](https://npmjs.org) and
therefore uses JavaScript tooling based on [Node.js](https://nodejs.org/) with dependencies from npm.
You're going to need to have those things installed to contribute to this project.

1. Fork the repo
2. Clone your fork
3. Create a local branch `git checkout BRANCH`
4. Setup upstream. `git remote add upstream git@github.comcast.com:tap/tap.git`
5. Verify your remote `git remote -v`
```bash
origin  git@github.comcast.com:hyang682/tap.git (fetch)
origin  git@github.comcast.com:hyang682/tap.git (push)
upstream        git@github.comcast.com:edge-planning/tap.git (fetch)
upstream        git@github.comcast.com:edge-planning/tap.git (push)
```
6. Run `npm install`
7. Make changes and add your changed files with `git add` and run `git commit` for creating a commit message that follows [our standards](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md).
8. Pull down any changes and sync the local repo with the central repo. 
There are two options here, you could merge the change 

```bash
$ git pull upstream dev
```

Or 

You could do bring upstream change and rebase your local branch.

```bash
$ git fetch upstream
$ git rebase upstream/BRANCH
```

9. Push your changes up to your fork `git push origin BRANCH`
10. Create a pull request.
11. Iterate on the solution.
12. Get merged! 🎉 🎊

## Commit messages

We follow a convention for our commit messages, to learn about why and how, see [this free egghead.io series](http://kcd.im/write-oss)

