# BlogProject - Frontend
This project is the frontend code of [BlogProject](https://github.com/santhamurthy1122/Blog-frontend-project-2). It uses React and Javascript for frontend.

## Live Code is Here. Try it now! -> [Blog-App](https://blog-frontend-project-zeta.vercel.app/)

## Brief 
<p> Blog app project is a website project for people who want to share knowledge with other people. In blog app, users can read and like other people's blog posts, can search and filter posts. They can also write and edit their own posts. However, users must create an account to write and update posts.If users create an account, they can view their profile page and see the posts they like. Users can filter posts by their published date and number of likes. Also, posts can be paginated by users. </p>

<p> Users are not required to register to view posts. Every post has a post detail page. In post detail page, users can see the whole post and the person can like the post if they want. In profile page, users can delete and edit their own posts. </p>

## Technologies
<p> Inside this project, React, Redux, Bootstrap, Javascript, Css, React Router Dom, Formik, Yup, React Toastify and axios technologies are used.
Bootstrap is used for design of templates. For sending request to api, axios is preffered. 
The state management of the project is provided with Redux. Navigating between pages are provided by the React-Router-Dom.
</p>

## UI of Project
<p> Project contains 8 main pages. </p>

### Home Page
<p> On the home page, brief information about the purpose and use of the project is given. The user can quickly navigate to the all posts page or login, register page using the navbar. </p>
<p text-align="center"> 
    <img src="public/app_image/home_page_lg.jpg" />
</p>
<p text-align="center"> 
    <img src="public/app_image/home_page2_lg.jpg" />
</p>
### Register Page
<p> Users use this page to create an account. The form which insides this page generated with Formik and it's validation process is validated with yup. After registration process, an account activation mail is send to user's email address. In order for the user to log in, the user must verify their account using this activation email. <strong> But, I have disabled email verification for convenience for the trial version published in the link at the top of the page. </strong>
 </p>
<p text-align="center"> 
    <img src="public/app_image/register.jpg" />
</p>

### Login Page
<p> If users have an account, they can login to website. If email or password are incorrect, the user is notified with React Toastify Toast message.
</p>
<p text-align="center"> 
    <img src="public/app_image/login.jpg" />
</p>

### Create and Edit Post Page
<p> Users who have an account, can write blog posts in the create post page. On the edit post page, people can change their posts by editing them. 
</p>
<p text-align="center"> 
    <img src="public/app_image/create_post_lg.jpg" />
</p>

### Responsive UI
<p> The project's UI has a responsive design. It can work on phones and tablets without breaking the design. </p>
<p text-align="center"> 
    <img src="public/app_image/home_page_sm.jpg" width="400" height="600" />
    <img src="public/app_image/home_page2_sm.jpg"  width="400" height="600" />
</p>

## Getting Started with React App

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://blog-frontend-project-zeta.vercel.app/](https://blog-frontend-project-zeta.vercel.app/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vercel.com/forme3/blog-frontend-project/CZtT7aiv7GNkLyNWNvFz4Zzix2kS) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
