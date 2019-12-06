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
3. Create a local branch
4. Setup upstream. `git remote add upstream git@github.comcast.com:tap/tap.git`
5. Run `npm install`
6. Make changes and add your changed files with `git add` and run `git commit` for creating a commit message that follows [our standards](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md).
5. Pull down any changes and sync the local repo with the central repo. `git pull upstream dev` 
7. Push your changes up to your fork `git push origin dev`
8. Create a pull request.
9. Iterate on the solution.
10. Get merged! 🎉 🎊

## Commit messages

We follow a convention for our commit messages, to learn about why and how, see [this free egghead.io series](http://kcd.im/write-oss)

