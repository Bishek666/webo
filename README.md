<!-- Important Design Flow Notes -->

1) Need to login in order to add post or like and comment
2) Click on comments drops down a comment section where
  if logged in users display a blue or else a teal color

<!-- Suggestions to make it better -->

1) Could use yup or any other form validation 
2) Could use service file as extra layer of api, in this case I didn't because the project was simple and small
3) Could use the firebases api that would give the progress and status of uploads, in this case I didn't because of having less time
4) Could use vite to make it load faster and reduce bundle size
5) Delete the user profile image from firebase storage after editing profile img

<!-- Didn't use -->

1) didn't use the form attribute onSubmit because I wasn't using any form formatted data
2) didn't make any custom hook because I didn't saw any repeating state and useEffect sideffect
   