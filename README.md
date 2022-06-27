# Twitter-Clone

[Link to Site](https://twitter-clone-nu-woad.vercel.app/)

### created using Next.js and Firebase realtime Database

#### Other Dependancies:
* reduxjs/toolkit
* axios
* material-ui (for icons only)


#### Purpose of this app
The purpose of this app was to create something that really pushed my abillity to think ahead and plan, having an app this large and complex caused a lot of issues at the start, as deciding to keep the data in a certain way could later on conflict with another operation. this app therfore was all about planning and keeping the code clear a readable, comments were also necessary to keep track of what was happening.


#### What I learned
I learned that there is always more than one way to deal with any problem and that it's my role as the developer to find the best way. For example, at the begining posts were handled in a seperate branch of the database than the users, this worked well at the start and reduced the complexity of getting the posts. however when I then implimented the abillity to change your profile image I had no way to update the image associated with the post. At that point I decided that the best way to deal with the situation was to adjust the location of posts and put them into their parent users branch of the database, then I had to re-write a lot of code that retrieves the posts but going forward everything became a lot simpler.



#### What improvements could be made
I would like to add some more features like commenting on other users posts and dark mode theming. it would be great to revisit this project in the future and re-write it with a dedicated backend using say Node, Express and MongoDB.
