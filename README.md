# HR-FEC

This is the group repository for Team Fortitude's front-end capstone project.

## HOW TO USE

1. clone repo into local machine
2. create feature branch
  -git checkout master (to make sure you're on master branch)
  -git checkout -b <feature branch name>
3. save/make commits
4. push changes to FEATURE branch
  -git push origin <feature branch name>
5. create pull request for code review

 CREATE A NEW FEATURE BRANCH:
- git checkout master
- git checkout -b <new feature branch name>
- git pull master
- git checkout <new feature branch name> (to switch branches)

Pull requests should be made to the dev branch.

Run the following commands to initialize this repo:
  - npm install
  - npm run build
  - npm start


## IF YOU PLAN TO MAKE API REQUESTS FOR TESTING WITH LIVE DATA
Locate the example.config.js file @ client/env/example.config.js

MAKE SURE TO CHANGE THE FILE NAME TO config.js
If done correctly, the file should appear greyed out.

Make sure it is ignored before pushing commits,
failure to do so WILL COMPROMISE your key!!!

Replace the string with your github api token.

To receive data, simply visit http://localhost:3000/[path] as indicated in the path handlers

Optionally, you may integrate ajax/axios requests in your component to handle the data directly.