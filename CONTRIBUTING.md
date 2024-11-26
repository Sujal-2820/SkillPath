# Getting Started

1) **Star this repository** (See top right of this page.  Click the **"Star"** button.)


2) **Fork this repository** (See top right of this page.  Click the **"Fork"** button.  On the next screen that appears, click the green **"Create fork"** button in the lower right.)


3) **Open a Terminal**, where you can enter command line text. For the next steps, you'll be using this terminal.

4) **Clone the forked repository** down to your machine:

   `git clone git@github.com:<your-username>/SkillPath.git`
   
   Remember to replace `<your-username>` with your GitHub username.

5) **Go into your local repo directory**

   `cd SkillPath`

6) **Create a branch**

   `git checkout -b <your-branch-name>`

   Think of a name for your new branch.  Your branch name can be anything, but it's better if it briefly describes the change you are making.  Replace `<your-branch-name>` with the branch name you've chosen.

7) **Edit your changes** in a code editor, such as VS Code.

8) **Preview your changes**

   `git status`

9) **Send your changes up to your forked repo at GitHub:  Add, commit and push**

   ```
   git add .
   git commit -m "Your commit message"
   git push -u origin <your-branch-name>
   ```

10) **Create a new pull request** from your forked repo at GitHub.  (Click on the green **"Compare & pull request"** button that is near the top of the page.)


11) **Wait for your PR review and merge approval**.   I will review it as soon as possible.  Thank you for your time and effort in improving this project!

12) **Celebration time!** 🎊 Your PR has been approved! You are a genuine open sourcerer! 🧙 You have unlocked the knowledge and power to make changes throughout the open source world.  What will be next?

---


# Contributing to JSON

If you don't have technical knowledge about **JavaScript** or it's framework **Next JS** , no problemo 😄.
<br/>
You still have a chance to contribute to a non technical but a *very crucial* portion of the project.
<br/>
It holds all the data that needs to be presented for each modules.
<br/>
<br/>
The name of the folder is **courseFolder**.
<br/>
Explaination:
   - Open ```courseFolder```.
   - You will see various sub folders namely *ai-ml*, *app_development*, *data_analysis* and *web_development*. These are basically the domains which consist of courses and modules.
   - There are folders nested inside these domains which contain individual course information i.e. ```modules```.
   - Each module folder contains 3 difficulties namely *standard*, *easy* and *easiest*. As the name suggests the difficulty level of each modules decreases according to the names (in terms of ```wordings```, ```description```, ```video_links``` etc.)

<br/><br/>
### Your Scope of contribution
Currently the JSON inside the files does not follow a specific pattern or structure.
<br/>
Contributing to JSON means you need to make sure that it follows the specified pattern only.
   ```
   {
     "title": "",
     "content": [
       {
         "subheading": "",
         "text": "",
         "code_example": "",
         "additional_text": "",
         "video_link": "",
         "mcq_questions": [
           {
             "question": "",
             "options": [
               ""
             ],
             "correct_answer": ""
           }
         ]
       },
       {
         "subheading": "",
         "text": "",
         "code_example": "",
         "additional_text": "",
         "video_link": "",
         "mcq_questions": [
           {
             "question": "",
             "options": [
               ""
             ],
             "correct_answer": ""
           }
         ]
       },
       {
         "subheading": "",
         "text": "",
         "code_example": "",
         "additional_text": "",
         "video_link": "",
         "mcq_questions": [
           {
             "question": "",
             "options": [
               ""
             ],
             "correct_answer": ""
           }
         ]
       },
      ...
     ]
   }
   ```

<br/>
### TIP:
You can take help of any AI tool to collect the content, but make sure that whatever content is being generated, it resonates with the particular ***module topic*** and the content to be written inside the above mentioned structure only.
<br/>
**If you fail to meet this criteria, your PR shall not be accepted and I might ask you to perform necessary changes. Therefore check your work thoroughly before making a PR**.
<br/><br/>
Make it count 🚀
